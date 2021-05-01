const readline = require('readline');
const { DataImport, handleCollection } = require('./helpers');
const Mongo = require('../lib/Mongo');

const exec = async (name) => {
  try {
    await Mongo.connect();
    const dataImport = new DataImport();
    await dataImport.fromCsv(`./data/${name}.csv`);
    const collection = handleCollection(name);

    dataImport.mutateEach(collection.transformer);

    const { docs } = dataImport;
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
