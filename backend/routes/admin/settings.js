const express = require('express');
const Settings = require('../../models/Settings.cjs');
const auth = require('../../middleware/auth');

const router = express.Router();

// GET current settings (admin only)
router.get('/', auth, async (req, res) => {
    try {
        const settings = await Settings.getSingleton();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Update settings (admin only)
router.put('/', auth, async (req, res) => {
    try {
        const { companyName, email, phone, address } = req.body || {};

        const settings = await Settings.getSingleton();

        if (typeof companyName === 'string') settings.companyName = companyName;
        if (typeof email === 'string') settings.email = email;
        if (typeof phone === 'string') settings.phone = phone;
        if (typeof address === 'string') settings.address = address;

        await settings.save();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;






