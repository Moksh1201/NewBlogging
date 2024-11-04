const { verifyToken } = require('../utils/jwtUtils');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(403).json({ message: 'Invalid or expired token' });

    req.user = decoded;  
    next();
};

module.exports = authMiddleware;
