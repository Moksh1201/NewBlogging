const { readFile, writeFile } = require('../utils/fileUtils');
const postsDataPath = './data/posts.json';

const deletePost = async (req, res) => {
    const postId = parseInt(req.params.id);

    let posts = await readFile(postsDataPath);
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });

    posts.splice(postIndex, 1);
    await writeFile(postsDataPath, posts);

    res.json({ message: 'Post deleted successfully' });
};

module.exports = { deletePost };