const express = require('express');
const router = express.Router();
const axios = require('axios');
const Album = require('../models/album.model'); // adjust path as needed
const mongoose = require('mongoose')

// Import Deezer album by ID and save to DB
// album.routes.js or similar
router.post('/import', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Album name required' });

  try {
    const response = await axios.get(`https://api.deezer.com/search/album?q=${encodeURIComponent(name)}`);
    const result = response.data.data[0];

    if (!result) return res.status(404).json({ message: 'No album found on Deezer.' });

    const existing = await Album.findOne({ deezerId: result.id });
    if (existing) return res.status(409).json({ message: 'Album already exists' });

    const newAlbum = new Album({
      title: result.title,
      artist: result.artist.name,
      genre: 'Unknown',
      releaseDate: result.release_date || new Date('2000-01-01'),
      coverImage: result.cover_medium,
      deezerId: result.id
    });

    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    console.error('Deezer Import Error:', err.message);
    res.status(500).json({ message: 'Failed to import album' });
  }
});

// GET all albums
router.get('/', async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch albums.' });
  }
});

// GET single album
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Check if it's a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid album ID format.' });
  }

  try {
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.json(album);
  } catch (err) {
    console.error('Error fetching album:', err.message);
    res.status(500).json({ message: 'Error fetching album.' });
  }
});
module.exports = router;