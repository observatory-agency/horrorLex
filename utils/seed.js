require('dotenv').config();
const csv = require('csvtojson');
const { MongoClient } = require('mongodb');
const collections = require('../constants/collections');
const { propToArray } = require('../constants/dataFilters');

const {
  DB_CONNECTION,
  DB_NAME,
  DB_PORT,
} = process.env;

const createAndInsertDocs = async (db, name, path) => {
  try {
    const csvToObj = await csv().fromFile(path);
    const docs = csvToObj.map((document) => {
      const doc = {};
      const docKeys = Object.keys(document);
      docKeys.forEach((key) => {
        doc[key] = propToArray[key]
          ? document[key].split(propToArray[key])
          : document[key];
      });
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

const mongoClient = new MongoClient(`${DB_CONNECTION}:${DB_PORT}`, {
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
