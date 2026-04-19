const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/provisa';

const app = express();

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:4173'], // Vite dev/prod
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Favicon endpoint to prevent 404/CSP errors
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin/blogs', require('./routes/admin/blogs'));
app.use('/api/admin/services', require('./routes/admin/services'));
app.use('/api/admin/team', require('./routes/admin/team'));
app.use('/api/admin/testimonials', require('./routes/admin/testimonials'));
app.use('/api/admin/universities', require('./routes/admin/universities'));
app.use('/api/admin/inquiries', require('./routes/admin/inquiries'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/services', require('./routes/services'));
app.use('/api/team', require('./routes/team'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/universities', require('./routes/universities'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', mongodb: mongoose.connection.readyState === 1 });
});

// Production login via auth routes (matches frontend API call)


// Create uploads dir if not exists
const fs = require('fs');
fs.mkdirSync('public/uploads', { recursive: true });

// Mongo connect
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

