import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const flowersService = {
  getAll: () => api.get('/flowers'),
  getById: (id) => api.get(`/flowers/${id}`),
  create: (data) => api.post('/flowers', data),
  update: (id, data) => api.put(`/flowers/${id}`, data),
  delete: (id) => api.delete(`/flowers/${id}`),
};

export default api;
