const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String },
  releaseDate: { type: Date },
  coverImage: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);