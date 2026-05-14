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
        if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
            return res.status(400).json({ success: false, message: 'Invalid request body' });
        }

        const allowedKeys = ['companyName', 'email', 'phone', 'address'];
        const incoming = req.body;

        // If client sends unknown keys, ignore them (but do not fail)
        for (const key of Object.keys(incoming)) {
            if (!allowedKeys.includes(key)) delete incoming[key];
        }

        const normalizeString = (v) => {
            if (typeof v !== 'string') return undefined;
            const trimmed = v.trim();
            return trimmed;
        };

        const validateEmail = (v) => {
            // Simple email format check
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        };

        const validatePhone = (v) => {
            // Allow digits, spaces, plus, hyphen, parentheses
            return /^[0-9+\-()\s]{5,}$/.test(v);
        };

        const settings = await Settings.getSingleton();

        let changed = false;

        const companyName = normalizeString(incoming.companyName);
        if (typeof companyName === 'string') {
            settings.companyName = companyName;
            changed = true;
        }

        const email = normalizeString(incoming.email);
        if (typeof email === 'string') {
            if (email !== '' && !validateEmail(email)) {
                return res.status(400).json({ success: false, message: 'Invalid email format' });
            }
            settings.email = email;
            changed = true;
        }

        const phone = normalizeString(incoming.phone);
        if (typeof phone === 'string') {
            if (phone !== '' && !validatePhone(phone)) {
                return res.status(400).json({ success: false, message: 'Invalid phone format' });
            }
            settings.phone = phone;
            changed = true;
        }

        const address = normalizeString(incoming.address);
        if (typeof address === 'string') {
            settings.address = address;
            changed = true;
        }

        if (!changed) {
            return res.json(settings);
        }

        await settings.save();
        return res.json(settings);
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;








