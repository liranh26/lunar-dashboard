import React from 'react';
import UserTableRow from '../UserTableRow';
import './UserTableBody.css';

/**
 * UserTableBody component - renders the table body with users and loading states
 * @param {Object} props - Component props
 * @param {Array} props.users - Array of user objects
 * @param {number|null} props.selectedUserId - Currently selected user ID
 * @param {Function} props.onUserSelect - Callback when user is selected
 * @param {Function} props.onStatusToggle - Callback when status is toggled
 * @param {Function} props.onScroll - Callback for scroll events
 * @param {boolean} props.loadingMore - Whether more data is being loaded
 * @param {boolean} props.hasMore - Whether there are more users to load
 * @param {Object} props.pagination - Pagination metadata
 * @param {boolean} props.filtering - Whether filters are being applied
 */
const UserTableBody = ({ 
  users, 
  selectedUserId, 
  onUserSelect, 
  onStatusToggle, 
  onScroll,
  loadingMore,
  hasMore,
  pagination,
  filtering 
}) => {
  return (
    <div className="table-wrapper" onScroll={onScroll}>
      <table className="users-table">
        <thead className={filtering ? 'filtering-header' : ''}>
          <tr>
            <th>NAME</th>
            <th>ASSIGNED PROFILE</th>
            <th>STATUS</th>
            <th>ROLE</th>
            <th>SERVERS</th>
            <th>LAST ACTIVITY</th>
          </tr>
        </thead>
        <tbody className={filtering ? 'filtering' : ''}>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              isSelected={selectedUserId === user.id}
              onSelect={onUserSelect}
              onStatusToggle={onStatusToggle}
            />
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
          <span>
            Loaded {pagination?.total || users.length} users - no more users to load
          </span>
        </div>
      )}
    </div>
  );
};

export default UserTableBody;
