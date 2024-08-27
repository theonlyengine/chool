const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Course = require('../models/courseModel');

// @desc    Get teacher dashboard data
// @route   GET /api/dashboard/teacher
// @access  Private (Teacher only)
const getTeacherDashboard = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.user._id)
    .populate('enrolledCourses') // Assuming teachers also have courses they manage
    .select('-password');

  if (teacher) {
    const courses = await Course.find({ createdBy: req.user._id });

    res.json({
      managedCourses: courses,
      studentAnalytics: teacher.performanceAnalytics, // Aggregate data needed for teacher's view
    });
  } else {
    res.status(404);
    throw new Error('Teacher not found');
  }
});

// @desc    Upload a new course (handled by the existing course controller)

module.exports = {
  getTeacherDashboard,
};
