const jwt = require('jsonwebtoken');
const SECRET_KEY = 'fi3!m349Yb@#b76B9%$B7hbb77@WU*@';

const createToken = (user) => {
    const payload = { id: user.id, isAdmin: user.isAdmin };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = { createToken, verifyToken };
