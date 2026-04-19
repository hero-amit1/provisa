const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
