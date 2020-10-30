require('dotenv').config();
const { MongoClient } = require('mongodb');

const {
  DB_CONNECTION,
  DB_NAME,
  DB_PORT,
} = process.env;

const mongoClient = new MongoClient(`${DB_CONNECTION}:${DB_PORT}`, { useUnifiedTopology: true });

mongoClient.connect(async (connectionError, client) => {
  if (connectionError) {
    return console.error(connectionError);
  }
  try {
    const db = client.db(DB_NAME);
    const books = db.collection('books') || await db.createCollection('books');
    const success = await books.drop();
    if (success) {
      console.log('Dropped "books" collection!');
    }
    mongoClient.close();
  } catch (error) {
    return console.error(error);
  }
});
