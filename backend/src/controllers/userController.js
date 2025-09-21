// Controllers for handling HTTP requests

const UserService = require('../services/userService');
const { asyncHandler } = require('../middleware/errorHandler');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  /**
   * Get all users with filtering, sorting, and pagination
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getUsers = asyncHandler(async (req, res) => {
    const result = await this.userService.getUsers(req.query);
    res.json(result);
  });

  /**
   * Get user by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await this.userService.getUserById(id);
    res.json(result);
  });

  /**
   * Update user data
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    
    const result = await this.userService.updateUser(id, updateData);
    res.json(result);
  });

  /**
   * Get statistics
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getStats = asyncHandler(async (req, res) => {
    const result = await this.userService.getStats();
    res.json(result);
  });

  /**
   * Get dashboard data
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getDashboardData = asyncHandler(async (req, res) => {
    const result = await this.userService.getDashboardData();
    res.json(result);
  });

  /**
   * Health check endpoint
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  healthCheck = asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Lunar Dashboard API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  });
}

module.exports = UserController;

