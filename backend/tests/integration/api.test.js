// Integration tests for API endpoints
const request = require('supertest');
const App = require('../../src/app');
const { mockUsers, mockStats } = require('../fixtures/mockData');

describe('API Integration Tests', () => {
  let app;
  let server;

  beforeAll(async () => {
    app = new App();
    server = app.start();
  });

  afterAll(async () => {
    if (server) {
      server.close();
    }
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app.app)
        .get('/api/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Lunar Dashboard API is running');
      expect(response.body.version).toBe('1.0.0');
    });
  });

  describe('GET /api/users', () => {
    it('should return users list', async () => {
      const response = await request(app.app)
        .get('/api/users')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.pagination).toBeDefined();
    });

    it('should filter users by status', async () => {
      const response = await request(app.app)
        .get('/api/users?status=Connected')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.every(user => user.status === 'Connected')).toBe(true);
    });

    it('should filter users by role', async () => {
      const response = await request(app.app)
        .get('/api/users?role=Admin')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.every(user => user.role === 'Admin')).toBe(true);
    });

    it('should search users by name', async () => {
      const response = await request(app.app)
        .get('/api/users?search=Keith')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.every(user => 
        user.name.toLowerCase().includes('keith')
      )).toBe(true);
    });

    it('should handle pagination', async () => {
      const response = await request(app.app)
        .get('/api/users?page=1&pageSize=5')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.pageSize).toBe(5);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return specific user', async () => {
      const response = await request(app.app)
        .get('/api/users/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(1);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app.app)
        .get('/api/users/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('User not found');
    });
  });

  describe('PATCH /api/users/:id', () => {
    it('should update user status', async () => {
      const updateData = { status: 'Offline' };
      
      const response = await request(app.app)
        .patch('/api/users/1')
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('Offline');
    });

    it('should update user role', async () => {
      const updateData = { role: 'Power User' };
      
      const response = await request(app.app)
        .patch('/api/users/1')
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.role).toBe('Power User');
    });

    it('should return 400 for invalid update data', async () => {
      const updateData = { invalidField: 'value' };
      
      const response = await request(app.app)
        .patch('/api/users/1')
        .send(updateData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Validation failed');
    });

    it('should return 404 for non-existent user', async () => {
      const updateData = { status: 'Offline' };
      
      const response = await request(app.app)
        .patch('/api/users/999')
        .send(updateData)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('User not found');
    });
  });

  describe('GET /api/stats', () => {
    it('should return statistics', async () => {
      const response = await request(app.app)
        .get('/api/stats')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.connectedTools).toBeDefined();
      expect(response.body.data.connectedServers).toBeDefined();
      expect(response.body.data.activeAgents).toBeDefined();
    });
  });

  describe('GET /api/dashboard', () => {
    it('should return dashboard data', async () => {
      const response = await request(app.app)
        .get('/api/dashboard')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.stats).toBeDefined();
      expect(response.body.data.totalUsers).toBeDefined();
      expect(response.body.data.connectedUsers).toBeDefined();
      expect(response.body.data.recentUsers).toBeDefined();
    });
  });

  describe('POST /api/cache/clear', () => {
    it('should clear cache successfully', async () => {
      const response = await request(app.app)
        .post('/api/cache/clear')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Cache cleared successfully');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app.app)
        .get('/api/non-existent')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('not found');
    });

    it('should handle CORS preflight requests', async () => {
      await request(app.app)
        .options('/api/users')
        .expect(204);
    });
  });
});
