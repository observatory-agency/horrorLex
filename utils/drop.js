require('dotenv').config();
const { MongoClient } = require('mongodb');
const collections = require('../constants/collections');

const {
  DB_CONNECTION,
  DB_NAME,
  DB_PORT,
} = process.env;

const dropCollection = async (db, name) => {
  try {
    const collection = db.collection(name);
    const success = await collection.drop();
    return { name, success };
  } catch (error) {
    return console.error({ name, error });
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
      (collection) => dropCollection(db, collection),
    ));
    res.forEach((item) => item && item.success && console.log(
      `Dropped collection "${item.name}"`,
    ));
    return mongoClient.close();
  } catch (error) {
    return console.error(error);
  }
});
