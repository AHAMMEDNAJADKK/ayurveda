import axios from 'axios';

// Get API URL from env with a robust fallback
let baseURL = import.meta.env.VITE_API_URL || 'https://ayurveda-1-khyi.onrender.com/api';

// Robust URL normalization:
// If base URL starts with a colon (e.g. ":5000/api"), prepend "localhost".
// If base URL doesn't start with "http://" or "https://", prepend "http://".
if (baseURL.startsWith(':')) {
  baseURL = `http://localhost${baseURL}`;
} else if (!/^https?:\/\//i.test(baseURL)) {
  baseURL = `http://${baseURL}`;
}

const api = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attach the token to authorization headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hca_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Format errors and handle global cases (e.g. auth failures)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    
    if (error.response) {
      // The server responded with a status code out of the 2xx range
      errorMessage = error.response.data?.message || errorMessage;
      console.error(`[API Error] Status ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received (e.g. connection refused, network down)
      errorMessage = 'Network connection failed. Please ensure the backend server is running on port 5000.';
      console.error('[API Network Error] No response received:', error.request);
    } else {
      // Something happened in setting up the request
      errorMessage = error.message;
      console.error('[API Request Setup Error]:', error.message);
    }
    
    // Inject normalized message for easy access in components
    error.cleanedMessage = errorMessage;
    return Promise.reject(error);
  }
);

export default api;
