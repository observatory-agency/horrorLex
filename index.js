require('dotenv').config();
const path = require('path');
const express = require('express');

const routes = require('./routes');
const Env = require('./lib/Env');
const LocalAddress = require('./lib/LocalAddress');
const Mongo = require('./lib/Mongo');
const registerHelpers = require('./views/helpers');
const registerPartials = require('./views/partials');

const { DB_CONNECTION, EXPRESS_PORT } = process.env;
const app = express();

registerHelpers();
registerPartials();

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes.home);
app.use('/about', routes.about);
app.use('/search', routes.search);
app.use('/browse', routes.browse);
app.use('/contact', routes.contact);
app.use('/blog', routes.blog);
app.use('/blog-post', routes.blogPost);
app.use('/results', routes.results);
app.use('/storyblok', routes.storyblok);
app.use('/', routes.publication);
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use((req, res) => res.status(404).render('error.hbs', { status: 404 }));
app.use((error, req, res, next) => res.status(500).render('error.hbs', { status: 500 }));

app.listen(EXPRESS_PORT, async () => {
  try {
    await Mongo.connect();
    if (Env.is('development')) {
      // output something nice about our local IP address
      console.log(`Mongo listening at: ${DB_CONNECTION}`);
      console.log(`Express listening at: http://localhost:${EXPRESS_PORT}`);
      console.log(`Local IP Address: http://${LocalAddress.ip()}`);
    }
  } catch (error) {
    console.error(error);
  }
});
