import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const flowerService = {
  getFlowers: () => api.get('/flowers'),
  getFlowerById: (id) => api.get(`/flowers/${id}`),
  createFlower: (data) => api.post('/flowers', data),
  updateFlower: (id, data) => api.put(`/flowers/${id}`, data),
  deleteFlower: (id) => api.delete(`/flowers/${id}`),
};

export default flowerService;
