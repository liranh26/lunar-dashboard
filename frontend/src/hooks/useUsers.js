import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/apiService';

/**
 * Custom hook for managing users data and operations
 * @returns {Object} Users state and operations
 */
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: '',
    profile: '',
    page: 1,
    pageSize: 20
  });

  // Fetch users data with current filters
  const fetchUsers = useCallback(async (currentFilters, append = false, isFilterChange = false) => {
    try {
      if (!append) {
        if (isFilterChange) {
          setFiltering(true);
        } else {
          setLoading(true);
        }
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
      setFiltering(false);
    }
  }, []);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers(filters);
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 }; // Reset to page 1 on filter change
    setFilters(updatedFilters);
    setHasMore(true); // Reset hasMore when filters change
    fetchUsers(updatedFilters, false, true); // Don't append, replace the list, mark as filter change
  }, [filters, fetchUsers]);

  // Load more users (infinite scroll)
  const loadMoreUsers = useCallback(() => {
    if (!hasMore || loadingMore) return;
    
    const nextPage = pagination.page + 1;
    const updatedFilters = { ...filters, page: nextPage };
    setFilters(updatedFilters);
    fetchUsers(updatedFilters, true); // Append to existing list
  }, [hasMore, loadingMore, pagination, filters, fetchUsers]);

  // Handle user selection
  const handleUserSelect = useCallback((userId) => {
    setSelectedUserId(userId);
  }, []);

  // Optimistic UI update for user status
  const handleStatusToggle = useCallback(async (userId, currentStatus) => {
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
  }, []);

  return {
    // State
    users,
    loading,
    error,
    selectedUserId,
    pagination,
    hasMore,
    loadingMore,
    filtering,
    filters,
    
    // Actions
    handleFilterChange,
    loadMoreUsers,
    handleUserSelect,
    handleStatusToggle,
    fetchUsers
  };
};
