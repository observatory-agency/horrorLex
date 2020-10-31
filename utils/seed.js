require('dotenv').config();
const { MongoClient } = require('mongodb');
const csv = require('csvtojson');
// const collections = require('../constants/collections');

const file = './data/books_.csv';

const {
  DB_CONNECTION,
  DB_NAME,
  DB_PORT,
} = process.env;

const filter = {
  'ISBN-13': '\n',
  'Films Discussed': '\n',
  Tags: ', ',
};

const mongoClient = new MongoClient(`${DB_CONNECTION}:${DB_PORT}`, { useUnifiedTopology: true });

const reformatData = (filterKeys, jsonArr) => {
  const filteredJsonArr = jsonArr.map((item) => {
    const keys = Object.keys(filterKeys);
    keys.forEach((key) => {
      if (item[key]) {
        item[key] = item[key].split(filterKeys[key]);
      }
    });
    return item;
  });

  mongoClient.connect(async (connectionError, client) => {
    if (connectionError) {
      return console.error(connectionError);
    }
    try {
      const db = client.db(DB_NAME);
      const books = db.collection('books') || await db.createCollection('books');
      const { result: { ok, n } } = await books.insertMany(filteredJsonArr);
      if (ok) {
        console.log(`Inserted ${n} documents`);
      }
      mongoClient.close();
    } catch (error) {
      return console.error(error);
    }
  });
};

csv().fromFile(file).then((jsonObj) => reformatData(filter, jsonObj));
