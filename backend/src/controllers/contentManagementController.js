const Course = require('../models/courseModel');

// @desc    Link content to a course
// @route   POST /api/courses/:id/content
// @access  Private (Teacher only)
const linkContentToCourse = async (req, res) => {
  const { contentUrls } = req.body;
  const course = await Course.findById(req.params.id);

  if (course) {
    course.contentUrls.push(...contentUrls);
    await course.save();
    res.status(200).json(course);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
};

module.exports = {
  linkContentToCourse,
};
