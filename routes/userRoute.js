const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Address = require('../models/Address');

router.post('/submit', async (req, res) => {
  const { name, street, city, zip } = req.body;

  try {

    const newUser = new User({ name });
    const savedUser = await newUser.save();
    const newAddress = new Address({
      street,
      city,
      zip,
      user: savedUser._id
    });

    const savedAddress = await newAddress.save();
    savedUser.addresses.push(savedAddress._id);
    await savedUser.save();

    res.status(201).json({ message: 'User and address saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user and address', error });
  }
});

module.exports = router;
