import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from '../services/axios';

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || "");
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);
  const refreshToken = ref(localStorage.getItem("refreshToken") || "");
  const isRefreshing = ref(false);

  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role || null);

  async function refreshAccessToken() {
    if (isRefreshing.value) return;
    isRefreshing.value = true;

    try {
      const { data } = await axios.post('/refresh-token', {
        refreshToken: refreshToken.value
      });
      
      token.value = data.token;
      localStorage.setItem("token", data.token);
      return data.token;
    } catch (error) {
      logout();
      throw error;
    } finally {
      isRefreshing.value = false;
    }
  }

  function login(newUser, newToken, newRefreshToken) {
    token.value = newToken;
    user.value = newUser;
    refreshToken.value = newRefreshToken;
    
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("refreshToken", newRefreshToken);
  }

  function logout() {
    token.value = "";
    user.value = null;
    refreshToken.value = "";
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
  }

  function initializeAuth() {
    const savedToken = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedRefreshToken = localStorage.getItem("refreshToken");
    
    if (savedToken && savedUser && savedRefreshToken) {
      token.value = savedToken;
      user.value = savedUser;
      refreshToken.value = savedRefreshToken;
    }
  }

  return {
    token,
    user,
    refreshToken,
    isAuthenticated,
    userRole,
    login,
    logout,
    initializeAuth,
    refreshAccessToken,
  };
});
