import React from 'react';
import './UsersTable.css';

const UsersTable = () => {
  const users = [
    {
      id: 1,
      name: 'Keith Jimenez',
      avatar: 'KJ',
      profile: 'Engineering',
      status: 'Connected',
      role: 'Power User',
      servers: 4,
      lastActivity: 'SEP 10 2025'
    },
    {
      id: 2,
      name: 'Louis Gray',
      avatar: 'LG',
      profile: 'Marketing',
      status: 'Offline',
      role: 'User',
      servers: 7,
      lastActivity: 'SEP 10 2025'
    },
    {
      id: 3,
      name: 'Donna Young',
      avatar: 'DY',
      profile: 'Marketing',
      status: 'Connected',
      role: 'Admin',
      servers: 8,
      lastActivity: 'SEP 10 2025'
    },
    {
      id: 4,
      name: 'Keith Jimenez',
      avatar: 'KJ',
      profile: 'Engineering',
      status: 'Offline',
      role: 'User',
      servers: 4,
      lastActivity: 'SEP 10 2025'
    },
    {
      id: 5,
      name: 'Louis Gray',
      avatar: 'LG',
      profile: 'Marketing',
      status: 'Connected',
      role: 'Admin',
      servers: 7,
      lastActivity: 'SEP 10 2025'
    },
    {
      id: 6,
      name: 'Donna Young',
      avatar: 'DY',
      profile: 'Marketing',
      status: 'Connected',
      role: 'User',
      servers: 8,
      lastActivity: 'SEP 10 2025'
    }
  ];

  const getStatusColor = (status) => {
    return status === 'Connected' ? '#10B981' : '#EF4444';
  };

  return (
    <div className="users-table-container">
      <div className="table-header">
        <div className="table-title-section">
          <h2 className="table-title">Users</h2>
          <div className="filter-dropdown">
            <span>All</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
        <div className="table-actions">
          <span className="more-options">⋮</span>
        </div>
      </div>
      
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>ASSIGNED PROFILE</th>
              <th>STATUS</th>
              <th>ROLE</th>
              <th>SERVERS</th>
              <th>LAST ACTIVITY</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar-small">{user.avatar}</div>
                    <span className="user-name">{user.name}</span>
                  </div>
                </td>
                <td>{user.profile}</td>
                <td>
                  <div className="status-cell">
                    <div 
                      className="status-dot" 
                      style={{ backgroundColor: getStatusColor(user.status) }}
                    ></div>
                    <span>{user.status}</span>
                  </div>
                </td>
                <td>{user.role}</td>
                <td>{user.servers}</td>
                <td>
                  <div className="activity-cell">
                    <span>{user.lastActivity}</span>
                    <span className="sort-arrow">▼</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
