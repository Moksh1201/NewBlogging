
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

//get all users
router.get('/users', authMiddleware, async (req, res) => {
  try {
    const users = await adminController.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get all posts
router.get('/posts', authMiddleware, async (req, res) => {
  try {
    const posts = await adminController.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete a user
router.delete('/users/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    await adminController.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete a post
router.delete('/posts/:id', authMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;
    await adminController.deletePost(postId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;