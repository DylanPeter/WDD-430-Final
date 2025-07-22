// routes/review.routes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

// GET all reviews for a specific album
router.get('/album/:albumId', reviewController.getReviewsByAlbum);


// GET all reviews by a specific user
router.get('/user/:userId', reviewController.getReviewsByUser);

// POST a new review
router.post('/', reviewController.createReview);

module.exports = router;