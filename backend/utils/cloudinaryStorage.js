const dotenv = require('dotenv');
dotenv.config();

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

function ensureCloudinaryConfig() {
  const required = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
  ];

  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    const msg = `Missing Cloudinary environment variables: ${missing.join(
      ', '
    )}`;
    const err = new Error(msg);
    err.code = 'E_CLOUDINARY_CONFIG';
    throw err;
  }

  // Debugging aid: log Cloudinary identity + secret presence (never log the secret itself)
  // Helps diagnose “Invalid Signature” issues.
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (process.env.CLOUDINARY_DEBUG === '1') {
    console.log('[Cloudinary] config loaded:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret_present: typeof secret === 'string' && secret.length > 0,
      api_secret_length: typeof secret === 'string' ? secret.length : undefined,
    });
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}


ensureCloudinaryConfig();

const DEFAULT_ALLOWED_FORMATS = [
  'jpg',
  'jpeg',
  'png',
  'webp',
];

const DEFAULT_TRANSFORMATION = (width) => [
  {
    width,
    crop: 'limit',
  },
];

function createCloudinaryStorage({ folder, width }) {
  if (!folder) {
    throw new Error('createCloudinaryStorage: folder is required');
  }

  const numericWidth = width ? Number(width) : undefined;
  const finalWidth = Number.isFinite(numericWidth) ? numericWidth : 1200;

  // NOTE: `params` must be deterministic/stable. Using an async function can
  // cause subtle signature mismatches depending on the multer-storage-cloudinary
  // version.
  return new CloudinaryStorage({
    cloudinary,
    // Some versions of `multer-storage-cloudinary` can be picky about where the
    // credentials live; explicitly passing them makes signature generation stable.
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    params: () => ({
      folder,
      resource_type: 'image',
      allowed_formats: DEFAULT_ALLOWED_FORMATS,
      transformation: DEFAULT_TRANSFORMATION(finalWidth),
    }),
  });
}

module.exports = {
  cloudinary,
  createCloudinaryStorage,
};

