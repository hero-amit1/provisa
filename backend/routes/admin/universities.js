const express = require('express');
const University = require('../../models/University');
const auth = require('../../middleware/auth');
const dotenv = require('dotenv');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

dotenv.config();

const router = express.Router();


// ==============================
// CLOUDINARY CONFIG
// ==============================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// ==============================
// MULTER + CLOUDINARY STORAGE
// ==============================
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'universities',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1000, crop: 'limit' }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
      return cb(new Error('Only images allowed'));
    }
    cb(null, true);
  },
});


// ==============================
// GET ALL UNIVERSITIES
// ==============================
router.get('/', auth, async (req, res) => {
  try {
    const universities = await University.find().sort({ createdAt: -1 });
    res.json({ success: true, data: universities });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==============================
// CREATE UNIVERSITY (CLOUDINARY IMAGE)
// ==============================
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, country } = req.body;

    const university = new University({
      name,
      country,
      image: req.file ? req.file.path : null, // Cloudinary URL
    });

    await university.save();

    res.status(201).json({
      success: true,
      message: 'University created',
      data: university,
    });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});


// ==============================
// UPDATE UNIVERSITY
// ==============================
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      country: req.body.country,
    };

    if (req.file) {
      updateData.image = req.file.path; // Cloudinary URL
    }

    const university = await University.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found',
      });
    }

    res.json({
      success: true,
      message: 'University updated',
      data: university,
    });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});


// ==============================
// DELETE UNIVERSITY
// ==============================
router.delete('/:id', auth, async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found',
      });
    }

    res.json({
      success: true,
      message: 'University deleted',
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;