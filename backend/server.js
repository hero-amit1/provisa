const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();

// ==============================
// ENV
// ==============================
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/provisa';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';


// ==============================
// CREATE UPLOAD FOLDER
// ==============================
fs.mkdirSync('uploads/blogs', { recursive: true });


// ==============================
// SECURITY MIDDLEWARE
// ==============================
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100
}));


// ==============================
// MIDDLEWARE
// ==============================
app.use(morgan('dev'));

app.use(cors({
  origin: [CLIENT_URL],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


// ==============================
// STATIC FILES (IMAGES)
// ==============================
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// ==============================
// ROUTES
// ==============================
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/api/auth', require('./routes/auth'));

app.use('/api/admin/blogs', require('./routes/admin/blogs'));
app.use('/api/admin/team', require('./routes/admin/team'));
app.use('/api/admin/testimonials', require('./routes/admin/testimonials'));
app.use('/api/admin/universities', require('./routes/admin/universities'));
app.use('/api/admin/inquiries', require('./routes/admin/inquiries'));

app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/blogs', require('./routes/blogs'));
// app.use('/api/services', require('./routes/services'));
app.use('/api/team', require('./routes/team'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/universities', require('./routes/universities'));


// ==============================
// HEALTH CHECK
// ==============================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    mongodb: mongoose.connection.readyState === 1
  });
});


// ==============================
// 404 HANDLER
// ==============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


// ==============================
// GLOBAL ERROR HANDLER
// ==============================
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);

  res.status(500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});


// ==============================
// MONGODB CONNECTION
// ==============================
mongoose.connect(MONGODB_URI, {
  autoIndex: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB error:', err);
  process.exit(1);
});


// ==============================
// SERVER START
// ==============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});