const express = require('express');
const { getStudentDashboard } = require('../controllers/studentDashboardController');
const { getTeacherDashboard } = require('../controllers/teacherDashboardController');
const { protect, studentOnly, teacherOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/student', protect, studentOnly, getStudentDashboard);
router.get('/teacher', protect, teacherOnly, getTeacherDashboard);

module.exports = router;
