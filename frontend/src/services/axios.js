import axios from "axios";
import { useAuthStore } from "../store/auth";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
