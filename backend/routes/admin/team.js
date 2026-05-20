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
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only images allowed'));
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
    console.error('GET /team error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==============================
// CREATE TEAM MEMBER (CLOUDINARY IMAGE)
// ==============================
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { name, role, bio } = req.body;

    // Validate required fields
    if (!name || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name and role are required fields',
      });
    }

    // Get Cloudinary image URL
    const imageUrl = req.file
      ? req.file.secure_url || req.file.path
      : null;

    const teamMember = new Team({
      name: name.trim(),
      role: role.trim(),
      bio: bio ? bio.trim() : '',
      image: imageUrl,
    });

    await teamMember.save();

    res.status(201).json({
      success: true,
      message: 'Team member created',
      data: teamMember,
    });

  } catch (err) {
    console.error('POST /team error:', err.message);

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    res.status(500).json({ success: false, message: err.message });
  }
});


// ==============================
// UPDATE TEAM MEMBER
// ==============================
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { name, role, bio } = req.body;

    // Validate required fields
    if (!name || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name and role are required fields',
      });
    }

    const updateData = {
      name: name.trim(),
      role: role.trim(),
      bio: bio ? bio.trim() : '',
    };

    // Update image only if new file uploaded
    if (req.file) {
      updateData.image = req.file.secure_url || req.file.path;
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
    console.error('PUT /team error:', err.message);

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    // Handle invalid MongoDB ObjectId
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid team member ID',
      });
    }

    res.status(500).json({ success: false, message: err.message });
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

    // Delete image from Cloudinary if exists
    if (teamMember.image) {
      try {
        // Extract public_id from Cloudinary URL
        const urlParts = teamMember.image.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = `team/${publicIdWithExtension.split('.')[0]}`;
        await cloudinary.uploader.destroy(publicId);
        console.log('Cloudinary image deleted:', publicId);
      } catch (cloudinaryErr) {
        // Log but don't fail the request if image deletion fails
        console.error('Cloudinary delete error:', cloudinaryErr.message);
      }
    }

    res.json({
      success: true,
      message: 'Team member deleted',
    });

  } catch (err) {
    console.error('DELETE /team error:', err.message);

    // Handle invalid MongoDB ObjectId
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid team member ID',
      });
    }

    res.status(500).json({ success: false, message: err.message });
  }
});


// ==============================
// MULTER ERROR HANDLER
// ==============================
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 2MB',
      });
    }
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
});


module.exports = router;