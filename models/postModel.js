const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const postsFilePath = path.join(__dirname, '../data/posts.json');

// read data from JSON file
const readDataFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// write data to JSON file
const writeDataToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};

// Get all posts
const getPosts = () => {
  return readDataFromFile(postsFilePath);
};

// Get a specific post
const getPost = (id) => {
  const posts = readDataFromFile(postsFilePath);
  return posts.find(p => p.id === id);
};

// Update a post
const updatePost = (id, content, image, title, tags) => {
  const posts = readDataFromFile(postsFilePath);
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return null;
  }

  posts[postIndex].content = content;
  if (image !== undefined) {  
    posts[postIndex].image = image || null;  
  }
  if (title !== undefined) {
    posts[postIndex].title = title;
  }
  if (tags !== undefined) {
    posts[postIndex].tags = tags;
  }

  writeDataToFile(postsFilePath, posts);

  return posts[postIndex];
};

// Delete a post
const deletePost = (id) => {
  const posts = readDataFromFile(postsFilePath);
  const newPosts = posts.filter(p => p.id !== id);

  if (posts.length === newPosts.length) {
    return false;
  }

  writeDataToFile(postsFilePath, newPosts);
  return true;
};

module.exports = {
  
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
