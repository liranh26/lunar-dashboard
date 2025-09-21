// Unit tests for UserController
const UserController = require('../../src/controllers/userController');
const { mockUsers, mockStats } = require('../fixtures/mockData');
const { createMockRequest, createMockResponse, createMockNext } = require('../helpers/testUtils');

// Mock the UserService
jest.mock('../../src/services/userService');

describe('UserController', () => {
  let userController;
  let mockUserService;
  let req;
  let res;
  let next;

  beforeEach(() => {
    userController = new UserController();
    mockUserService = userController.userService;
    
    req = createMockRequest();
    res = createMockResponse();
    next = createMockNext();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return users successfully', async () => {
      const mockResult = {
        success: true,
        data: mockUsers,
        pagination: { total: 3, page: 1, pageSize: 20 }
      };
      
      mockUserService.getUsers.mockResolvedValue(mockResult);
      
      await userController.getUsers(req, res, next);
      
      expect(mockUserService.getUsers).toHaveBeenCalledWith(req.query);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      mockUserService.getUsers.mockRejectedValue(error);
      
      await userController.getUsers(req, res, next);
      
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getUserById', () => {
    it('should return user by ID', async () => {
      req.params.id = '1';
      const mockResult = {
        success: true,
        data: mockUsers[0]
      };
      
      mockUserService.getUserById.mockResolvedValue(mockResult);
      
      await userController.getUserById(req, res, next);
      
      expect(mockUserService.getUserById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should handle user not found', async () => {
      req.params.id = '999';
      const error = new Error('User not found');
      mockUserService.getUserById.mockRejectedValue(error);
      
      await userController.getUserById(req, res, next);
      
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      req.params.id = '1';
      req.body = { status: 'Offline' };
      const mockResult = {
        success: true,
        data: { ...mockUsers[0], status: 'Offline' }
      };
      
      mockUserService.updateUser.mockResolvedValue(mockResult);
      
      await userController.updateUser(req, res, next);
      
      expect(mockUserService.updateUser).toHaveBeenCalledWith('1', req.body);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should handle validation errors', async () => {
      req.params.id = '1';
      req.body = { invalidField: 'value' };
      const error = new Error('Validation failed');
      mockUserService.updateUser.mockRejectedValue(error);
      
      await userController.updateUser(req, res, next);
      
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getStats', () => {
    it('should return statistics', async () => {
      const mockResult = {
        success: true,
        data: mockStats
      };
      
      mockUserService.getStats.mockResolvedValue(mockResult);
      
      await userController.getStats(req, res, next);
      
      expect(mockUserService.getStats).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });
  });

  describe('getDashboardData', () => {
    it('should return dashboard data', async () => {
      const mockResult = {
        success: true,
        data: {
          stats: mockStats,
          totalUsers: 3,
          connectedUsers: 2,
          recentUsers: mockUsers.slice(0, 5)
        }
      };
      
      mockUserService.getDashboardData.mockResolvedValue(mockResult);
      
      await userController.getDashboardData(req, res, next);
      
      expect(mockUserService.getDashboardData).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });
  });

  describe('healthCheck', () => {
    it('should return health status', async () => {
      await userController.healthCheck(req, res, next);
      
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Lunar Dashboard API is running',
        timestamp: expect.any(String),
        version: '1.0.0'
      });
    });
  });

  describe('clearCache', () => {
    it('should clear cache successfully', async () => {
      mockUserService.clearCache.mockImplementation(() => {});
      
      await userController.clearCache(req, res, next);
      
      expect(mockUserService.clearCache).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Cache cleared successfully',
        timestamp: expect.any(String)
      });
    });
  });
});
