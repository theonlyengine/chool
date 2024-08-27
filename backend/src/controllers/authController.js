// backend/src/controllers/authController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Web3 = require('web3');
const passport = require('passport');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register or login user with MetaMask
// @route   POST /api/auth/metamask
// @access  Public
const metamaskAuth = asyncHandler(async (req, res) => {
  const { address, signature } = req.body;

  const web3 = new Web3();

  const message = `Sign this message to confirm your identity: ${process.env.SIGN_MESSAGE}`;
  const signerAddress = web3.eth.accounts.recover(message, signature);

  if (signerAddress.toLowerCase() === address.toLowerCase()) {
    let user = await User.findOne({ email: address });

    if (!user) {
      user = await User.create({
        name: 'MetaMask User',
        email: address,
        password: signature, // Consider using a more secure method for handling password-less logins
        role: 'student', // Default role
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid MetaMask signature');
  }
});

// @desc    Google OAuth Login
// @route   GET /api/auth/google
// @access  Public
const googleAuthCallback = passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
});

const googleAuthHandler = (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`/auth/success?token=${token}`);
};

module.exports = {
    registerUser,
    authUser,
    metamaskAuth,
    googleAuth,
    googleAuthCallback,
    googleAuthHandler, // Ensure this is exported if needed
};
