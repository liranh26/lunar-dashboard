// Unit tests for UserService
const UserService = require('../../src/services/userService');
const { mockUsers, mockStats } = require('../fixtures/mockData');
const { createMockFileSystem, waitFor } = require('../helpers/testUtils');

describe('UserService', () => {
  let userService;
  let restoreFileSystem;

  beforeEach(() => {
    userService = new UserService();
    
    // Mock file system
    restoreFileSystem = createMockFileSystem({
      'users.json': mockUsers,
      'stats.json': mockStats
    });
  });

  afterEach(() => {
    restoreFileSystem();
    jest.clearAllMocks();
  });

  describe('loadUsers', () => {
    it('should load users from file system', async () => {
      const users = await userService.loadUsers();
      
      expect(users).toEqual(mockUsers);
      expect(users).toHaveLength(3);
    });

    it('should reload data after cache expiration', async () => {
      // Load initial data
      await userService.loadUsers();
      
      // Expire cache by setting timestamp to past
      userService.cache.usersTimestamp = Date.now() - (6 * 60 * 1000); // 6 minutes ago
      
      // Should reload from file system
      const users = await userService.loadUsers();
      
      expect(users).toEqual(mockUsers);
    });
  });

  describe('loadStats', () => {
    it('should load stats from file system', async () => {
      const stats = await userService.loadStats();
      
      expect(stats).toEqual(mockStats);
      expect(stats.connectedTools).toBe(15);
    });

    it('should use cached stats on subsequent calls', async () => {
      await userService.loadStats();
      const stats = await userService.loadStats();
      
      expect(stats).toEqual(mockStats);
    });
  });

  describe('getUsers', () => {
    it('should return users with pagination', async () => {
      const result = await userService.getUsers({});
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUsers);
      expect(result.pagination).toBeDefined();
      expect(result.pagination.total).toBe(3);
    });

    it('should filter users by status', async () => {
      const result = await userService.getUsers({ status: 'Connected' });
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data.every(user => user.status === 'Connected')).toBe(true);
    });

    it('should filter users by role', async () => {
      const result = await userService.getUsers({ role: 'Admin' });
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].role).toBe('Admin');
    });

    it('should search users by name', async () => {
      const result = await userService.getUsers({ search: 'John' });
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toContain('John');
    });

    it('should handle pagination', async () => {
      const result = await userService.getUsers({ page: 1, pageSize: 2 });
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.pagination.page).toBe(1);
      expect(result.pagination.pageSize).toBe(2);
      expect(result.pagination.total).toBe(3);
    });
  });

  describe('getUserById', () => {
    it('should return user by ID', async () => {
      const result = await userService.getUserById(1);
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUsers[0]);
    });

    it('should throw error for non-existent user', async () => {
      await expect(userService.getUserById(999)).rejects.toThrow('User not found');
    });
  });

  describe('updateUser', () => {
    it('should update user status', async () => {
      const updateData = { status: 'Offline' };
      const result = await userService.updateUser(1, updateData);
      
      expect(result.success).toBe(true);
      expect(result.data.status).toBe('Offline');
    });

    it('should update user role', async () => {
      const updateData = { role: 'Power User' };
      const result = await userService.updateUser(1, updateData);
      
      expect(result.success).toBe(true);
      expect(result.data.role).toBe('Power User');
    });

    it('should throw error for invalid update data', async () => {
      const updateData = { invalidField: 'value' };
      
      await expect(userService.updateUser(1, updateData)).rejects.toThrow('Validation failed');
    });

    it('should throw error for non-existent user', async () => {
      const updateData = { status: 'Offline' };
      
      await expect(userService.updateUser(999, updateData)).rejects.toThrow('User not found');
    });
  });

  describe('getStats', () => {
    it('should return statistics', async () => {
      const result = await userService.getStats();
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockStats);
    });
  });

  describe('getDashboardData', () => {
    it('should return dashboard data', async () => {
      const result = await userService.getDashboardData();
      
      expect(result.success).toBe(true);
      expect(result.data.stats).toEqual(mockStats);
      expect(result.data.totalUsers).toBe(3);
      expect(result.data.connectedUsers).toBe(2);
      expect(result.data.recentUsers).toHaveLength(3);
    });
  });

  describe('clearCache', () => {
    it('should clear all cached data', () => {
      userService.cache.users = mockUsers;
      userService.cache.stats = mockStats;
      
      userService.clearCache();
      
      expect(userService.cache.users).toBeNull();
      expect(userService.cache.stats).toBeNull();
      expect(userService.cache.usersTimestamp).toBeNull();
      expect(userService.cache.statsTimestamp).toBeNull();
    });
  });
});
