import React from 'react';
import './UserTableHeader.css';

/**
 * UserTableHeader component - displays the table title and main actions
 * @param {Object} props - Component props
 * @param {string} props.title - Table title
 * @param {React.ReactNode} props.children - Additional content (filters, actions)
 */
const UserTableHeader = ({ title = "Users", children }) => {
  return (
    <div className="table-header">
      <div className="table-title-section">
        <h2 className="table-title">{title}</h2>
      </div>
      {children && (
        <div className="table-actions">
          {children}
        </div>
      )}
    </div>
  );
};

export default UserTableHeader;
