import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { post } from '../services/api'; // Uncomment when backend is ready
import router from '../router';

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem('token') || '');
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
  const refreshToken = ref(localStorage.getItem('refreshToken') || '');
  const lastActivity = ref(parseInt(localStorage.getItem('lastActivity') || '0'));
  const isRefreshing = ref(false);

  const isAuthenticated = computed(() => {
    return !!token.value;
  });

  const userRole = computed(() => user.value?.role || null);

  // Mock implementation for testing - Comment out when backend is ready
  async function refreshAccessToken() {
    return token.value;
  }

  // Mock implementation for testing - Comment out when backend is ready
  async function login(credentials) {
    try {
      // Mock user for testing
      const mockUser = {
        id: 1,
        email: credentials.email,
        role: 'student',
        name: 'Test User'
      };
      
      const mockToken = 'mock-token-' + Date.now();
      token.value = mockToken;
      user.value = mockUser;
      refreshToken.value = 'mock-refresh-token';
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('refreshToken', 'mock-refresh-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      updateLastActivity();
      
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  }

  // Backend implementation - Uncomment when backend is ready
  
  async function refreshAccessToken() {
    if (isRefreshing.value) return;
    isRefreshing.value = true;

    try {
      const response = await post('/auth/refresh', {
        refreshToken: refreshToken.value
      });
      
      if (response.accessToken) {
        setTokens(response.accessToken, response.refreshToken);
        return response.accessToken;
      }
      throw new Error('Invalid token response');
    } catch (error) {
      logout();
      throw error;
    } finally {
      isRefreshing.value = false;
    }
  }

  function setTokens(newToken, newRefreshToken) {
    token.value = newToken;
    refreshToken.value = newRefreshToken;
    
    localStorage.setItem('token', newToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    updateLastActivity();
  }

  async function login(credentials) {
    try {
      const response = await post('/auth/login', credentials);
      setTokens(response.accessToken, response.refreshToken);
      user.value = response.user;
      localStorage.setItem('user', JSON.stringify(response.user));
      updateLastActivity();
      
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  }
  

  function logout() {
    token.value = '';
    user.value = null;
    refreshToken.value = '';
    lastActivity.value = 0;
    
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('lastActivity');
    
    router.push('/login');
  }

  function updateLastActivity() {
    lastActivity.value = Date.now();
    localStorage.setItem('lastActivity', lastActivity.value.toString());
  }

  function initializeAuth() {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedRefreshToken = localStorage.getItem('refreshToken');
    const savedLastActivity = localStorage.getItem('lastActivity');
    
    if (savedToken && savedUser && savedRefreshToken && savedLastActivity) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
      refreshToken.value = savedRefreshToken;
      lastActivity.value = parseInt(savedLastActivity);
    }
  }

  async function checkEmail(email) {
    try {
      const response = await post('/auth/check-email', { email });
      // Expecting response: { exists: true/false }
      return response.exists;
    } catch (error) {
      throw error;
    }
  }

  async function sendPasswordReset(email) {
    try {
      await post('/auth/send-password-reset', { email });
      // No return value needed, just success/failure
    } catch (error) {
      throw error;
    }
  }

  return {
    token,
    user,
    refreshToken,
    isAuthenticated,
    userRole,
    lastActivity,
    login,
    logout,
    initializeAuth,
    refreshAccessToken,
    updateLastActivity,
    checkEmail,
    sendPasswordReset
  };
});
