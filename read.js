const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const { getDB } = require('./dbconnect');

const router = new express.Router();

router.post('/read/csv', async (req, res) => {
  try {
    const filePath = req.body.url;
    const db = getDB();
    const collection = db.collection('csv');
    const results = [];

    const client = db.client; // Get the MongoDB client from the db object

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', async () => {
        try {
          const insertResult = await collection.insertMany(results);
          console.log(`${insertResult.insertedCount} documents inserted`);
          res.status(200).json(insertResult);
        } catch (error) {
          console.error('An error occurred during insertion:', error);
          res.status(500).json({ error: 'An error occurred during insertion' });
        } finally {
          // Ensure the client is properly closed
          if (client) {
            await client.close();
            console.log('Disconnected from MongoDB');
          }
        }
      });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(400).json(error);
  }
});

module.exports = { router };







// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://shivammishra933579:Shivam9335@cluster0.cgpnbwf.mongodb.net/?retryWrites=true&w=majority";
// const dbName = 'assignment';
// const collectionName = 'users';
// const filePath = './sample_transactions.csv'; // Replace with your CSV file path

// async function readCsvAndStoreInMongoDB() {
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');

//     const database = client.db(dbName);
//     const collection = database.collection(collectionName);

    
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// }



// readCsvAndStoreInMongoDB();
