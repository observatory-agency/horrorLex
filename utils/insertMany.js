require('dotenv').config();
const readline = require('readline');
const { createSearchIndex, handleCollection } = require('./helpers');
const Mongo = require('../lib/Mongo');

const {
  MONGO_ATLAS_API_PRIVATE_KEY,
  MONGO_ATLAS_API_PUBLIC_KEY,
  MONGO_ATLAS_CLUSTER_NAME,
  MONGO_ATLAS_GROUP_ID,
} = process.env;

const exec = async (name) => {
  try {
    await Mongo.connect();
    const { collection, docs } = await handleCollection(name);
    const { result: { n } } = await collection.model.insertMany(docs);
    const searchIndexRes = await createSearchIndex({
      collection,
      clusterName: MONGO_ATLAS_CLUSTER_NAME,
      groupId: MONGO_ATLAS_GROUP_ID,
      privateKey: MONGO_ATLAS_API_PRIVATE_KEY,
      publicKey: MONGO_ATLAS_API_PUBLIC_KEY,
    });
    console.log(`Inserted ${n} documents into collection "${collection.modelAttributes.name}"`);
  } catch (error) {
    console.error(error);
  }
  Mongo.close();
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the CSV file\'s collection name to "insertMany" (e.g., "books"): ', (filename) => {
  exec(filename);
  rl.close();
});
