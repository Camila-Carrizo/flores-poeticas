import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const colorService = {
  getColors: () => api.get('/colors'),
  createColor: (data) => api.post('/colors', data),
  updateColor: (id, data) => api.put(`/colors/${id}`, data),
  deleteColor: (id) => api.delete(`/colors/${id}`),
};

export default colorService;
