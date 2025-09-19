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

console.log('📊 Loaded users:', mockUsers.length);
console.log('📈 Loaded stats:', Object.keys(mockStats));

// Helper function to parse query parameters
const parseQueryParams = (query) => {
  const {
    search,
    role,
    status,
    profile,
    createdFrom,
    createdTo,
    sort,
    page = 1,
    pageSize = 20
  } = query;

  return {
    search: search ? search.toLowerCase() : null,
    role: role ? role.toLowerCase() : null,
    status: status ? status.toLowerCase() : null,
    profile: profile ? profile.toLowerCase() : null,
    createdFrom: createdFrom ? new Date(createdFrom) : null,
    createdTo: createdTo ? new Date(createdTo) : null,
    sort: sort || 'id:asc',
    page: Math.max(1, parseInt(page) || 1),
    pageSize: Math.min(100, Math.max(1, parseInt(pageSize) || 20))
  };
};

// Helper function to filter users
const filterUsers = (users, filters) => {
  return users.filter(user => {
    // Search filter (name)
    if (filters.search && !user.name.toLowerCase().includes(filters.search)) {
      return false;
    }

    // Role filter
    if (filters.role && user.role.toLowerCase() !== filters.role) {
      return false;
    }

    // Status filter
    if (filters.status && user.status.toLowerCase() !== filters.status) {
      return false;
    }

    // Profile filter
    if (filters.profile && user.profile.toLowerCase() !== filters.profile) {
      return false;
    }

    // Date filters (using lastActivity as created date for demo)
    if (filters.createdFrom || filters.createdTo) {
      const userDate = new Date(user.lastActivity);
      if (filters.createdFrom && userDate < filters.createdFrom) {
        return false;
      }
      if (filters.createdTo && userDate > filters.createdTo) {
        return false;
      }
    }

    return true;
  });
};

// Helper function to sort users
const sortUsers = (users, sortParam) => {
  const [field, direction] = sortParam.split(':');
  const isAsc = direction === 'asc';

  return users.sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];

    // Handle string comparison
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return isAsc ? -1 : 1;
    if (aVal > bVal) return isAsc ? 1 : -1;
    return 0;
  });
};

// Helper function to paginate users
const paginateUsers = (users, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return {
    data: users.slice(startIndex, endIndex),
    pagination: {
      page,
      pageSize,
      total: users.length,
      totalPages: Math.ceil(users.length / pageSize),
      hasNext: endIndex < users.length,
      hasPrev: page > 1
    }
  };
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Lunar Dashboard API is running' });
});

app.get('/api/users', (req, res) => {
  try {
    const filters = parseQueryParams(req.query);
    
    // Apply filters
    let filteredUsers = filterUsers([...mockUsers], filters);
    
    // Apply sorting
    filteredUsers = sortUsers(filteredUsers, filters.sort);
    
    // Apply pagination
    const result = paginateUsers(filteredUsers, filters.page, filters.pageSize);
    
    res.json({
      users: result.data,
      pagination: result.pagination,
      filters: {
        search: filters.search,
        role: filters.role,
        status: filters.status,
        profile: filters.profile,
        createdFrom: filters.createdFrom,
        createdTo: filters.createdTo,
        sort: filters.sort
      }
    });
  } catch (error) {
    console.error('Error in /api/users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

// PATCH endpoint for partial updates (optimistic UI)
app.patch('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Validate allowed fields for updates
    const allowedFields = ['status', 'role', 'profile', 'servers', 'lastActivity'];
    const updateData = {};
    
    for (const [key, value] of Object.entries(req.body)) {
      if (allowedFields.includes(key)) {
        updateData[key] = value;
      }
    }
    
    // Update user data
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updateData };
    
    res.json({
      success: true,
      user: mockUsers[userIndex],
      updatedFields: Object.keys(updateData)
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
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

