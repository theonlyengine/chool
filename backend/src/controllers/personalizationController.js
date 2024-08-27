const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Save personalization settings
// @route   POST /api/personalization
// @access  Private (Student only)
const savePersonalization = asyncHandler(async (req, res) => {
  const { focusAreas, preferredLearningStyle } = req.body;

  req.user.personalization = { focusAreas, preferredLearningStyle };
  const updatedUser = await req.user.save();

  res.json(updatedUser.personalization);
});

// @desc    Get personalized learning content
// @route   GET /api/personalization
// @access  Private (Student only)
const getPersonalizedContent = asyncHandler(async (req, res) => {
  const personalizedContent = {}; // Integrate with Choolia AI or other logic here

  res.json(personalizedContent);
});

module.exports = {
  savePersonalization,
  getPersonalizedContent,
};
