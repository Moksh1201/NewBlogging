// controllers/authController.js
const { readFile, writeFile } = require('../utils/fileUtils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersDataPath = './data/users.json';

const SECRET_PASSKEY = 'encien29eineu93ncNOXWniwdi3293X'; 

const registerUser = async (req, res) => {
    const { username, password, adminPasskey } = req.body;

    try {
        const users = await readFile(usersDataPath);

        if (users.some(user => user.username === username)) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const isAdmin = adminPasskey === SECRET_PASSKEY;
        
        const newUser = {
            id: Date.now(),
            username,
            password: hashedPassword,
            isAdmin,
            following: [],
            followers: []
        };

        users.push(newUser);
        await writeFile(usersDataPath, users);

        res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username: newUser.username, isAdmin: newUser.isAdmin } });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
};

const fetchUsers = async (req, res) => {
    try {
        const users = await readFile(usersDataPath);
        res.status(200).json(users.map(user => ({ id: user.id, username: user.username, isAdmin: user.isAdmin })));
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

module.exports = { registerUser, fetchUsers };
