const express = require('express');
const { registerUser, fetchUsers } = require('../Controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser); 
router.get('/users', authMiddleware, fetchUsers); 

module.exports = router;
