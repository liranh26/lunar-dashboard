// Main application setup

const express = require('express');
const cors = require('cors');
const config = require('./config');
const apiRoutes = require('./routes/api');
const { errorHandler, notFoundHandler, requestLogger } = require('./middleware/errorHandler');

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  /**
   * Setup middleware
   */
  setupMiddleware() {
    // CORS configuration
    this.app.use(cors(config.api.cors));
    
    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    
    // Request logging
    if (config.server.environment === 'development') {
      this.app.use(requestLogger);
    }
  }

  /**
   * Setup routes
   */
  setupRoutes() {
    // API routes
    this.app.use(config.api.basePath, apiRoutes);
    
    // Root route
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Lunar Dashboard API',
        version: '1.0.0',
        endpoints: {
          health: `${config.api.basePath}/health`,
          users: `${config.api.basePath}/users`,
          stats: `${config.api.basePath}/stats`,
          dashboard: `${config.api.basePath}/dashboard`
        }
      });
    });
  }

  /**
   * Setup error handling
   */
  setupErrorHandling() {
    // 404 handler
    this.app.use(notFoundHandler);
    
    // Global error handler
    this.app.use(errorHandler);
  }

  /**
   * Start the server
   */
  start() {
    const server = this.app.listen(config.server.port, config.server.host, () => {
      console.log('🚀 Lunar Dashboard API server running on port', config.server.port);
      console.log('📊 Health check:', `http://${config.server.host}:${config.server.port}${config.api.basePath}/health`);
      console.log('👥 Users API:', `http://${config.server.host}:${config.server.port}${config.api.basePath}/users`);
      console.log('📈 Stats API:', `http://${config.server.host}:${config.server.port}${config.api.basePath}/stats`);
      console.log('🏠 Dashboard API:', `http://${config.server.host}:${config.server.port}${config.api.basePath}/dashboard`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
      });
    });

    return server;
  }
}

module.exports = App;

