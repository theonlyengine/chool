const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Course = require('../models/courseModel');

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
// @access  Private (Student only)
const enrollInCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    if (req.user.enrolledCourses.includes(course._id)) {
      res.status(400);
      throw new Error('Already enrolled in this course');
    }
    req.user.enrolledCourses.push(course._id);
    await req.user.save();
    res.status(200).json({ message: 'Enrolled successfully' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Unenroll from a course
// @route   DELETE /api/courses/:id/unenroll
// @access  Private (Student only)
const unenrollFromCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    req.user.enrolledCourses = req.user.enrolledCourses.filter(
      (courseId) => courseId.toString() !== course._id.toString()
    );
    await req.user.save();
    res.status(200).json({ message: 'Unenrolled successfully' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

module.exports = {
  enrollInCourse,
  unenrollFromCourse,
};
