const express = require('express');
const { issueCertificate } = require('../controllers/certificationController');
const { protect, teacherOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/issue', protect, teacherOnly, issueCertificate);

module.exports = router;
