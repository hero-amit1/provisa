const express = require('express');
const Testimonial = require('../models/Testimonial');
const router = express.Router();

// Public GET all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(8);
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
