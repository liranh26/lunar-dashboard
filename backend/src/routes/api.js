// Route definitions

const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const userController = new UserController();

// Health check route
router.get('/health', userController.healthCheck);

// Users routes
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.patch('/users/:id', userController.updateUser);

// Stats routes
router.get('/stats', userController.getStats);

// Dashboard routes
router.get('/dashboard', userController.getDashboardData);

// Cache management routes (for testing and management)
router.post('/cache/clear', userController.clearCache);

module.exports = router;

