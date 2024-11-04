const { readFile, writeFile } = require('../utils/fileUtils');
const postsDataPath = './data/posts.json';
const commentsDataPath = './data/comments.json';

const addComment = async (req, res) => {
    const postId = parseInt(req.params.id);
    const { text } = req.body;
    const userId = req.user.id;

    const comments = await readFile(commentsDataPath);
    const newComment = {
        id: Date.now(),
        postId,
        userId,
        text,
        createdAt: new Date().toISOString()
    };

    comments.push(newComment);
    await writeFile(commentsDataPath, comments);

    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
};

const deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId);

    let comments = await readFile(commentsDataPath);
    const commentIndex = comments.findIndex(c => c.id === commentId);

    if (commentIndex === -1) return res.status(404).json({ message: 'Comment not found' });

    comments.splice(commentIndex, 1);
    await writeFile(commentsDataPath, comments);

    res.json({ message: 'Comment deleted successfully' });
};

const getComments = async (req, res) => {
    const postId = parseInt(req.params.id);
    const comments = await readFile(commentsDataPath);
    const postComments = comments.filter(c => c.postId === postId);

    res.json({ comments: postComments });
};

module.exports = { addComment, deleteComment, getComments };
