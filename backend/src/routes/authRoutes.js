// backend/src/routes/authRoutes.js
const express = require('express');
const {
  registerUser,
  authUser,
  metamaskAuth,
  googleAuth,
  googleAuthCallback,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/metamask', metamaskAuth);
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);

module.exports = router;
