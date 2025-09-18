const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data
const mockUsers = [
  {
    id: 1,
    name: 'Keith Jimenez',
    avatar: '/images/users/keith.png',
    profile: 'Engineering',
    status: 'Connected',
    role: 'Power User',
    servers: 4,
    lastActivity: 'SEP 10 2025',
    selected: true
  },
  {
    id: 2,
    name: 'Louis Gray',
    avatar: '/images/users/louis.png',
    profile: 'Marketing',
    status: 'Offline',
    role: 'User',
    servers: 7,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 3,
    name: 'Donna Young',
    avatar: '/images/users/donna.png',
    profile: 'Marketing',
    status: 'Connected',
    role: 'Admin',
    servers: 8,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 4,
    name: 'Keith Jimenez',
    avatar: '/images/users/keith.png',
    profile: 'Engineering',
    status: 'Offline',
    role: 'User',
    servers: 4,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 5,
    name: 'Louis Gray',
    avatar: '/images/users/louis.png',
    profile: 'Marketing',
    status: 'Connected',
    role: 'Admin',
    servers: 7,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 6,
    name: 'Donna Young',
    avatar: '/images/users/donna.png',
    profile: 'Marketing',
    status: 'Connected',
    role: 'User',
    servers: 8,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 7,
    name: 'Keith Jimenez',
    avatar: '/images/users/keith.png',
    profile: 'Engineering',
    status: 'Connected',
    role: 'Power User',
    servers: 4,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 8,
    name: 'Louis Gray',
    avatar: '/images/users/louis.png',
    profile: 'Marketing',
    status: 'Offline',
    role: 'User',
    servers: 7,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 9,
    name: 'Donna Young',
    avatar: '/images/users/donna.png',
    profile: 'Marketing',
    status: 'Connected',
    role: 'Admin',
    servers: 8,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 10,
    name: 'Keith Jimenez',
    avatar: '/images/users/keith.png',
    profile: 'Engineering',
    status: 'Offline',
    role: 'User',
    servers: 4,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 11,
    name: 'Louis Gray',
    avatar: '/images/users/louis.png',
    profile: 'Marketing',
    status: 'Connected',
    role: 'Admin',
    servers: 7,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 12,
    name: 'Donna Young',
    avatar: '/images/users/donna.png',
    profile: 'Marketing',
    status: 'Connected',
    role: 'User',
    servers: 8,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 13,
    name: 'Keith Jimenez',
    avatar: '/images/users/keith.png',
    profile: 'Engineering',
    status: 'Connected',
    role: 'Power User',
    servers: 4,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 14,
    name: 'Louis Gray',
    avatar: '/images/users/louis.png',
    profile: 'Marketing',
    status: 'Offline',
    role: 'User',
    servers: 7,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 15,
    name: 'Donna Young',
    avatar: '/images/users/donna.png',
    profile: 'Marketing',
    status: 'Connected',
    role: 'Admin',
    servers: 8,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 16,
    name: 'Keith Jimenez',
    avatar: '/images/users/keith.png',
    profile: 'Engineering',
    status: 'Offline',
    role: 'User',
    servers: 4,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 17,
    name: 'Louis Gray',
    avatar: '/images/users/louis.png',
    profile: 'Marketing',
    status: 'Connected',
    role: 'Admin',
    servers: 7,
    lastActivity: 'SEP 10 2025',
    selected: false
  },
  {
    id: 18,
    name: 'Donna Young',
    avatar: '/images/users/donna.png',
    profile: 'Marketing',
    status: 'Connected',
    role: 'User',
    servers: 8,
    lastActivity: 'SEP 10 2025',
    selected: false
  }
];

const mockStats = {
  connectedTools: 39,
  connectedServers: 11,
  activeAgents: 2
};

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

