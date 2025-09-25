// Configuration management
require('dotenv').config();

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 6000,
    host: process.env.HOST || 'localhost',
    environment: process.env.NODE_ENV || 'development'
  },

  // API configuration
  api: {
    version: 'v1',
    basePath: '/api',
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true
    }
  },

  // Pagination defaults
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
    defaultPage: 1
  },

  // Data configuration
  data: {
    usersFile: './data/users.json',
    statsFile: './data/stats.json'
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'combined'
  }
};

module.exports = config;

