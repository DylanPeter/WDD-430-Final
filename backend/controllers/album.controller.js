const Album = require('../models/album.model');

// GET all albums
exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one album by ID
exports.getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: 'Album not found' });
    res.json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST new album
exports.createAlbum = async (req, res) => {
  try {
    const newAlbum = new Album(req.body);
    const saved = await newAlbum.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update album
exports.updateAlbum = async (req, res) => {
  try {
    const updated = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Album not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE album
exports.deleteAlbum = async (req, res) => {
  try {
    const deleted = await Album.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Album not found' });
    res.json({ message: 'Album deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};