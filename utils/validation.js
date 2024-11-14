// Function to validate if an input is non-empty and a string
const validateString = (str) => typeof str === 'string' && str.trim().length > 0;

// Function to validate if an input is a valid MongoDB ObjectId format
const validateObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

module.exports = {
  validateString,
  validateObjectId,
};
