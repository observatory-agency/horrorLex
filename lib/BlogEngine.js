require('dotenv').config();
const { readFile, writeFile } = require('fs/promises');
const hanldebars = require('handlebars');
const path = require('path');
const StoryblokClient = require('storyblok-js-client');

const { STORYBLOK_PUBLIC, STORYBLOK_PREVIEW } = process.env;

const Storyblok = (accessToken) => new StoryblokClient({ accessToken });

class BlogEngine {
  build({ action, story_id }) {
    this.storyblok = action === 'published'
      ? Storyblok(STORYBLOK_PUBLIC)
      : Storyblok(STORYBLOK_PREVIEW);
    this.getStory(story_id);
  }

  async getStory(storyId) {
    try {
      const { data: { story } } = await this.storyblok.get(`cdn/stories/${storyId}`);
      const content = story.content.Content;
      const htmlString = this.storyblok.richTextResolver.render(content);
      this.writeStory(htmlString);
    } catch (error) {
      console.error(error);
    }
  }

  async writeStory(htmlString, storySlug) {
    const permaLink = path.join('./public/', `${storySlug}.html`);
    try {
      const template = await readFile('./views/blog.hbs');
      const htmlRendered = Handlebars.compile(template)(htmlString);
      await writeFile(permaLink, htmlRendered);
    }

  }
}

module.exports = BlogEngine;
