// routes/review.routes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/review.model');

// GET all reviews for a specific album
router.get('/album/:albumId', async (req, res) => {
  try {
    const reviews = await Review.find({ albumId: req.params.albumId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new review
router.post('/', async (req, res) => {
  const { albumId, rating, comment } = req.body;

  if (!albumId || !rating || !comment) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const review = new Review({ albumId, rating, comment });
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;