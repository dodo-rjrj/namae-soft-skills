import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { post } from '../services/api'; // Uncomment when backend is ready
import router from '../router';
import { generateCSRFToken } from '../utils/security';

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem('token') || '');
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
  const refreshToken = ref(localStorage.getItem('refreshToken') || '');
  const lastActivity = ref(parseInt(localStorage.getItem('lastActivity') || '0'));
  const isRefreshing = ref(false);
  const csrfToken = ref(generateCSRFToken());
  const sessionId = ref(localStorage.getItem('sessionId') || '');

  const isAuthenticated = computed(() => {
    return !!token.value && !!sessionId.value;
  });

  const userRole = computed(() => user.value?.role || null);

  // Mock implementation for testing - Comment out when backend is ready
  async function refreshAccessToken() {
    return token.value;
  }

  // Mock implementation for testing - Comment out when backend is ready
  async function login(credentials) {
    try {
      // Validate password strength
      if (!validatePasswordStrength(credentials.password)) {
        throw new Error('Password does not meet security requirements');
      }

      // Mock user data for testing - Different roles based on email
      let mockUser;
      if (credentials.email.includes('professor')) {
        mockUser = {
          id: 2,
          email: credentials.email,
          role: 'professor',
          name: 'Professor Test'
        };
      } else if (credentials.email.includes('admin')) {
        mockUser = {
          id: 3,
          email: credentials.email,
          role: 'admin',
          name: 'Admin Test'
        };
      } else {
        mockUser = {
          id: 1,
          email: credentials.email,
          role: 'student',
          name: 'Student Test'
        };
      }
      
      const mockToken = 'mock-token-' + Date.now();
      const mockRefreshToken = 'mock-refresh-token-' + Date.now();
      const mockSessionId = 'mock-session-' + Date.now();

      // Set tokens and user data
      setTokens(mockToken, mockRefreshToken);
      sessionId.value = mockSessionId;
      user.value = mockUser;
      
      localStorage.setItem('sessionId', mockSessionId);
      localStorage.setItem('user', JSON.stringify(mockUser));
      updateLastActivity();
      
      // Generate new CSRF token after successful login
      csrfToken.value = generateCSRFToken();
      
      // Redirect to appropriate dashboard based on role
      switch (mockUser.role) {
        case 'student':
          router.push('/student-dashboard');
          break;
        case 'professor':
          router.push('/prof-dashboard');
          break;
        case 'admin':
          router.push('/admin-dashboard');
          break;
        default:
          router.push('/unauthorized');
      }
    } catch (error) {
      throw error;
    }
  }

  function validatePasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength &&
           hasUpperCase &&
           hasLowerCase &&
           hasNumbers &&
           hasSpecialChar;
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

  function logout() {
    // Call logout endpoint to invalidate session
    post('/auth/logout', {
      sessionId: sessionId.value,
      csrfToken: csrfToken.value
    }).catch(console.error);

    token.value = '';
    user.value = null;
    refreshToken.value = '';
    lastActivity.value = 0;
    sessionId.value = '';
    csrfToken.value = generateCSRFToken();
    
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('lastActivity');
    localStorage.removeItem('sessionId');
    
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
    csrfToken,
    sessionId,
    login,
    logout,
    initializeAuth,
    refreshAccessToken,
    updateLastActivity,
    checkEmail,
    sendPasswordReset,
    validatePasswordStrength
  };
});
