// fileHelpers.js
const fs = require('fs').promises;

async function readJSONFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Failed to read file: ${filePath}`);
  }
}

async function writeJSONFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    throw new Error(`Failed to write file: ${filePath}`);
  }
}

module.exports = {
  readJSONFile,
  writeJSONFile,
};
