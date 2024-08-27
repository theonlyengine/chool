const express = require('express');
const { linkContentToCourse } = require('../controllers/contentManagementController');
const { protect, teacherOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/courses/:id/content', protect, teacherOnly, linkContentToCourse);

module.exports = router;
