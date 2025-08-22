import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors only for authenticated endpoints
    if (error.response && error.response.status === 401) {
      // Check if this is a public endpoint (property viewing)
      const publicEndpoints = ['/properties?', '/properties/', '/properties/recommendations'];
      const isPublicEndpoint = publicEndpoints.some(endpoint => 
        error.config?.url?.includes(endpoint)
      );
      
      // Only redirect to login if it's not a public endpoint and user was actually logged in
      if (!isPublicEndpoint && localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api; 