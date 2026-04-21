const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  content: { type: String, required: true },
  category: { type: String },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);