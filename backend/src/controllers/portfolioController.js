const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Get certificates and achievements
// @route   GET /api/portfolio
// @access  Private (Student only)
const getPortfolio = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('certificates');

  if (user) {
    res.json({
      certificates: user.certificates,
      achievements: user.achievements,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  getPortfolio,
};
