const express = require('express');
const { deletePost } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.delete('/post/:id', authMiddleware, adminMiddleware, deletePost);

module.exports = router;