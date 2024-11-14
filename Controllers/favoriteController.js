const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const favoritesFilePath = path.join(__dirname, '../data/favorites.json');

// Helper function to read data from JSON file
const readDataFromFile = () => {
  const data = fs.readFileSync(favoritesFilePath);
  return JSON.parse(data);
};

// Helper function to write data to JSON file
const writeDataToFile = (data) => {
  fs.writeFileSync(favoritesFilePath, JSON.stringify(data, null, 2));
};

// Add a post to favorites
const addFavorite = (req, res) => {
  const { userId, postId } = req.body;
  const favorites = readDataFromFile();

  const newFavorite = {
    id: uuidv4(),
    userId,
    postId,
  };

  favorites.push(newFavorite);
  writeDataToFile(favorites);

  res.status(201).json({ message: 'Post added to favorites successfully', favorite: newFavorite });
};

// Get all favorites of a user
const getFavorites = (req, res) => {
  const { userId } = req.params;
  const favorites = readDataFromFile();

  const userFavorites = favorites.filter(f => f.userId === userId);
  res.status(200).json(userFavorites);
};

// Remove a post from favorites
const removeFavorite = (req, res) => {
  const { id } = req.params;
  const favorites = readDataFromFile();

  const newFavorites = favorites.filter(f => f.id !== id);

  if (favorites.length === newFavorites.length) {
    return res.status(404).json({ message: 'Favorite not found' });
  }

  writeDataToFile(newFavorites);
  res.status(200).json({ message: 'Post removed from favorites successfully' });
};

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};
