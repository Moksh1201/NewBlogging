const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const adminsFilePath = path.join(__dirname, '../data/admins.json');


const readDataFromFile = () => {
  const data = fs.readFileSync(adminsFilePath);
  return JSON.parse(data);
};

const writeDataToFile = (data) => {
  fs.writeFileSync(adminsFilePath, JSON.stringify(data, null, 2));
};

const getAdmins = (req, res) => {
  const admins = readDataFromFile();
  res.status(200).json(admins);
};

const addAdmin = (req, res) => {
  const { username, email } = req.body;
  const admins = readDataFromFile();

  const newAdmin = {
    id: uuidv4(),
    username,
    email,
  };

  admins.push(newAdmin);
  writeDataToFile(admins);

  res.status(201).json({ message: 'Admin added successfully', admin: newAdmin });
};

const removeAdmin = (req, res) => {
  const { id } = req.params;
  const admins = readDataFromFile();

  const newAdmins = admins.filter(a => a.id !== id);

  if (admins.length === newAdmins.length) {
    return res.status(404).json({ message: 'Admin not found' });
  }

  writeDataToFile(newAdmins);
  res.status(200).json({ message: 'Admin removed successfully' });
};

module.exports = {
  getAdmins,
  addAdmin,
  removeAdmin,
};
