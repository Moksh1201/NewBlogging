const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const commentsFilePath = path.join(__dirname, '../data/comments.json');

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

// comment to a post
const addComment = (postId, userId, comment) => {
  const comments = readDataFromFile(commentsFilePath);
  const newComment = {
    id: uuidv4(),
    postId,
    userId,
    comment,
    created: new Date(),
  };

  comments.push(newComment);
  writeDataToFile(commentsFilePath, comments);

  return newComment;
};

// specific post
const getComments = (postId) => {
  const comments = readDataFromFile(commentsFilePath);
  return comments.filter(c => c.postId === postId);
};

module.exports = {
  addComment,
  getComments,
};
