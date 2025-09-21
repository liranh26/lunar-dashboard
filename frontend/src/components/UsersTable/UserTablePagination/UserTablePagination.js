import React from 'react';
import './UserTablePagination.css';

/**
 * UserTablePagination component - displays pagination info and controls
 * @param {Object} props - Component props
 * @param {Object} props.pagination - Pagination metadata
 * @param {Array} props.users - Current users array
 */
const UserTablePagination = ({ pagination, users }) => {
  if (!pagination) return null;

  return (
    <div className="user-count-info">
      Showing {users.length} of {pagination.total} users
      {pagination.totalPages > 1 && (
        <span className="page-info">
          (Page {pagination.page} of {pagination.totalPages})
        </span>
      )}
    </div>
  );
};

export default UserTablePagination;
