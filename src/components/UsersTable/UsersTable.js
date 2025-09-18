import React from 'react';
import './UsersTable.css';

const UsersTable = () => {
  const users = [
    {
      id: 1,
      name: 'Keith Jimenez',
      avatar: '/images/users/keith.png',
      profile: 'Engineering',
      status: 'Connected',
      role: 'Power User',
      servers: 4,
      lastActivity: 'SEP 10 2025'
    },
    {
      id: 2,
      name: 'Louis Gray',
      avatar: '/images/users/louis.png',
      profile: 'Marketing',
      status: 'Offline',
      role: 'User',
      servers: 7,
      lastActivity: 'SEP 10 2025'
    },
    {
      id: 3,
      name: 'Donna Young',
      avatar: '/images/users/donna.png',
      profile: 'Marketing',
      status: 'Connected',
      role: 'Admin',
      servers: 8,
      lastActivity: 'SEP 10 2025'
    },
    {
      id: 4,
      name: 'Keith Jimenez',
      avatar: '/images/users/keith.png',
      profile: 'Engineering',
      status: 'Offline',
      role: 'User',
      servers: 4,
      lastActivity: 'SEP 10 2025'
    },
    {
      id: 5,
      name: 'Louis Gray',
      avatar: '/images/users/louis.png',
      profile: 'Marketing',
      status: 'Connected',
      role: 'Admin',
      servers: 7,
      lastActivity: 'SEP 10 2025'
    },
    {
      id: 6,
      name: 'Donna Young',
      avatar: '/images/users/donna.png',
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
        </div>
        <div className="table-actions">
          <div className="filter-dropdown">
            <span className="dropdown-text">All</span>
            <div className="dropdown-arrow">
              <img src="/images/CaretDown.svg" alt="Chevron" />
            </div>
          </div>
          <div className="more-options"></div>
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
                  <div className="user-info">
                    <img src={user.avatar} alt={user.name} className="user-avatar-small" />
                    <span className="user-name">{user.name}</span>
                  </div>
                </td>
                <td className="profile-cell">{user.profile}</td>
                <td>
                  <div className="status-cell">
                    {user.status === 'Connected' ? (
                      <div className="status-connected">
                        <div className="status-dot-connected"></div>
                        <span className="status-text-connected">Connected</span>
                      </div>
                    ) : (
                      <div className="status-offline">
                        <div className="status-dot-offline"></div>
                        <span className="status-text-offline">Offline</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="role-cell">{user.role}</td>
                <td className="servers-cell">{user.servers}</td>
                <td className="activity-cell">{user.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
