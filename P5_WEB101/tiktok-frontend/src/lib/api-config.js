import axios from 'axios';  // import axios for making HTTP requests

// base URL reads from .env.local
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// create axios instance with default base URL and headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',  // we send JSON data
  },
});

// runs before every request — attaches login token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // get saved token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // attach to header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// runs after every response — handles expired/invalid tokens
api.interceptors.response.use(
  (response) => response,  // success — just return response
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');  // clear bad token
      window.location.href = '/';        // redirect to home
    }
    return Promise.reject(error);
  }
);

export default api;
