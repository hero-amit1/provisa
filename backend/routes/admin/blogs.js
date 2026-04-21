const express = require('express');
const Blog = require('../../models/Blog');
const auth = require('../../middleware/auth');
const multer = require('multer');
const slugify = require('slugify');
const path = require('path');

const router = express.Router();


// ==============================
// MULTER CONFIG (IMAGE UPLOAD)
// ==============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/blogs');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
      return cb(new Error('Only images allowed'));
    }
    cb(null, true);
  }
});


// ==============================
// GET ALL BLOGS
// ==============================
router.get('/', auth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==============================
// GET BLOG BY ID
// ==============================
router.get('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==============================
// CREATE BLOG (WITH IMAGE)
// ==============================
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const blog = new Blog({
      title,
      content,
      category,
      slug: slugify(title, { lower: true }),
      image: req.file ? `/uploads/blogs/${req.file.filename}` : null
    });

    const savedBlog = await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: savedBlog
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ==============================
// UPDATE BLOG (WITH IMAGE)
// ==============================
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;

    let updateData = {
      title,
      content,
      category
    };

    if (title) {
      updateData.slug = slugify(title, { lower: true });
    }

    if (req.file) {
      updateData.image = `/uploads/blogs/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
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
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;