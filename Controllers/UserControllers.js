
// controllers/userController.js
const { readFile, writeFile } = require('../utils/fileUtils');
const usersDataPath = './data/users.json';

// Follow a user
const followUser = async (req, res) => {
    const userId = req.user.id;
    const followId = parseInt(req.params.id);

    const users = await readFile(usersDataPath);
    const user = users.find(u => u.id === userId);
    const followUser = users.find(u => u.id === followId);

    if (!followUser) return res.status(404).json({ message: 'User to follow not found' });

    if (user.following.includes(followId)) {
        return res.status(400).json({ message: 'Already following' });
    }

    user.following.push(followId);
    followUser.followers.push(userId);

    await writeFile(usersDataPath, users);
    res.json({ message: 'User followed successfully' });
};

// Unfollow a user
const unfollowUser = async (req, res) => {
    const userId = req.user.id;
    const unfollowId = parseInt(req.params.id);

    const users = await readFile(usersDataPath);
    const user = users.find(u => u.id === userId);
    const unfollowUser = users.find(u => u.id === unfollowId);

    if (!unfollowUser) return res.status(404).json({ message: 'User to unfollow not found' });

    const followIndex = user.following.indexOf(unfollowId);
    if (followIndex === -1) {
        return res.status(400).json({ message: 'Not following the user' });
    }

    user.following.splice(followIndex, 1);
    unfollowUser.followers.splice(unfollowUser.followers.indexOf(userId), 1);

    await writeFile(usersDataPath, users);
    res.json({ message: 'User unfollowed successfully' });
};

module.exports = { followUser, unfollowUser };
