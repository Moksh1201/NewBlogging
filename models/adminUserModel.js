const fs = require('fs');
const path = require('path');
const adminUsersPath = path.resolve(__dirname, '../data/adminUsers.json');

const readAdminUsers = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(adminUsersPath, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
};

const writeAdminUsers = (adminUsers) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(adminUsersPath, JSON.stringify(adminUsers, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const getAllAdminUsers = async () => {
  const adminUsers = await readAdminUsers();
  return adminUsers;
};

const getAdminUserById = async (id) => {
  const adminUsers = await readAdminUsers();
  return adminUsers.find(user => user.id === id);
};

const createAdminUser = async (newAdminUser) => {
  const adminUsers = await readAdminUsers();
  adminUsers.push(newAdminUser);
  await writeAdminUsers(adminUsers);
};

const updateAdminUser = async (id, updatedAdminUser) => {
  const adminUsers = await readAdminUsers();
  const index = adminUsers.findIndex(user => user.id === id);
  if (index !== -1) {
    adminUsers[index] = { ...adminUsers[index], ...updatedAdminUser };
    await writeAdminUsers(adminUsers);
  }
};

const deleteAdminUser = async (id) => {
  let adminUsers = await readAdminUsers();
  adminUsers = adminUsers.filter(user => user.id !== id);
  await writeAdminUsers(adminUsers);
};

module.exports = {
  getAllAdminUsers,
  getAdminUserById,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
};
