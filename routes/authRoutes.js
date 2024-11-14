const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const authenticate = require('../middleware/authMiddleware'); 
const { validateRegister, validateLogin } = require('../middleware/validation');

router.post('/register', validateRegister, async (req, res) => {
  try {
    const user = req.body;
    const newUser = await authController.registerUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/me', authenticate, async (req, res) => { 
  console.log("Fetching profile for user ID:", req.user.id); 
  try {
    const userId = req.user.id; 
    const profile = await profileController.getProfile(userId); 
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/logout', authenticate, (req, res) => { 
  req.logout(); 
  res.status(200).json({ message: 'Logout successful' });
});


router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authController.loginUser(email, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
