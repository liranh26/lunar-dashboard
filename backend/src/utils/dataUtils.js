// Utility functions for data processing

/**
 * Parse and validate query parameters
 * @param {Object} query - Express query object
 * @returns {Object} Parsed and validated parameters
 */
const parseQueryParams = (query) => {
  const {
    search,
    role,
    status,
    profile,
    createdFrom,
    createdTo,
    sort,
    page = 1,
    pageSize = 20
  } = query;

  return {
    search: search ? search.toLowerCase().trim() : null,
    role: role ? role.toLowerCase().trim() : null,
    status: status ? status.toLowerCase().trim() : null,
    profile: profile ? profile.toLowerCase().trim() : null,
    createdFrom: createdFrom ? new Date(createdFrom) : null,
    createdTo: createdTo ? new Date(createdTo) : null,
    sort: sort || 'id:asc',
    page: Math.max(1, parseInt(page) || 1),
    pageSize: Math.min(100, Math.max(1, parseInt(pageSize) || 20))
  };
};

/**
 * Filter users based on criteria
 * @param {Array} users - Array of user objects
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered users
 */
const filterUsers = (users, filters) => {
  return users.filter(user => {
    // Search filter (name)
    if (filters.search && !user.name.toLowerCase().includes(filters.search)) {
      return false;
    }

    // Role filter
    if (filters.role && user.role.toLowerCase() !== filters.role) {
      return false;
    }

    // Status filter
    if (filters.status && user.status.toLowerCase() !== filters.status) {
      return false;
    }

    // Profile filter
    if (filters.profile && user.profile.toLowerCase() !== filters.profile) {
      return false;
    }

    // Date range filters (if implemented)
    if (filters.createdFrom && new Date(user.createdAt) < filters.createdFrom) {
      return false;
    }

    if (filters.createdTo && new Date(user.createdAt) > filters.createdTo) {
      return false;
    }

    return true;
  });
};

/**
 * Sort users based on field and direction
 * @param {Array} users - Array of user objects
 * @param {string} sortParam - Sort parameter in format "field:direction"
 * @returns {Array} Sorted users
 */
const sortUsers = (users, sortParam) => {
  const [field, direction] = sortParam.split(':');
  const isAsc = direction === 'asc';

  return users.sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];

    // Handle string comparison
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return isAsc ? -1 : 1;
    if (aVal > bVal) return isAsc ? 1 : -1;
    return 0;
  });
};

/**
 * Paginate users array
 * @param {Array} users - Array of user objects
 * @param {number} page - Current page number
 * @param {number} pageSize - Number of items per page
 * @returns {Object} Paginated result with metadata
 */
const paginateUsers = (users, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return {
    data: users.slice(startIndex, endIndex),
    pagination: {
      page,
      pageSize,
      total: users.length,
      totalPages: Math.ceil(users.length / pageSize),
      hasNext: endIndex < users.length,
      hasPrev: page > 1
    }
  };
};

/**
 * Validate user update data
 * @param {Object} updateData - Data to update
 * @returns {Object} Validation result
 */
const validateUserUpdate = (updateData) => {
  const allowedFields = ['status', 'role', 'profile', 'servers', 'lastActivity'];
  const errors = [];
  const validData = {};

  // Check if all fields are allowed
  Object.keys(updateData).forEach(field => {
    if (!allowedFields.includes(field)) {
      errors.push(`Field '${field}' is not allowed for update`);
    } else {
      validData[field] = updateData[field];
    }
  });

  // Validate specific fields
  if (validData.status && !['Connected', 'Offline'].includes(validData.status)) {
    errors.push('Status must be either "Connected" or "Offline"');
  }

  if (validData.role && !['Admin', 'User', 'Power User'].includes(validData.role)) {
    errors.push('Role must be one of: Admin, User, Power User');
  }

  if (validData.servers && (isNaN(validData.servers) || validData.servers < 0)) {
    errors.push('Servers must be a non-negative number');
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: validData
  };
};

/**
 * Create standardized API response
 * @param {*} data - Response data
 * @param {Object} pagination - Pagination metadata
 * @param {Object} filters - Applied filters
 * @returns {Object} Standardized response
 */
const createApiResponse = (data, pagination = null, filters = null) => {
  const response = {
    success: true,
    data,
    timestamp: new Date().toISOString()
  };

  if (pagination) {
    response.pagination = pagination;
  }

  if (filters) {
    response.filters = filters;
  }

  return response;
};

/**
 * Create error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {*} details - Additional error details
 * @returns {Object} Error response
 */
const createErrorResponse = (message, statusCode = 500, details = null) => {
  return {
    success: false,
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      ...(details && { details })
    }
  };
};

module.exports = {
  parseQueryParams,
  filterUsers,
  sortUsers,
  paginateUsers,
  validateUserUpdate,
  createApiResponse,
  createErrorResponse
};

