const fs = require('fs').promises;

const readFile = async (path) => {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
};

const writeFile = async (path, data) => {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
};

module.exports = { readFile, writeFile };