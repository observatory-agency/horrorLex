const readline = require('readline');
const { handleCollection } = require('./helpers');
const Mongo = require('../lib/Mongo');

const exec = async (name) => {
  try {
    await Mongo.connect();
    const { collection } = await handleCollection(name);
    await collection.model.drop();
    console.log(`Dropped collection "${collection.modelAttributes.name}"`);
  } catch (error) {
    console.error(error);
  }
  Mongo.close();
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter collection name to DROP: ', (filename) => {
  exec(filename);
  rl.close();
});
