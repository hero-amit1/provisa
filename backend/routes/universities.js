const express = require('express');
const University = require('../models/University');
const router = express.Router();

// Public GET all universities
router.get('/', async (req, res) => {
  try {
    const universities = await University.find().sort({ createdAt: -1 });
    res.json(universities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
