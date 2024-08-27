const express = require('express');
const { getCourseContent } = require('../controllers/contentAccessController');
const { protect, studentOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id/content', protect, studentOnly, getCourseContent);

module.exports = router;
