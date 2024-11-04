const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
