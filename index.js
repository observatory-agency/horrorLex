require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const {
  about,
  search,
  book,
  browse,
  contact,
  home,
  results,
} = require('./routes');
// TODO apply schema when our data model is finalized
// const schema = require('./models');
const collections = require('./constants/collections');
const Env = require('./lib/Env');
const LocalAddress = require('./lib/LocalAddress');
const registerHelpers = require('./views/helpers');
const registerPartials = require('./views/partials');

const {
  DB_CONNECTION,
  DB_NAME,
  DB_PORT,
  EXPRESS_PORT,
  WEBPACK_PORT,
} = process.env;

const app = express();
const mongoClient = new MongoClient(`${DB_CONNECTION}:${DB_PORT}`, { useUnifiedTopology: true });

registerHelpers();
registerPartials();

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', home);
app.use('/about', about);
app.use('/search', search);
app.use('/browse', browse);
app.use('/contact', contact);
app.use('/results', results);
app.use('/public', express.static('public'));
// book is last, as we want all other routes attempted first
app.use('/', book);

mongoClient.connect(async (connectionError, client) => {
  if (connectionError) {
    return console.error(connectionError);
  }
  try {
    const db = client.db(DB_NAME);
    collections.forEach(async (collection) => {
      app.locals[collection] = db.collection(collection)
      || await db.createCollection(collection);
      // FIXME we may just have a single collection and more indexes
      app.locals[collection].createIndex({
        author: 'text',
        title: 'text',
        isbn13: 'text',
        year: 'text',
      });
    });
    return app.listen(EXPRESS_PORT, () => {
      if (Env.is('development')) {
        // output something nice about our local IP address
        console.log(`Express listening at: http://localhost:${EXPRESS_PORT}`);
        console.log(`Webpack listening at: http://localhost:${WEBPACK_PORT}`);
        console.log(`Webpack listening at: http://${LocalAddress.ip()}:${WEBPACK_PORT}`);
      }
    });
  } catch (error) {
    return console.error(error);
  }
});
