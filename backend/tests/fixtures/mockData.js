// Test fixtures - mock data for testing
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/images/users/john.png",
    profile: "Engineering",
    status: "Connected",
    role: "Admin",
    servers: 5,
    lastActivity: "SEP 21 2025",
    selected: false
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/images/users/jane.png",
    profile: "Marketing",
    status: "Offline",
    role: "User",
    servers: 3,
    lastActivity: "SEP 20 2025",
    selected: false
  },
  {
    id: 3,
    name: "Bob Johnson",
    avatar: "/images/users/bob.png",
    profile: "Engineering",
    status: "Connected",
    role: "Power User",
    servers: 8,
    lastActivity: "SEP 21 2025",
    selected: false
  }
];

const mockStats = {
  connectedTools: 15,
  connectedServers: 8,
  activeAgents: 3
};

const mockPagination = {
  page: 1,
  pageSize: 20,
  total: 3,
  totalPages: 1,
  hasNext: false,
  hasPrev: false
};

module.exports = {
  mockUsers,
  mockStats,
  mockPagination
};
