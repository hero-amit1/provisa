const express = require('express');
const Blog = require('../../models/Blog');
const auth = require('../../middleware/auth');
const slugify = require('slugify');
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
// MULTER CLOUDINARY STORAGE
// ==============================
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blogs',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, crop: 'limit' }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Only jpg, png, webp allowed'));
    }

    cb(null, true);
  },
});


// ==============================
// GET ALL BLOGS
// ==============================
router.get('/', auth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==============================
// GET SINGLE BLOG
// ==============================
router.get('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==============================
// CREATE BLOG
// ==============================
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content required',
      });
    }

    const blog = new Blog({
      title,
      content,
      category,
      slug: slugify(title + '-' + Date.now(), { lower: true }),
      image: req.file ? req.file.path : null,
    });

    const saved = await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created',
      data: saved,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==============================
// UPDATE BLOG
// ==============================
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const updateData = {};

    if (req.body.title) {
      updateData.title = req.body.title;
      updateData.slug = slugify(req.body.title + '-' + Date.now(), {
        lower: true,
      });
    }

    if (req.body.content) updateData.content = req.body.content;
    if (req.body.category) updateData.category = req.body.category;

    if (req.file) updateData.image = req.file.path;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.json({
      success: true,
      message: 'Blog updated',
      data: blog,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==============================
// DELETE BLOG
// ==============================
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.json({
      success: true,
      message: 'Blog deleted',
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;