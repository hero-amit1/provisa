const express = require('express');
const Team = require('../../models/Team');
const auth = require('../../middleware/auth');
const router = express.Router();

// GET all
router.get('/', auth, async (req, res) => {
  try {
    const team = await Team.find().sort({ createdAt: -1 });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create
router.post('/', auth, async (req, res) => {
  try {
    const teamMember = new Team(req.body);
    await teamMember.save();
    res.status(201).json(teamMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update
router.put('/:id', auth, async (req, res) => {
  try {
    const teamMember = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!teamMember) return res.status(404).json({ error: 'Team member not found' });
    res.json(teamMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    const teamMember = await Team.findByIdAndDelete(req.params.id);
    if (!teamMember) return res.status(404).json({ error: 'Team member not found' });
    res.json({ message: 'Team member deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
