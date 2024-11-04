const { readFile } = require('../utils/fileUtils');
const usersDataPath = './data/users.json';

const adminMiddleware = async (req, res, next) => {
    const users = await readFile(usersDataPath);
    const user = users.find(u => u.id === req.user.id);

    if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
    }

    next();
};

module.exports = adminMiddleware;
