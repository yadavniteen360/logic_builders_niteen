import axios from 'axios';

const api = axios.create({
  // Using a relative path so that Vercel rewrites (production) and Vite proxy (local) handle the routing.
  baseURL: '/api',
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
