import axios from 'axios';

const api = axios.create({
  // REPLACE the URL below with your actual deployed Render backend URL
  baseURL: 'https://kalpathon-backend.onrender.com/api',
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
