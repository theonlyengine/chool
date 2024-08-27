const express = require('express');
const { getPortfolio } = require('../controllers/portfolioController');
const { protect, studentOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, studentOnly, getPortfolio);

module.exports = router;
