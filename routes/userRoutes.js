// routes/userRoutes.js
const express = require('express');
const { followUser, unfollowUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/:id/follow', authMiddleware, followUser);
router.post('/:id/unfollow', authMiddleware, unfollowUser);

module.exports = router;
