const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // You can add more fields as needed, like password, profilePic, etc.
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); // Make sure the model name is 'User'