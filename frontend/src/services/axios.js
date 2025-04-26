import axios from "axios";
import { useAuthStore } from "../store/auth";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Request interceptor
instance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const authStore = useAuthStore();

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await authStore.refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, logout the user
        authStore.logout();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      // Handle forbidden access
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default instance;
