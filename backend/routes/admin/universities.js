const express = require('express');
const University = require('../../models/University');
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const universities = await University.find().sort({ createdAt: -1 });
    res.json(universities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/universities/${req.file.filename}` : undefined;
    const university = new University({
      name: req.body.name,
      country: req.body.country,
      image: imagePath
    });
    await university.save();
    res.status(201).json(university);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      country: req.body.country
    };
    if (req.file) {
      updateData.image = `/uploads/universities/${req.file.filename}`;
    }
    const university = await University.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!university) return res.status(404).json({ error: 'University not found' });
    res.json(university);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);
    if (!university) return res.status(404).json({ error: 'University not found' });
    res.json({ message: 'University deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
