const fs = require('fs');
const path = require('path');
const usersPath = path.resolve(__dirname, '../data/users.json');

const readUsers = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(usersPath, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
};

const writeUsers = (users) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const getAllUsers = async () => {
  const users = await readUsers();
  return users;
};

const getUserById = async (id) => {
  const users = await readUsers();
  return users.find(user => user.id === id);
};

const createUser = async (newUser) => {
  const users = await readUsers();
  users.push(newUser);
  await writeUsers(users);
};

const updateUser = async (id, updatedUser) => {
  const users = await readUsers();
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    await writeUsers(users);
  }
};

const deleteUser = async (id) => {
  let users = await readUsers();
  users = users.filter(user => user.id !== id);
  await writeUsers(users);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
