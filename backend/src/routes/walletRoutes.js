const express = require('express');
const { getEduTokenBalance } = require('../controllers/walletController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/balance', protect, getEduTokenBalance);

module.exports = router;
