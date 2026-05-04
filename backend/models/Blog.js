const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  excerpt: { type: String },
  content: { type: String, required: true },
  category: { type: String },
  image: { type: String },
  status: { type: String, default: 'draft' }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);