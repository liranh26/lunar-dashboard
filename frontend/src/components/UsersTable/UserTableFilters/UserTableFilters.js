import React from 'react';
import './UserTableFilters.css';

/**
 * UserTableFilters component - handles all filtering functionality
 * @param {Object} props - Component props
 * @param {Object} props.filters - Current filter values
 * @param {Function} props.onFilterChange - Callback for filter changes
 */
const UserTableFilters = ({ filters, onFilterChange }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  return (
    <div className="filter-controls">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={filters.search}
        onChange={(e) => handleInputChange('search', e.target.value)}
        className="search-input"
      />
      
      {/* Status Filter */}
      <div className="filter-dropdown">
        <select
          value={filters.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
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
      
      {/* Role Filter */}
      <div className="filter-dropdown">
        <select
          value={filters.role}
          onChange={(e) => handleInputChange('role', e.target.value)}
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
      
      {/* Profile Filter */}
      <div className="filter-dropdown">
        <select
          value={filters.profile}
          onChange={(e) => handleInputChange('profile', e.target.value)}
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
  );
};

export default UserTableFilters;
