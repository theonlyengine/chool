const express = require('express');
const { createPost, answerPost, getPosts } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPost);
router.post('/:id/answer', protect, answerPost);
router.get('/', protect, getPosts);

module.exports = router;
