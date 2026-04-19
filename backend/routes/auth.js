const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Temp in-memory admin (replace with User model later)
const adminUser = {
  email: 'admin@provisa.com',
  password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password
};

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== adminUser.email) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'fallbacksecret', { expiresIn: '7d' });
    res.json({ token, user: { email, role: 'admin' } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
