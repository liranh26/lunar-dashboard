// Service layer for business logic

const fs = require('fs').promises;
const path = require('path');
const { 
  parseQueryParams, 
  filterUsers, 
  sortUsers, 
  paginateUsers, 
  validateUserUpdate,
  createApiResponse,
  createErrorResponse 
} = require('../utils/dataUtils');

class UserService {
  constructor() {
    this.users = [];
    this.stats = {};
    this.loadData();
  }

  /**
   * Load data from JSON files
   */
  async loadData() {
    try {
      const usersPath = path.join(__dirname, '../../data/users.json');
      const statsPath = path.join(__dirname, '../../data/stats.json');
      
      const usersData = await fs.readFile(usersPath, 'utf8');
      const statsData = await fs.readFile(statsPath, 'utf8');
      
      this.users = JSON.parse(usersData);
      this.stats = JSON.parse(statsData);
      
      console.log('📊 Loaded users:', this.users.length);
      console.log('📈 Loaded stats:', Object.keys(this.stats));
    } catch (error) {
      console.error('Error loading data:', error);
      throw new Error('Failed to load data files');
    }
  }

  /**
   * Get users with filtering, sorting, and pagination
   * @param {Object} query - Query parameters
   * @returns {Object} Users response with pagination
   */
  async getUsers(query) {
    try {
      const filters = parseQueryParams(query);
      
      // Apply filters
      let filteredUsers = filterUsers([...this.users], filters);
      
      // Apply sorting
      filteredUsers = sortUsers(filteredUsers, filters.sort);
      
      // Apply pagination
      const result = paginateUsers(filteredUsers, filters.page, filters.pageSize);
      
      return createApiResponse(
        result.data,
        result.pagination,
        {
          search: filters.search,
          role: filters.role,
          status: filters.status,
          profile: filters.profile,
          createdFrom: filters.createdFrom,
          createdTo: filters.createdTo,
          sort: filters.sort
        }
      );
    } catch (error) {
      console.error('Error in getUsers:', error);
      throw new Error('Failed to fetch users');
    }
  }

  /**
   * Get user by ID
   * @param {number} id - User ID
   * @returns {Object} User object
   */
  async getUserById(id) {
    try {
      const user = this.users.find(u => u.id === parseInt(id));
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return createApiResponse(user);
    } catch (error) {
      console.error('Error in getUserById:', error);
      throw error;
    }
  }

  /**
   * Update user data
   * @param {number} id - User ID
   * @param {Object} updateData - Data to update
   * @returns {Object} Updated user
   */
  async updateUser(id, updateData) {
    try {
      const userIndex = this.users.findIndex(u => u.id === parseInt(id));
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      // Validate update data
      const validation = validateUserUpdate(updateData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }
      
      // Update user
      this.users[userIndex] = { ...this.users[userIndex], ...validation.data };
      
      return createApiResponse(this.users[userIndex]);
    } catch (error) {
      console.error('Error in updateUser:', error);
      throw error;
    }
  }

  /**
   * Get statistics
   * @returns {Object} Statistics data
   */
  async getStats() {
    try {
      return createApiResponse(this.stats);
    } catch (error) {
      console.error('Error in getStats:', error);
      throw new Error('Failed to fetch statistics');
    }
  }

  /**
   * Get dashboard data
   * @returns {Object} Dashboard data
   */
  async getDashboardData() {
    try {
      const dashboardData = {
        stats: this.stats,
        recentUsers: this.users.slice(0, 5), // Last 5 users
        totalUsers: this.users.length,
        connectedUsers: this.users.filter(u => u.status === 'Connected').length
      };
      
      return createApiResponse(dashboardData);
    } catch (error) {
      console.error('Error in getDashboardData:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  }
}

module.exports = UserService;

