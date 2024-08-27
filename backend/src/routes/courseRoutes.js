const express = require('express');
const { uploadCourse } = require('../controllers/courseController');
const { protect, teacherOnly } = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/', protect, teacherOnly, upload.array('files'), uploadCourse);

module.exports = router;
