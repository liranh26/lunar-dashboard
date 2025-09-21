import React, { useState, useEffect } from 'react';
import './UsersTable.css';
import apiService from '../../services/apiService';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: '',
    profile: '',
    page: 1,
    pageSize: 20
  });

  // Fetch users data with current filters
  const fetchUsers = async (currentFilters = filters, append = false) => {
    try {
      if (!append) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }
      
      const response = await apiService.getUsers(currentFilters);
      console.log('Users API response:', response);
      
      if (append) {
        // Append new users to existing list
        setUsers(prevUsers => [...prevUsers, ...(response.data || [])]);
      } else {
        // Replace users list
        setUsers(response.data || []);
        
        // Set first user as selected by default
        if (response.data && response.data.length > 0) {
          setSelectedUserId(response.data[0].id);
        }
      }
      
      setPagination(response.pagination);
      setHasMore(response.pagination?.hasNext || false);
      
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Fetch users on component mount and when filters change
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 }; // Reset to page 1 on filter change
    setFilters(updatedFilters);
    setHasMore(true); // Reset hasMore when filters change
    fetchUsers(updatedFilters, false); // Don't append, replace the list
  };

  // Load more users (infinite scroll)
  const loadMoreUsers = () => {
    if (!hasMore || loadingMore) return;
    
    const nextPage = pagination.page + 1;
    const updatedFilters = { ...filters, page: nextPage };
    setFilters(updatedFilters);
    fetchUsers(updatedFilters, true); // Append to existing list
  };

  // Handle scroll event for infinite scroll
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100; // 100px threshold
    
    if (isNearBottom && hasMore && !loadingMore) {
      loadMoreUsers();
    }
  };

  // Handle user selection
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  // Optimistic UI update for user status
  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'Connected' ? 'Offline' : 'Connected';
    
    // Optimistic update - update UI immediately
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: newStatus }
          : user
      )
    );

    try {
      // Send update to backend
      await apiService.patchUser(userId, { status: newStatus });
      console.log(`User ${userId} status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating user status:', err);
      
      // Rollback on failure
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, status: currentStatus }
            : user
        )
      );
      
      setError('Failed to update user status. Please try again.');
    }
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
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search users..."
              value={filters.search}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
              className="search-input"
            />
            <div className="filter-dropdown">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange({ status: e.target.value })}
                className="filter-select"
              >
                <option value="">All Status</option>
                <option value="Connected">Connected</option>
                <option value="Offline">Offline</option>
              </select>
              <div className="dropdown-arrow">
                <img src="/images/CaretDown.svg" alt="Chevron" />
              </div>
            </div>
            <div className="filter-dropdown">
              <select
                value={filters.role}
                onChange={(e) => handleFilterChange({ role: e.target.value })}
                className="filter-select"
              >
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Power User">Power User</option>
              </select>
              <div className="dropdown-arrow">
                <img src="/images/CaretDown.svg" alt="Chevron" />
              </div>
            </div>
            <div className="filter-dropdown">
              <select
                value={filters.profile}
                onChange={(e) => handleFilterChange({ profile: e.target.value })}
                className="filter-select"
              >
                <option value="">All Profiles</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
              </select>
              <div className="dropdown-arrow">
                <img src="/images/CaretDown.svg" alt="Chevron" />
              </div>
            </div>
          </div>
          <div className="more-options"></div>
        </div>
      </div>
      
      <div className="table-wrapper" onScroll={handleScroll}>
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
                    <div 
                      className={`status-badge ${user.status.toLowerCase()}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusToggle(user.id, user.status);
                      }}
                      style={{ cursor: 'pointer' }}
                      title="Click to toggle status"
                    >
                      <div className={`status-dot-${user.status.toLowerCase()}`}></div>
                      <span className={`status-text-${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="role-cell">{user.role}</td>
                <td className="servers-cell">{user.servers}</td>
                <td className="activity-cell">{user.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Loading More Indicator */}
        {loadingMore && (
          <div className="loading-more">
            <div className="loading-spinner-small"></div>
            <span>Loading more users...</span>
          </div>
        )}
        
        {/* End of List Indicator */}
        {!hasMore && users.length > 0 && (
          <div className="end-of-list">
            <span>No more users to load</span>
          </div>
        )}
      </div>

      {/* User Count Info */}
      {pagination && (
        <div className="user-count-info">
          Showing {users.length} of {pagination.total} users
        </div>
      )}
    </div>
  );
};

export default UsersTable;

