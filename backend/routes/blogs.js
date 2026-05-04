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

// GET single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
