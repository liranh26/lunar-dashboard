import React, { useState, useEffect } from 'react';
import './UsersTable.css';
import apiService from '../../services/apiService';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch users data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getUsers();
        // Handle both direct array response and wrapped response
        const usersData = Array.isArray(response) ? response : response.users || [];
        setUsers(usersData);
        
        // Set first user as selected by default
        if (usersData.length > 0) {
          setSelectedUserId(usersData[0].id);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle user selection
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  // Loading state
  if (loading) {
    return (
      <div className="users-table-container">
        <div className="table-header">
          <div className="table-title-section">
            <h2 className="table-title">Users</h2>
          </div>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="users-table-container">
        <div className="table-header">
          <div className="table-title-section">
            <h2 className="table-title">Users</h2>
          </div>
        </div>
        <div className="error-state">
          <p className="error-message">{error}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
              <tr 
                key={user.id} 
                className={selectedUserId === user.id ? 'selected-row' : ''}
                onClick={() => handleUserSelect(user.id)}
                style={{ cursor: 'pointer' }}
              >
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

