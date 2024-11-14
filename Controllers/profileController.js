// const fs = require('fs');
// const path = require('path');
// const usersFilePath = path.resolve(__dirname, '../data/users.json');

// const readUsers = () => {
//   const data = fs.readFileSync(usersFilePath, 'utf8');
//   return JSON.parse(data);
// };

// const writeUsers = (users) => {
//   fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
// };

// const getAllUsers = () => readUsers();

// const getProfile = (userId) => {
//   const users = readUsers();
//   return users.find(user => user.id === parseInt(userId));
// };

// const updateProfile = (userId, updatedProfile) => {
//   const users = readUsers();
//   const userIndex = users.findIndex(user => user.id === parseInt(userId));
//   if (userIndex === -1) throw new Error('User not found');

//   if (updatedProfile.hasOwnProperty('isPrivate')) {
//     users[userIndex].isPrivate = updatedProfile.isPrivate;
//   }

//   users[userIndex] = { ...users[userIndex], ...updatedProfile };
//   writeUsers(users);

//   return users[userIndex];
// };

// const followUser = (userId, followId) => {
//   const users = readUsers();

//   userId = userId.toString();  
//   followId = followId.toString();  

//   const user = users.find(u => u.id === userId); 
//   const followUser = users.find(u => u.id === followId);  

//   if (!user) {
//     console.log(`User not found: ${userId}`);
//     throw new Error('User not found');
//   }

//   if (!followUser) {
//     console.log(`Follow user not found: ${followId}`);
//     throw new Error('User to follow not found');
//   }

//   if (user.following && user.following.includes(followId)) {
//     console.log(`User ${userId} is already following ${followId}`);
//     throw new Error('Already following this user');
//   }

//   if (!user.following) user.following = [];  
//   user.following.push(followId);


//   if (!followUser.followers) followUser.followers = [];  
//   followUser.followers.push(userId);

//   writeUsers(users);

//   console.log(`User ${userId} successfully followed ${followId}`);
//   return { message: 'User followed successfully' };
// };


// // Unfollow a user
// const unfollowUser = (userId, unfollowId) => {
//   const users = readUsers();

//   userId = userId.toString();  
//   unfollowId = unfollowId.toString();  

//   const user = users.find(u => u.id === userId);  
//   const unfollowUser = users.find(u => u.id === unfollowId);  

//   if (!user) {
//     console.log(`User not found: ${userId}`);
//     throw new Error('User not found');
//   }

//   if (!unfollowUser) {
//     console.log(`Unfollow user not found: ${unfollowId}`);
//     throw new Error('User to unfollow not found');
//   }

//   const followIndex = user.following.indexOf(unfollowId);
//   const followerIndex = unfollowUser.followers.indexOf(userId);

//   if (followIndex === -1) {
//     console.log(`User ${userId} is not following ${unfollowId}`);
//     throw new Error('Not following the user');
//   }

//   if (followIndex > -1) user.following.splice(followIndex, 1);

//   if (followerIndex > -1) unfollowUser.followers.splice(followerIndex, 1);

//   writeUsers(users);

//   console.log(`User ${userId} successfully unfollowed ${unfollowId}`);
//   return { message: 'User unfollowed successfully' };
// };

// const togglePrivacy = async (userId, isPrivate) => {
//   try {
//     const users = readUsers(); // Assume this reads users from a file
//     const user = users.find(u => u.id === userId);

//     if (!user) {
//       throw new Error('User not found');
//     }

//     user.isPrivate = isPrivate; // Update the privacy status
//     writeDataToFile(usersFilePath, users); // Save updated users list

//     return { message: `Privacy status updated to ${isPrivate ? 'private' : 'public'}` };
//   } catch (error) {
//     console.error('Error toggling privacy:', error);
//     throw new Error('Failed to toggle privacy');
//   }
// };

// module.exports = {
//   getAllUsers,
//   getProfile,
//   updateProfile,
//   followUser,
//   unfollowUser,
//   togglePrivacy, 
// };
const fs = require('fs');
const path = require('path');
const usersFilePath = path.resolve(__dirname, '../data/users.json');

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to users file:', error);
  }
};

const getAllUsers = () => readUsers();

const getProfile = (userId) => {
  const users = readUsers();
  return users.find(user => user.id === userId); // Compare as string
};

const updateProfile = (userId, updatedProfile) => {
  const users = readUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) throw new Error('User not found');

  users[userIndex] = { ...users[userIndex], ...updatedProfile };
  writeUsers(users);

  return users[userIndex];
};

const followUser = (userId, followId) => {
  const users = readUsers();
  const user = users.find(u => u.id === userId);
  const followUser = users.find(u => u.id === followId);

  if (!user) throw new Error('User not found');
  if (!followUser) throw new Error('User to follow not found');
  if (user.following?.includes(followId)) throw new Error('Already following this user');

  user.following = user.following || [];
  followUser.followers = followUser.followers || [];

  user.following.push(followId);
  followUser.followers.push(userId);

  writeUsers(users);
  return { message: 'User followed successfully' };
};

// Unfollow user
const unfollowUser = (userId, unfollowId) => {
  const users = readUsers();
  const user = users.find(u => u.id === userId);
  const unfollowUser = users.find(u => u.id === unfollowId);

  if (!user) throw new Error('User not found');
  if (!unfollowUser) throw new Error('User to unfollow not found');
  if (!user.following?.includes(unfollowId)) throw new Error('Not following this user');

  user.following = user.following.filter(id => id !== unfollowId);
  unfollowUser.followers = unfollowUser.followers.filter(id => id !== userId);

  writeUsers(users);
  return { message: 'User unfollowed successfully' };
};

const togglePrivacy = (userId, isPrivate) => {
  const users = readUsers();
  const user = users.find(u => u.id === userId);

  if (!user) throw new Error('User not found');

  user.isPrivate = isPrivate;
  writeUsers(users);
  return { message: `Privacy updated to ${isPrivate ? 'private' : 'public'}` };
};

module.exports = {
  getAllUsers,
  getProfile,
  updateProfile,
  followUser,
  unfollowUser,
  togglePrivacy,
};
