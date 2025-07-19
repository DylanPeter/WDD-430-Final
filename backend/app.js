const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const albumRoutes = require('./routes/album.routes');
const reviewRoutes = require('./routes/review.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// API Routes
app.use('/api/albums', albumRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Music Review API is running 🎵');
  });

module.exports = app;