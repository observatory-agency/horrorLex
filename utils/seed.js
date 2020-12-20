require('dotenv').config();
const csv = require('csvtojson');
const { MongoClient } = require('mongodb');
const collections = require('../constants/collections');
const { propToArray } = require('../constants/dataFilters');

const {
  DB_CONNECTION,
  DB_NAME,
} = process.env;

/** Convert keys to camelCase assuming input is following a case where each
 * word is capitalized. E.g., "Original Publisher" or "Horror Lex Summary"
*/
const camelCase = (key) => {
  const words = key.split(' ');
  const converted = words.map((word, i) => (i > 0
    ? word.replace(/[^a-zA-Z0-9]/g, '')
    : word.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')));
  return converted.join('');
};

/** Create SEO friendly URL */
// https://stackoverflow.com/questions/14107522/producing-seo-friendly-url-in-javascript
const generateSeoUrl = (title) => title
  .toString()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/\s+/g, '-')
  .toLowerCase()
  .replace(/&/g, '-and-')
  .replace(/[^a-z0-9-]/g, '')
  .replace(/-+/g, '-')
  .replace(/^-*/, '')
  .replace(/-*$/, '');

const createAndInsertDocs = async (db, name, path) => {
  try {
    const csvToObj = await csv().fromFile(path);
    const docs = csvToObj.map((document) => {
      const doc = {};
      const docKeys = Object.keys(document);
      docKeys.forEach((key) => {
        doc[camelCase(key)] = propToArray[key]
          ? document[key].split(propToArray[key])
          : document[key];
      });
      doc.href = generateSeoUrl(doc.title);
      return doc;
    });
    const collection = db.collection(name) || await db.createCollection(name);
    const { result: { ok, n } } = await collection.insertMany(docs);
    return { n, ok, name };
  } catch (error) {
    // skip collections that aren't in ./data, but log something useful
    return console.error({ path, error });
  }
};

const mongoClient = new MongoClient(`${DB_CONNECTION}`, {
  useUnifiedTopology: true,
});

mongoClient.connect(async (connectionError, client) => {
  if (connectionError) {
    return console.error(connectionError);
  }
  try {
    const db = client.db(DB_NAME);
    const res = await Promise.all(collections.map(
      (collection) => createAndInsertDocs(db, collection, `./data/${collection}.csv`),
    ));
    res.forEach((item) => item && console.log(
      `Inserted ${item.n} documents into collection "${item.name}"`,
    ));
    return mongoClient.close();
  } catch (error) {
    return console.error(error);
  }
});
