const express = require('express');
const Team = require('../../models/Team');
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
    folder: 'team',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, crop: 'limit' }],
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
// GET ALL TEAM MEMBERS
// ==============================
router.get('/', auth, async (req, res) => {
  try {
    const team = await Team.find().sort({ createdAt: -1 });
    res.json({ success: true, data: team });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==============================
// CREATE TEAM MEMBER (CLOUDINARY IMAGE)
// ==============================
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, role, bio } = req.body;

    const teamMember = new Team({
      name,
      role,
      bio,
      image: req.file ? req.file.path : null, // Cloudinary URL
    });

    await teamMember.save();

    res.status(201).json({
      success: true,
      message: 'Team member created',
      data: teamMember,
    });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});


// ==============================
// UPDATE TEAM MEMBER
// ==============================
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      role: req.body.role,
      bio: req.body.bio,
    };

    if (req.file) {
      updateData.image = req.file.path; // Cloudinary URL
    }

    const teamMember = await Team.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.json({
      success: true,
      message: 'Team member updated',
      data: teamMember,
    });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});


// ==============================
// DELETE TEAM MEMBER
// ==============================
router.delete('/:id', auth, async (req, res) => {
  try {
    const teamMember = await Team.findByIdAndDelete(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.json({
      success: true,
      message: 'Team member deleted',
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;