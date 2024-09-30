const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('../backend/routes/userRoute');

const app = express();

app.use(bodyParser.json());
app.use(cors()); 

app.use('/api/users', userRoutes);


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/user-address-db';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error: ', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
