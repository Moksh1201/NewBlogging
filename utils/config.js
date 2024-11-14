require('dotenv').config();

const config = {
  PORT: process.env.PORT || 5000,
  DB_PATH: process.env.DB_PATH || './data',
  LOG_PATH: process.env.LOG_PATH || './logs',
};

module.exports = config;
