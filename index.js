const express = require('express');
const { MongoClient } = require('mongodb');
const { home, results } = require('./routes');
const schema = require('./models');
const ClearModuleCache = require('./lib/ClearModuleCache');
const Env = require('./lib/Env');
const registerHelpers = require('./views/helpers');
const registerPartials = require('./views/partials');

const app = express();
const ARTICLES_COLLECTION = 'articles';
const BOOKS_COLLECTION = 'books';
const DB_CONNECTION = 'mongodb://localhost:27017';
const DB_NAME = 'horrorLex';
const PORT = 3000;

const collections = [ARTICLES_COLLECTION, BOOKS_COLLECTION];
const mongoClient = new MongoClient(DB_CONNECTION, { useUnifiedTopology: true });

registerHelpers();
registerPartials();

app.set('view engine', 'hbs');
app.use(express.json());
app.use('/', home);
app.use('/results', results);
app.use('/public', express.static('public'));

// if (Env.is('development')) {
//   // register our node module cache clearer
//   ClearModuleCache.watch([
//     './routes',
//   ]);
// }

mongoClient.connect(async (connectionError, client) => {
  if (connectionError) {
    return console.error(connectionError);
  }
  try {
    const db = client.db(DB_NAME);
    collections.forEach(async (collection) => {
      app.locals[collection] = db.collection(collection, schema[collection])
      || await db.createCollection(collection, schema[collection]);
    });
    app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
  } catch (error) {
    console.error(error);
  }
});
