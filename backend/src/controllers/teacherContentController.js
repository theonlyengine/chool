const { Storage } = require('@google-cloud/storage');
const asyncHandler = require('express-async-handler');

const storage = new Storage();
const bucketName = process.env.GCLOUD_STORAGE_BUCKET;

// @desc    Upload course content
// @route   POST /api/content/upload
// @access  Private (Teacher only)
const uploadContent = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('No files uploaded');
  }

  const contentUrls = await Promise.all(
    req.files.map(async (file) => {
      const blob = storage.bucket(bucketName).file(file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on('error', (err) => {
        throw new Error(`Failed to upload file: ${err.message}`);
      });

      blobStream.end(file.buffer);

      return `https://storage.googleapis.com/${bucketName}/${file.originalname}`;
    })
  );

  res.status(201).json({ contentUrls });
});

module.exports = {
  uploadContent,
};
