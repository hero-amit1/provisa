const express = require('express');
const Inquiry = require('../models/Inquiry');
const router = express.Router();

// Public POST new inquiry (from forms)
router.post('/', async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    const inquiry = await newInquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully', id: inquiry._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
