const Review = require('../models/review.model');

exports.getReviewsByAlbum = async (req, res) => {
  try {
    const reviews = await Review.find({ albumId: req.params.albumId })
      .populate('userId', 'name')
      .populate('albumId', 'title'); 
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId })
      .populate('userId', 'name')
      .populate('albumId', 'title');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createReview = async (req, res) => {
  const { albumId, rating, comment, userId } = req.body;

  if (!albumId || !rating || !comment || !userId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const review = new Review({
      albumId,
      rating,
      comment,
      userId,
      date: new Date(),
    });

    const savedReview = await review.save();

    // Re-fetch the review with populated user name
    const populatedReview = await Review.findById(savedReview._id).populate('userId', 'name');

    res.status(201).json(populatedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};