require('dotenv').config();
const {
  readdir,
  readFile,
  writeFile,
  unlink,
} = require('fs/promises');
const StoryblokClient = require('storyblok-js-client');
const { hbs } = require('../views/hbs');

const { STORYBLOK_PUBLIC } = process.env;

const Storyblok = (accessToken) => new StoryblokClient({ accessToken });

class BlogEngine {
  constructor() {
    this.manifest = {};
    this.paginate = 1;
    this.page = 0;
    this.range = [0, this.paginate];
    this.path = {
      blog: './public/blog/',
      root: './public/',
    };
    this.storyblok = Storyblok(STORYBLOK_PUBLIC);
    this.template = {
      index: './views/blog.hbs',
      post: './views/blog-post.hbs',
    };
  }

  async build() {
    try {
      await this.manifestSet();
      await this.clean();
      await this.buildPosts();
      await this.buildIndex();
    } catch (error) {
      console.error(error);
    }
  }

  // private
  async buildIndex() {
    const permaLink = `${this.path.blog}${this.page ? `page-${this.page}` : 'index'}.html`;
    const templateBuffer = await readFile(this.template.index);
    const templateString = templateBuffer.toString('utf-8');
    const template = hbs.compile(templateString);
    const rendered = template({
      next: this.page < this.manifest.length - 1
        ? `/blog/page-${this.page + 1}.html`
        : null,
      prev: this.page >= 1
        ? (this.page - 1 && `/blog/page-${this.page - 1}.html`) || '/blog'
        : null,
      posts: this.manifest.slice(this.range[0], this.range[1]),
    });

    await writeFile(permaLink, rendered);

    this.page += 1;

    // recursively build index pages to handle pagination
    if (this.page < this.manifest.length) {
      this.range[0] += this.paginate;
      this.range[1] += this.paginate;
      this.buildIndex();
    }
  }

  async buildPosts() {
    await Promise.all(this.manifest.map(async (post) => {
      const permaLink = `${this.path.root}${post.slug}`;
      const templateBuffer = await readFile(this.template.post);
      const templateString = templateBuffer.toString('utf-8');
      const template = hbs.compile(templateString);
      const rendered = template(post);
      return writeFile(permaLink, rendered);
    }));
  }

  async clean() {
    const posts = await readdir(this.path.blog);
    await Promise.all(posts.map((post) => unlink(`${this.path.blog}${post}`)));
  }

  async manifestSet() {
    const stories = await this.storyblok.getAll('cdn/stories');
    this.manifest = stories.map(({ content, full_slug }) => ({
      date: new Date(content.Date).toLocaleString('en-us', {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      }),
      title: content.title,
      content: this.storyblok.richTextResolver.render(content.Content),
      excerpt: content.Excerpt,
      slug: `/${full_slug.split('/').join(`/${content.Date.split(' ')[0]}_`)}.html`,
    }));
    // Sort by date, newest first, regardless of the order in Storyblok
    this.manifest.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}

module.exports = BlogEngine;
