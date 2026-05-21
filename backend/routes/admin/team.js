const express = require('express');
const Team = require('../../models/Team');
const auth = require('../../middleware/auth');
const multer = require('multer');

const {
  createCloudinaryStorage,
} = require('../../utils/cloudinaryStorage');

const { conditionalUpload } = require('../../middleware/conditionalUpload');

const router = express.Router();


// ======================================
// CLOUDINARY STORAGE
// ======================================

const storage = createCloudinaryStorage({
  folder: 'team',
  width: 800,
});


// ======================================
// MULTER CONFIG
// ======================================

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
      return cb(
        new multer.MulterError(
          'LIMIT_UNEXPECTED_FILE',
          'Only images allowed'
        )
      );
    }

    cb(null, true);
  },
});


// ======================================
// HELPER: LOG UPLOAD ERRORS
// ======================================

const logUploadError = (context, err, req) => {
  const file = req.file;

  console.error('Upload error:', {
    context,
    message: err?.message,
    http_code: err?.http_code,
    name: err?.name,
    mimetype: file?.mimetype,
    size: file?.size,
    hasFile: !!file,
    originalname: file?.originalname,
    fieldname: file?.fieldname,
    contentType: req.headers['content-type'],
    method: req.method,
    path: req.originalUrl,
    bodyKeys: req.body ? Object.keys(req.body) : [],
    authUserId: req.user?._id || req.user?.id || null,
  });
};


// ======================================
// CONDITIONAL UPLOAD MIDDLEWARE
// ======================================

const uploadMiddleware = (req, res, next) =>
  conditionalUpload(upload)(req, res, (err) => {
    if (!err) return next();

    logUploadError('admin/team', err, req);

    const file = req.file;

    return res.status(400).json({
      success: false,
      message: err?.message || 'Image upload failed',
      cloudinaryHttpCode: err?.http_code,
      cloudinaryErrorName: err?.name,
      mimetype: file?.mimetype,
      size: file?.size,
      hasFile: !!file,
    });
  });


// ======================================
// GET ALL TEAM MEMBERS
// ======================================

router.get('/', auth, async (req, res) => {
  try {
    const team = await Team.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: team,
    });
  } catch (err) {
    console.error(
      'GET /team error:',
      err.message
    );

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// ======================================
// CREATE TEAM MEMBER
// ======================================

router.post(
  '/',
  auth,
  uploadMiddleware,
  async (req, res) => {
    try {
      console.log('BODY:', req.body);
      console.log('FILE:', req.file);

      const {
        name,
        role,
        bio,
        facebook,
        instagram,
        linkedin,
        twitter,
      } = req.body;

      // Validation
      if (!name || !role) {
        return res.status(400).json({
          success: false,
          message:
            'Name and role are required',
        });
      }

      const teamMember = new Team({
        name: name.trim(),

        role: role.trim(),

        bio: bio || '',

        social: {
          facebook:
            facebook || '',

          instagram:
            instagram || '',

          linkedin:
            linkedin || '',

          twitter:
            twitter || '',
        },

        image:
          req.file
            ? req.file.secure_url ||
              req.file.url ||
              req.file.path ||
              req.file.filename ||
              ''
            : '',
      });

      await teamMember.save();

      res.status(201).json({
        success: true,
        message:
          'Team member created successfully',
        data: teamMember,
      });
    } catch (err) {
      console.error(
        'Create team member error:',
        err
      );

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);


// ======================================
// UPDATE TEAM MEMBER
// ======================================

router.put(
  '/:id',
  auth,
  uploadMiddleware,
  async (req, res) => {
    try {
      console.log(
        'UPDATE TEAM BODY:',
        req.body
      );

      console.log(
        'UPDATE TEAM FILE:',
        req.file
      );

      const updateData = {};

      // Name
      if (req.body.name !== undefined) {
        updateData.name =
          req.body.name.trim();
      }

      // Role
      if (req.body.role !== undefined) {
        updateData.role =
          req.body.role.trim();
      }

      // Bio
      if (req.body.bio !== undefined) {
        updateData.bio =
          req.body.bio;
      }

      // Social Links
      updateData.social = {
        facebook:
          req.body.facebook || '',

        instagram:
          req.body.instagram || '',

        linkedin:
          req.body.linkedin || '',

        twitter:
          req.body.twitter || '',
      };

      // Image
      if (req.file) {
        updateData.image =
          req.file.secure_url ||
          req.file.url ||
          req.file.path ||
          req.file.filename;
      }

      const teamMember =
        await Team.findByIdAndUpdate(
          req.params.id,
          updateData,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!teamMember) {
        return res.status(404).json({
          success: false,
          message:
            'Team member not found',
        });
      }

      res.status(200).json({
        success: true,
        message:
          'Team member updated successfully',
        data: teamMember,
      });
    } catch (err) {
      console.error(
        'Update team member error:',
        err
      );

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);


// ======================================
// DELETE TEAM MEMBER
// ======================================

router.delete(
  '/:id',
  auth,
  async (req, res) => {
    try {
      const teamMember =
        await Team.findByIdAndDelete(
          req.params.id
        );

      if (!teamMember) {
        return res.status(404).json({
          success: false,
          message:
            'Team member not found',
        });
      }

      res.json({
        success: true,
        message:
          'Team member deleted successfully',
      });
    } catch (err) {
      console.error(
        'Delete team member error:',
        err
      );

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);


// ======================================
// MULTER ERROR HANDLER
// ======================================

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message:
          'File size too large. Maximum size is 2MB',
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