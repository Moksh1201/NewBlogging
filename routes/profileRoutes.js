const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const privacyMiddleware = require('../middleware/privacyMiddleware');

const router = express.Router();

// Route to get all users (Admins only)
router.get('/allusers', authMiddleware, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    const users = await profileController.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a user profile by ID with privacy check
router.get('/:id', authMiddleware, privacyMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const profile = await profileController.getProfile(userId); 
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to follow a user (checks if the profile is private)
router.post('/:id/follow', authMiddleware,privacyMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const followId = req.params.id;

    // Fetch the target user's profile
    const targetUser = await profileController.getProfile(followId);

    // Check if the target user exists and is public
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const result = await profileController.followUser(userId, followId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to unfollow a user
router.post('/:id/unfollow', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const unfollowId = req.params.id;

    const result = await profileController.unfollowUser(userId, unfollowId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


router.post('/:id/privacy', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const { isPrivate } = req.body;

    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'You can only change your own privacy settings' });
    }

    const result = await profileController.togglePrivacy(userId, isPrivate);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
