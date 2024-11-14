const bcrypt = require('bcrypt');
const saltRounds = 10;

// Function to hash a password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

// Function to compare a password with a hash
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
