// API service for communicating with the backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class ApiService {
  // Generic fetch method with error handling
  async fetchData(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Health check
  async checkHealth() {
    return this.fetchData('/api/health');
  }

  // Users API
  async getUsers(filters = {}) {
    const queryParams = new URLSearchParams();
    
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.profile) queryParams.append('profile', filters.profile);
    if (filters.role) queryParams.append('role', filters.role);

    const endpoint = queryParams.toString() 
      ? `/api/users?${queryParams.toString()}`
      : '/api/users';

    return this.fetchData(endpoint);
  }

  async getUserById(id) {
    return this.fetchData(`/api/users/${id}`);
  }

  async updateUser(id, userData) {
    return this.fetchData(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Stats API
  async getStats() {
    return this.fetchData('/api/stats');
  }

  // Dashboard API
  async getDashboardData() {
    return this.fetchData('/api/dashboard');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
