// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config(); 

// const secretKey = process.env.SECRET_KEY; 
// const generateToken = (user) => {
//   return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
// };

// const verifyToken = (token) => {
//   try {
//     return jwt.verify(token, secretKey);
//   } catch (err) {
//     console.error('Token verification failed:', err.message);
//     return null;
//   }
// };

// module.exports = {
//   generateToken,
//   verifyToken,
// };
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); 

const secretKey = process.env.SECRET_KEY; 

// Updated generateToken function to include isPrivate in the JWT payload
const generateToken = (user) => {
  return jwt.sign({ 
    id: user.id, 
    username: user.username, 
    isPrivate: user.isPrivate,  // Add isPrivate field to the token payload
  }, secretKey, { expiresIn: '1h' });
};

// Updated verifyToken function to decode and return the token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
