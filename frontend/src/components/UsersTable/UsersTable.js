import React from 'react';
import { useUsers } from '../../hooks/useUsers';
import UserTableHeader from './UserTableHeader';
import UserTableFilters from './UserTableFilters';
import UserTableBody from './UserTableBody';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import './UsersTable.css';

/**
 * UsersTable component - main component for displaying and managing users
 * Refactored into smaller, focused sub-components following React best practices
 */
const UsersTable = () => {
  const {
    users,
    loading,
    error,
    selectedUserId,
    pagination,
    hasMore,
    loadingMore,
    filtering,
    filters,
    handleFilterChange,
    loadMoreUsers,
    handleUserSelect,
    handleStatusToggle
  } = useUsers();

  // Handle scroll event for infinite scroll
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100; // 100px threshold
    
    if (isNearBottom && hasMore && !loadingMore) {
      loadMoreUsers();
    }
  };

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="users-table-container">
      {/* Table Header with Filters */}
      <UserTableHeader title="Users">
        <UserTableFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
          <div className="more-options"></div>
      </UserTableHeader>
      
      {/* Table Body */}
      <UserTableBody
        users={users}
        selectedUserId={selectedUserId}
        onUserSelect={handleUserSelect}
        onStatusToggle={handleStatusToggle}
        onScroll={handleScroll}
        loadingMore={loadingMore}
        hasMore={hasMore}
        pagination={pagination}
        filtering={filtering}
      />
    </div>
  );
};

export default UsersTable;

