const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Course = require('../models/courseModel');

// @desc    Search for teachers, courses, or users
// @route   GET /api/search
// @access  Private
const search = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    res.status(400);
    throw new Error('Search query is required');
  }

  const users = await User.find({
    $or: [{ name: new RegExp(query, 'i') }, { email: new RegExp(query, 'i') }],
  }).select('name email role');

  const courses = await Course.find({
    $or: [{ title: new RegExp(query, 'i') }, { description: new RegExp(query, 'i') }],
  }).select('title description createdBy');

  res.json({ users, courses });
});

module.exports = {
  search,
};
