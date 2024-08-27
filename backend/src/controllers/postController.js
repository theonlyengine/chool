const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

// @desc    Create a new post (question)
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { question } = req.body;
  const post = new Post({
    user: req.user._id,
    question,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Answer a post (question)
// @route   POST /api/posts/:id/answer
// @access  Private
const answerPost = asyncHandler(async (req, res) => {
  const { answer } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    post.answers.push({ user: req.user._id, answer });
    await post.save();
    res.status(201).json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate('user', 'name').populate('answers.user', 'name');
  res.json(posts);
});

module.exports = {
  createPost,
  answerPost,
  getPosts,
};
