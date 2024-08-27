const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Course = require('../models/courseModel');

// @desc    Get student dashboard data
// @route   GET /api/dashboard/student
// @access  Private (Student only)
const getStudentDashboard = asyncHandler(async (req, res) => {
  const student = await User.findById(req.user._id)
    .populate('enrolledCourses')
    .select('-password');

  if (student) {
    res.json({
      enrolledCourses: student.enrolledCourses,
      tasks: {
        completed: student.performanceAnalytics.tasksCompleted,
        pending: student.performanceAnalytics.tasksPending,
      },
      recentContacts: student.recentContacts,
      performanceAnalytics: student.performanceAnalytics,
      progressReports: student.progressReports,
      recommendedActivities: student.recommendedActivities,
    });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

module.exports = {
  getStudentDashboard,
};
