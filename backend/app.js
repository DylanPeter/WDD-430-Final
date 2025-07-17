// backend/app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect('mongodb://localhost:27017/music-review', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes (you'll add real ones later)
app.get('/', (req, res) => {
  res.send('Music Review API is running');
});

module.exports = app;