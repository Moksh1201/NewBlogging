const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtils');
const usersDataPath = './data/users.json';

const register = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const users = JSON.parse(await fs.readFile(usersDataPath, 'utf-8'));

    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = { id: users.length + 1, username, password: hashedPassword, role: role || 'user' };
    users.push(newUser);

    await fs.writeFile(usersDataPath, JSON.stringify(users));
    res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const users = JSON.parse(await fs.readFile(usersDataPath, 'utf-8'));
    const user = users.find(user => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ message: 'Logged in successfully', token });
};

const logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout };
