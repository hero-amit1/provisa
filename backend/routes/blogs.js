const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Public GET all blogs (latest first)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(12);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
