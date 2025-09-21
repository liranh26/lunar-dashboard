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
    // Cache for data - simulates Redis/memory cache
    this.cache = {
      users: null,
      stats: null,
      usersTimestamp: null,
      statsTimestamp: null
    };
    
    // Cache TTL (Time To Live) - 5 minutes
    this.cacheTTL = 5 * 60 * 1000; // 5 minutes in milliseconds
  }

  /**
   * Load users data from JSON files with caching
   * @returns {Array} Users array
   */
  async loadUsers() {
    try {
      // Check cache first
      if (this.cache.users && this.cache.usersTimestamp) {
        const now = Date.now();
        if (now - this.cache.usersTimestamp < this.cacheTTL) {
          console.log('📊 Using cached users data');
          return this.cache.users;
        }
      }

      // Load from file (simulates database query)
      console.log('📊 Loading users from data source...');
      const usersPath = '/app/data/users.json';
      const usersData = await fs.readFile(usersPath, 'utf8');
      const users = JSON.parse(usersData);
      
      // Update cache
      this.cache.users = users;
      this.cache.usersTimestamp = Date.now();
      
      console.log('📊 Loaded users:', users.length);
      return users;
    } catch (error) {
      console.error('Error loading users:', error);
      throw new Error('Failed to load users data');
    }
  }

  /**
   * Load stats data from JSON files with caching
   * @returns {Object} Stats object
   */
  async loadStats() {
    try {
      // Check cache first
      if (this.cache.stats && this.cache.statsTimestamp) {
        const now = Date.now();
        if (now - this.cache.statsTimestamp < this.cacheTTL) {
          console.log('📈 Using cached stats data');
          return this.cache.stats;
        }
      }

      // Load from file (simulates database query)
      console.log('📈 Loading stats from data source...');
      const statsPath = '/app/data/stats.json';
      const statsData = await fs.readFile(statsPath, 'utf8');
      const stats = JSON.parse(statsData);
      
      // Update cache
      this.cache.stats = stats;
      this.cache.statsTimestamp = Date.now();
      
      console.log('📈 Loaded stats:', Object.keys(stats));
      return stats;
    } catch (error) {
      console.error('Error loading stats:', error);
      throw new Error('Failed to load stats data');
    }
  }

  /**
   * Clear cache (useful for testing or manual cache invalidation)
   */
  clearCache() {
    this.cache = {
      users: null,
      stats: null,
      usersTimestamp: null,
      statsTimestamp: null
    };
    console.log('🗑️ Cache cleared');
  }

  /**
   * Get users with filtering, sorting, and pagination
   * @param {Object} query - Query parameters
   * @returns {Object} Users response with pagination
   */
  async getUsers(query) {
    try {
      // Load users data on-demand (simulates database query)
      const users = await this.loadUsers();
      const filters = parseQueryParams(query);
      
      // Apply filters
      let filteredUsers = filterUsers([...users], filters);
      
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
      // Load users data on-demand (simulates database query)
      const users = await this.loadUsers();
      const user = users.find(u => u.id === parseInt(id));
      
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
      // Load users data on-demand (simulates database query)
      const users = await this.loadUsers();
      const userIndex = users.findIndex(u => u.id === parseInt(id));
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      // Validate update data
      const validation = validateUserUpdate(updateData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }
      
      // Update user in the loaded data
      users[userIndex] = { ...users[userIndex], ...validation.data };
      
      // Update cache with modified data (simulates database update)
      this.cache.users = users;
      this.cache.usersTimestamp = Date.now();
      
      console.log(`✅ User ${id} updated successfully`);
      return createApiResponse(users[userIndex]);
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
      // Load stats data on-demand (simulates database query)
      const stats = await this.loadStats();
      return createApiResponse(stats);
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
      // Load both users and stats data on-demand (simulates database queries)
      const [users, stats] = await Promise.all([
        this.loadUsers(),
        this.loadStats()
      ]);
      
      const dashboardData = {
        stats: stats,
        recentUsers: users.slice(0, 5), // Last 5 users
        totalUsers: users.length,
        connectedUsers: users.filter(u => u.status === 'Connected').length
      };
      
      return createApiResponse(dashboardData);
    } catch (error) {
      console.error('Error in getDashboardData:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  }
}

module.exports = UserService;

