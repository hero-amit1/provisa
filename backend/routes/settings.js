const express = require('express');
const Settings = require('../models/Settings.cjs');


const router = express.Router();

// Public endpoint for frontend to render footer/contact.
router.get('/', async (req, res) => {
    try {
        const settings = await Settings.getSingleton();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;





