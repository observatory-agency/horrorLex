require('dotenv').config();
const csv = require('csvtojson');
const { MongoClient } = require('mongodb');
const collections = require('../constants/collections');
const {
  propToArray,
  specialCharFilter,
} = require('../constants/dataFilters');

const file = './data/books_.csv';

const {
  DB_CONNECTION,
  DB_NAME,
  DB_PORT,
} = process.env;

const convertToCamelCase = (key) => key
  .replace(/[^a-zA-Z ]/g, ' ')
  .split(' ')
  .map((s, i) => (
    (i > 0 ? `${s.charAt(0).toUpperCase()}${s.slice(1)}` : s)
  ))
  .join('');

const mongoClient = new MongoClient(`${DB_CONNECTION}:${DB_PORT}`, {
  useUnifiedTopology: true,
});

mongoClient.connect(async (connectionError, client) => {
  if (connectionError) {
    return console.error(connectionError);
  }

  try {
    const json = await csv().fromFile(file);

    const filteredJson = json.map((document) => {
      const filteredObj = {};
      const docKeys = Object.keys(document);
      docKeys.forEach((key) => {
        // const camelKey = convertToCamelCase(key);
        if (propToArray[key]) {
          filteredObj[key] = document[key].split(propToArray[key]);
        } else {
          filteredObj[key] = document[key];
        }
      });
      return filteredObj;
    });

    // console.log(filteredJson);

  //   const db = client.db(DB_NAME);
  //   const books = db.collection('books') || await db.createCollection('books');
  //   const { result: { ok, n } } = await books.insertMany();
  //   if (ok) {
  //     console.log(`Inserted ${n} documents`);
  //   }
    return mongoClient.close();
  } catch (error) {
    return console.error(error);
  }
});



const reformatData = (filterKeys, jsonArr) => {
  const filteredJsonArr = jsonArr.map((item) => {
    const updateObject = {};
    const objectKeys = Object.keys(item);
    objectKeys.forEach((key) => {
      const updateKey = key.toLowerCase();
      const camelKey = updateKey.split(' ').map((a, i) => (i > 0 ? `${a.charAt(0).toUpperCase()}${a.slice(1)}` : a)).join('');
      updateObject[camelKey] = item[key];
    });

    const keysToFilter = Object.keys(filterKeys);
    keysToFilter.forEach((key) => {
      if (updateObject[key]) {
        updateObject[key] = updateObject[key].split(filterKeys[key]);
      }
    });
    return updateObject;
  });

};

