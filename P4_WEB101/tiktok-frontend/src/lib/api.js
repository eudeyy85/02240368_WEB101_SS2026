import axios from 'axios';  // import axios for making HTTP requests

// create an axios instance with base URL from .env.local
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,  // http://localhost:8000
});

// automatically attach token to every request if user is logged in
api.interceptors.request.use((config) => {
  // get token from localStorage (saved when user logs in)
  const token = localStorage.getItem('token');
  
  if (token) {
    // add token to Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;  // export so other files can use it