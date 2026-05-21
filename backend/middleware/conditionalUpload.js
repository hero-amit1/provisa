const getFileToUpload = (req) => {
  // Multer itself populates req.file/req.files only after it runs.
  // For conditional logic, we rely on whether the request is multipart
  // and whether the multipart body includes a file.
  //
  // In practice, the easiest reliable approach is:
  // - If the request includes a file field, multer will find it.
  // - If not, we should avoid calling multer at all.
  //
  // Here we attempt to detect the presence of multipart data by
  // checking the content-type and (when available) the raw body.
  //
  // NOTE: If your frontend always sends the image field only when selected,
  // then skipping multer when no file selected is safe.
  const ct = req.headers['content-type'] || '';
  const isMultipart = typeof ct === 'string' && ct.includes('multipart/form-data');

  return { isMultipart };
};

/**
 * Wrap multer middleware so it only runs when multipart is present.
 * This prevents Cloudinary signature/multer failures when the user didn't select a file.
 *
 * Usage:
 *   router.post('/', auth, conditionalUpload(upload), handler)
 */
function conditionalUpload(multerMiddleware) {
  return (req, res, next) => {
    const { isMultipart } = getFileToUpload(req);

    // If not multipart, nothing to upload.
    if (!isMultipart) {
      return next();
    }

    // Multipart present -> run multer.
    return multerMiddleware(req, res, next);
  };
}

module.exports = {
  conditionalUpload,
};

