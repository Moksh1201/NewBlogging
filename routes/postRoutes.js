const express = require('express');
const { createPost, likePost, unlikePost, addComment, deleteComment, getComments } = require('../Controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.post('/:id/like', authMiddleware, likePost);
router.post('/:id/unlike', authMiddleware, unlikePost);
router.post('/:id/comment', authMiddleware, addComment);
router.delete('/comment/:commentId', authMiddleware, adminMiddleware, deleteComment);
router.get('/:id/comments', getComments);

module.exports = router;
