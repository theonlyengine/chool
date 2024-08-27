const express = require('express');
const { rewardStudent } = require('../controllers/tokenController');
const { protect, teacherOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/reward', protect, teacherOnly, rewardStudent);

module.exports = router;
