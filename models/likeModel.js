const fs = require('fs');
const path = require('path');

const LIKED_POSTS_FILE = path.join(__dirname, '..', 'data', 'likedPosts.json');

const readLikedPosts = () => {
  if (!fs.existsSync(LIKED_POSTS_FILE)) {
    fs.writeFileSync(LIKED_POSTS_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(LIKED_POSTS_FILE);
  return JSON.parse(data);
};

const writeLikedPosts = (likedPosts) => {
  fs.writeFileSync(LIKED_POSTS_FILE, JSON.stringify(likedPosts, null, 2));
};

const addLikedPost = (userId, postId) => {
  const likedPosts = readLikedPosts();
  const existingLike = likedPosts.find(like => like.userId === userId && like.postId === postId);
  
  if (existingLike) {
    throw new Error('Post already liked by user');
  }

  likedPosts.push({ userId, postId });
  writeLikedPosts(likedPosts);
};

const removeLikedPost = (userId, postId) => {
  let likedPosts = readLikedPosts();
  likedPosts = likedPosts.filter(like => !(like.userId === userId && like.postId === postId));
  writeLikedPosts(likedPosts);
};

const getLikedPostsByUser = (userId) => {
  const likedPosts = readLikedPosts();
  return likedPosts.filter(like => like.userId === userId);
};

const isPostLikedByUser = (userId, postId) => {
  const likedPosts = readLikedPosts();
  return likedPosts.some(like => like.userId === userId && like.postId === postId);
};

module.exports = {
  addLikedPost,
  removeLikedPost,
  getLikedPostsByUser,
  isPostLikedByUser,
};
