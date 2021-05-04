const readline = require('readline');
const { handleCollection } = require('./helpers');
const Mongo = require('../lib/Mongo');

const exec = async (name) => {
  try {
    await Mongo.connect();
    const { collection, docs } = await handleCollection(name);
    const { result: { n } } = await collection.model.insertMany(docs);
    console.log(`Inserted ${n} documents into collection "${collection.modelName}"`);
  } catch (error) {
    console.error(error);
  }
  Mongo.close();
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter collection name to INSERT_MANY: ', (filename) => {
  exec(filename);
  rl.close();
});
