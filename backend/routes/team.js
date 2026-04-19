const express = require('express');
const Team = require('../models/Team');
const router = express.Router();

// Public GET all team members
router.get('/', async (req, res) => {
  try {
    const team = await Team.find().sort({ createdAt: -1 });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
