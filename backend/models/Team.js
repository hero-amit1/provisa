const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  social: { type: Map, of: String }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
