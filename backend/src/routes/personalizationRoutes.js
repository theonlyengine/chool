const express = require('express');
const { savePersonalization, getPersonalizedContent } = require('../controllers/personalizationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, savePersonalization).get(protect, getPersonalizedContent);

module.exports = router;
