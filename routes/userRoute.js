const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017'; // Change this to your MongoDB connection string
const client = new MongoClient(uri);
const dbName = 'yourDatabaseName'; // Replace with your actual database name

router.post('/submit', async (req, res) => {
  const { name, street, city, zip } = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);

    // Insert the user
    const userResult = await db.collection('users').insertOne({ name });
    const userId = userResult.insertedId;

    // Insert the address and associate with the user
    const addressResult = await db.collection('addresses').insertOne({
      street,
      city,
      zip,
      user: userId
    });

    // Update the user document to include the address reference
    await db.collection('users').updateOne(
      { _id: userId },
      { $push: { addresses: addressResult.insertedId } }
    );

    res.status(201).json({ message: 'User and address saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user and address', error });
  } finally {
    await client.close();
  }
});

module.exports = router;
