import axios from 'axios';

const api = axios.create({
  // In production (Vercel), this will use the VITE_API_URL you set in the dashboard.
  // Locally, it will fallback to your Node server on port 5000.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
