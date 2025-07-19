const Review = require('../models/review.model');

// GET all reviews for an album
exports.getReviewsByAlbum = async (req, res) => {
  try {
    const reviews = await Review.find({ albumId: req.params.albumId }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST new review
exports.createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const saved = await newReview.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update review
exports.updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Review not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE review
exports.deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};