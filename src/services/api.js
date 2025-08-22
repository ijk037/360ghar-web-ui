import axios from 'axios';

// Ensure the API URL always uses HTTPS in production
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  // If environment variable is set, use it and ensure HTTPS
  if (envUrl) {
    // Always force HTTPS in production or if the current page is HTTPS
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
      return envUrl.startsWith('https://') ? envUrl : envUrl.replace('http://', 'https://');
    }
    // For development or non-HTTPS environments, use as-is
    return envUrl;
  }

  // Fallback URL with HTTPS
  return 'https://360ghar.up.railway.app/api/v1';
};

// Create axios instance with base URL
const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add HTTPS enforcement interceptor
api.interceptors.request.use(
  (config) => {
    // Ensure HTTPS for all requests
    if (config.baseURL && config.baseURL.startsWith('http://')) {
      config.baseURL = config.baseURL.replace('http://', 'https://');
    }
    if (config.url && config.url.startsWith('http://')) {
      config.url = config.url.replace('http://', 'https://');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
      const publicEndpoints = ['/properties/?', '/properties/', '/properties/recommendations/'];
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