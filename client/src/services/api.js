import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Customer API calls
export const customerAPI = {
  getAll: () => axiosInstance.get('/customers'),
  getById: (id) => axiosInstance.get(`/customers/${id}`),
  create: (data) => axiosInstance.post('/customers', data),
  update: (id, data) => axiosInstance.put(`/customers/${id}`, data),
  delete: (id) => axiosInstance.delete(`/customers/${id}`)
};

// Tailor API calls
export const tailorAPI = {
  getAll: () => axiosInstance.get('/tailors'),
  getById: (id) => axiosInstance.get(`/tailors/${id}`),
  create: (data) => axiosInstance.post('/tailors', data),
  update: (id, data) => axiosInstance.put(`/tailors/${id}`, data),
  delete: (id) => axiosInstance.delete(`/tailors/${id}`)
};

// Order API calls
export const orderAPI = {
  getAll: (params) => axiosInstance.get('/orders', { params }),
  getById: (id) => axiosInstance.get(`/orders/${id}`),
  create: (data) => axiosInstance.post('/orders', data),
  update: (id, data) => axiosInstance.put(`/orders/${id}`, data),
  delete: (id) => axiosInstance.delete(`/orders/${id}`),
  getDashboardStats: () => axiosInstance.get('/orders/stats/dashboard')
};

export default axiosInstance;
