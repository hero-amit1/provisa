const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String },
  website: { type: String },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('University', universitySchema);
