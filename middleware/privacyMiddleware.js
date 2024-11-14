const fs = require('fs');
const path = require('path');

// Path to the users.json file
const usersFilePath = path.join(__dirname, '../data/users.json');

// Utility function to read users from users.json
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users data:', error);
    return [];
  }
};

const checkPrivacy = async (req, res, next) => {
  const viewerId = req.user.id;
  const targetUserId = req.params.id;  // Keep as a string for UUID compatibility
  
  const users = readUsers();
  const targetUser = users.find(user => user.id === targetUserId);

  if (!targetUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check privacy conditions
  if (
    !targetUser.isPrivate || // Profile is public
    targetUser.followers.includes(viewerId) || // Viewer is a follower
    req.user.isAdmin // Viewer is an admin
  ) {
    return next(); // Proceed if any condition passes
  }

  return res.status(403).json({ message: 'Access denied: Profile is private' });
};

module.exports = checkPrivacy;
