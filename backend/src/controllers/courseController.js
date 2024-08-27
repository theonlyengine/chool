const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// @desc    Upload course content and create course
// @route   POST /api/courses
// @access  Private (Teacher only)
const uploadCourse = asyncHandler(async (req, res) => {
  const { title, description, gradeLevel, subjects } = req.body;

  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('No files uploaded');
  }

  const contentUrls = await Promise.all(
    req.files.map(async (file) => {
      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => {
        throw new Error(`Failed to upload file: ${err.message}`);
      });

      blobStream.end(file.buffer);

      return `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    })
  );

  const course = await Course.create({
    title,
    description,
    gradeLevel,
    subjects,
    contentUrls,
    createdBy: req.user._id,
  });

  res.status(201).json(course);
});

module.exports = {
  uploadCourse,
};
