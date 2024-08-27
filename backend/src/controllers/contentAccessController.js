const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');

// @desc    Get course content for enrolled courses
// @route   GET /api/courses/:id/content
// @access  Private (Student only)
const getCourseContent = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course && req.user.enrolledCourses.includes(course._id)) {
    res.json(course.contentUrls);
  } else {
    res.status(404);
    throw new Error('Course not found or not enrolled');
  }
});

module.exports = {
  getCourseContent,
};
