const express = require('express');
const { enrollInCourse, unenrollFromCourse } = require('../controllers/enrollmentController');
const { protect, studentOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:id/enroll', protect, studentOnly, enrollInCourse);
router.delete('/:id/unenroll', protect, studentOnly, unenrollFromCourse);

module.exports = router;
