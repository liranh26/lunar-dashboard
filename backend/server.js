const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import mock data from JSON files
const mockUsers = require('./data/users.json');
const mockStats = require('./data/stats.json');

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Lunar Dashboard API is running' });
});

app.get('/api/users', (req, res) => {
  const { status, profile, role } = req.query;
  let filteredUsers = [...mockUsers];

  // Apply filters
  if (status) {
    filteredUsers = filteredUsers.filter(user => user.status.toLowerCase() === status.toLowerCase());
  }
  if (profile) {
    filteredUsers = filteredUsers.filter(user => user.profile.toLowerCase() === profile.toLowerCase());
  }
  if (role) {
    filteredUsers = filteredUsers.filter(user => user.role.toLowerCase() === role.toLowerCase());
  }

  res.json({
    users: filteredUsers,
    total: filteredUsers.length,
    filters: { status, profile, role }
  });
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Update user data
  mockUsers[userIndex] = { ...mockUsers[userIndex], ...req.body };
  
  res.json(mockUsers[userIndex]);
});

app.get('/api/stats', (req, res) => {
  res.json(mockStats);
});

app.get('/api/dashboard', (req, res) => {
  res.json({
    stats: mockStats,
    users: mockUsers.slice(0, 10), // Return first 10 users for dashboard overview
    lastUpdated: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Lunar Dashboard API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
  console.log(`📈 Stats API: http://localhost:${PORT}/api/stats`);
});

module.exports = app;

