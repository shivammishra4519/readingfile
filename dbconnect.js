
const { MongoClient } = require('mongodb');

const url="mongodb+srv://shivammishra933579:Shivam9335@cluster0.cgpnbwf.mongodb.net/?retryWrites=true&w=majority";


let db = null;

async function connectToDB() {
  try {
    const client = await MongoClient.connect( await url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db = client.db('assignment');
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database connection has not been established.');
  }

  return db;
}

module.exports = {
  connectToDB,
  getDB
};

