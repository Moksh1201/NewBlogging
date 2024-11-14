// const fs = require('fs');
// const path = require('path');

// // Define the base directory for storage
// const BASE_DIR = path.join(__dirname, '../data');

// // Ensure the base directory exists
// if (!fs.existsSync(BASE_DIR)) {
//   fs.mkdirSync(BASE_DIR);
// }

// // Utility get the file path for a specific collection and ID
// const getFilePath = (collectionName, id) => {
//   return path.join(BASE_DIR, `${collectionName}-${id}.json`);
// };

// // read data from a file
// const readFromFile = (collectionName, id) => {
//   const filePath = getFilePath(collectionName, id);
//   if (fs.existsSync(filePath)) {
//     const data = fs.readFileSync(filePath, 'utf-8');
//     return JSON.parse(data);
//   }
//   return null;
// };

// // write data to a file
// const writeToFile = (collectionName, id, data) => {
//   const filePath = getFilePath(collectionName, id);
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// };

// // delete a file
// const deleteFile = (collectionName, id) => {
//   const filePath = getFilePath(collectionName, id);
//   if (fs.existsSync(filePath)) {
//     fs.unlinkSync(filePath);
//   }
// };

// // list all files in a directory
// const listFiles = (collectionName) => {
//   const dirPath = path.join(BASE_DIR);
//   return fs.readdirSync(dirPath).filter(file => file.startsWith(collectionName));
// };

// module.exports = {
//   readFromFile,
//   writeToFile,
//   deleteFile,
//   listFiles
// };
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '../data');

if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR);
}

// get the file path for a specific collection and ID
const getFilePath = (collectionName, id) => {
  return path.join(BASE_DIR, `${collectionName}-${id}.json`);
};

/ read data from a file
const readFromFile = (collectionName, id) => {
  const filePath = getFilePath(collectionName, id);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return null;
};

const writeToFile = (collectionName, id, data) => {
  const filePath = getFilePath(collectionName, id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const deleteFile = (collectionName, id) => {
  const filePath = getFilePath(collectionName, id);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const listFiles = (collectionName) => {
  const dirPath = path.join(BASE_DIR);
  return fs.readdirSync(dirPath).filter(file => file.startsWith(collectionName));
};

const readUsers = () => {
  const files = listFiles('user');  
  const users = [];

  files.forEach(file => {
    const filePath = path.join(BASE_DIR, file);
    const data = fs.readFileSync(filePath, 'utf-8');
    const user = JSON.parse(data);
    users.push(user);
  });

  return users;
};

module.exports = {
  readFromFile,
  writeToFile,
  deleteFile,
  listFiles,
  readUsers,  
};
