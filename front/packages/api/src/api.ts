import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000/',
  timeout: 10000
});

// Interceptor para incluir token de autenticação
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token'); // Pega o token armazenado
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // Tratar erro de autenticação
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;