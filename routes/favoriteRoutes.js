const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to add a post to a user's favorites
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { userId, postId } = req.body;
    await favoriteController.addFavoritePost(userId, postId);
    res.status(201).json({ message: 'Post added to favorites' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to remove a post from a user's favorites
router.delete('/', authMiddleware, async (req, res) => {
  try {
    const { userId, postId } = req.body;
    await favoriteController.removeFavoritePost(userId, postId);
    res.status(200).json({ message: 'Post removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
