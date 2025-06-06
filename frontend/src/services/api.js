import axios from 'axios';
import { handleApiError, showErrorNotification } from './errorHandler';
import { useAuthStore } from '../store/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3009/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Version temporaire
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Temporairement désactivé pour debug
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('401 error on:', originalRequest.url);
      
      // Si c'est NOT une requête de login, déconnecter
      if (!originalRequest.url.includes('/auth/login')) {
        console.log('401 on protected route - logging out');
        const authStore = useAuthStore();
        authStore.logout();
      }
      
      return Promise.reject(error);
    }

    const handledError = handleApiError(error);
    showErrorNotification(handledError);
    return Promise.reject(handledError);
  }
);
export const get = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const post = async (url, data = {}) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const put = async (url, data = {}) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const patch = async (url, data = {}) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const del = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export default api; 