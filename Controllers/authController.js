const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY || 'vG7yL*4s&uVxwRmd@M!z9^Tj0Q$e6H5'; // Secret for JWT token
const adminSecretKey = process.env.ADMIN_SECRET_KEY || 'your_admin_secret_key'; // Secret for Admin registration

const usersFilePath = path.join(__dirname, '../data/users.json');
const adminFilePath = path.join(__dirname, '../data/admin.json');

const readDataFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeDataToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};

const registerUser = async (userData) => {
  try {
    console.log('Registering user:', userData);
    const { username, email, password, isAdmin = false, isPrivate = false } = userData; // Added isPrivate to destructure
    const filePath = isAdmin ? adminFilePath : usersFilePath;
    const users = readDataFromFile(filePath);

    // Check if the email or username already exists
    const existingUserByEmail = users.find(user => user.email === email);
    if (existingUserByEmail) {
      throw new Error('Email already exists');
    }

    const existingUserByUsername = users.find(user => user.username === username);
    if (existingUserByUsername) {
      throw new Error('Username already exists');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user object with isPrivate field
    const newUser = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      isAdmin,
      isPrivate, // Store privacy preference
      followers: [],   
      following: []    
    };

    // Add the new user to the users list
    users.push(newUser);
    writeDataToFile(filePath, users);

    return { message: 'User registered successfully', user: newUser };
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('User registration failed');
  }
};


const loginUser = async (email, password) => {
  let users = readDataFromFile(usersFilePath);
  let user = users.find(u => u.email === email);

  if (!user) {
    users = readDataFromFile(adminFilePath);
    user = users.find(u => u.email === email);
  }

  if (!user) {
    throw new Error('Invalid credentials or email');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin, isPrivate: user.isPrivate }, secretKey, { expiresIn: '1h' });

  return { user, token };
};

const checkPrivateAccount = (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  const users = readDataFromFile(usersFilePath);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.isPrivate && userId !== id && !req.user.isAdmin) {
    return res.status(403).json({ message: 'This account is private' });
  }

  next();
};

module.exports = {
  registerUser,
  loginUser,
  checkPrivateAccount,
};
