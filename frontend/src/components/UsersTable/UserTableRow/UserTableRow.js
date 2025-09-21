import React from 'react';
import './UserTableRow.css';

/**
 * UserTableRow component - renders a single user row
 * @param {Object} props - Component props
 * @param {Object} props.user - User data object
 * @param {boolean} props.isSelected - Whether this row is selected
 * @param {Function} props.onSelect - Callback when row is clicked
 * @param {Function} props.onStatusToggle - Callback when status is toggled
 */
const UserTableRow = ({ user, isSelected, onSelect, onStatusToggle }) => {
  const handleRowClick = () => {
    onSelect(user.id);
  };

  const handleStatusClick = (e) => {
    e.stopPropagation();
    onStatusToggle(user.id, user.status);
  };

  return (
    <tr 
      className={isSelected ? 'selected-row' : ''}
      onClick={handleRowClick}
      style={{ cursor: 'pointer' }}
    >
      {/* User Name and Avatar */}
      <td>
        <div className="user-info">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="user-avatar-small" 
          />
          <span className="user-name">{user.name}</span>
        </div>
      </td>
      
      {/* Profile */}
      <td className="profile-cell">{user.profile}</td>
      
      {/* Status */}
      <td>
        <div className="status-cell">
          <div 
            className={`status-badge ${user.status.toLowerCase()}`}
            onClick={handleStatusClick}
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
      
      {/* Role */}
      <td className="role-cell">{user.role}</td>
      
      {/* Servers */}
      <td className="servers-cell">{user.servers}</td>
      
      {/* Last Activity */}
      <td className="activity-cell">{user.lastActivity}</td>
    </tr>
  );
};

export default UserTableRow;
