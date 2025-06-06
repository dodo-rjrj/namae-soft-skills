import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { post } from "../services/api";
import router from "../router";
import { generateCSRFToken } from "../utils/security";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || "");
  const user = ref(JSON.parse(localStorage.getItem("user") || "null"));
  const refreshToken = ref(localStorage.getItem("refreshToken") || "");
  const lastActivity = ref(parseInt(localStorage.getItem("lastActivity") || "0"));
  const isRefreshing = ref(false);
  const csrfToken = ref(generateCSRFToken());
  const sessionId = ref(localStorage.getItem("sessionId") || "");

  const isAuthenticated = computed(() => {
    return !!token.value && !!sessionId.value;
  });

  const userRole = computed(() => user.value?.role || null);

  async function refreshAccessToken() {
    if (!refreshToken.value) {
      throw new Error("No refresh token available");
    }
    try {
      // Use live backend refresh endpoint
      const response = await post("/api/auth/refresh", {
        refreshToken: refreshToken.value,
      });
      if (response.token) {
        setTokens(response.token, response.refreshToken || refreshToken.value);
        return response.token;
      } else {
        throw new Error("Invalid refresh response");
      }
    } catch (error) {
      logout();
      throw error;
    }
  }

  async function login(credentials) {
    try {
      console.log("Sending login request with:", {
        email: credentials.email,
        mot_de_passe: credentials.password,
      });

      // Use live backend login endpoint with absolute path
      const response = await post("/api/auth/login", {
        email: credentials.email,
        mot_de_passe: credentials.password,
      });

      console.log("Login response received:", response);

      if (
        response.message === "Connexion réussie." &&
        response.token &&
        response.utilisateur
      ) {
        console.log("Login successful, setting tokens...");

        // Store the token sent by backend
        setTokens(response.token, response.refreshToken || "");

        const utilisateur = response.utilisateur;
        sessionId.value = "session-" + Date.now();
        user.value = utilisateur;

        localStorage.setItem("sessionId", sessionId.value);
        localStorage.setItem("user", JSON.stringify(utilisateur));
        updateLastActivity();

        csrfToken.value = generateCSRFToken();

        console.log("User stored:", utilisateur);
        console.log("Token stored:", response.token);

        // Redirect based on role:
        switch (utilisateur.role) {
          case "etudiant":
            router.push("/student-dashboard");
            break;
          case "enseignant":
            router.push("/prof-dashboard");
            break;
          case "administrateur":
            router.push("/admin-dashboard");
            break;
          default:
            console.log("Unknown role:", utilisateur.role);
            router.push("/unauthorized");
        }
      } else {
        console.error("Invalid response structure:", response);
        throw new Error("Erreur de connexion: réponse invalide");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  }

  function setTokens(newToken, newRefreshToken) {
    token.value = newToken;
    refreshToken.value = newRefreshToken;

    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    updateLastActivity();
  }

  function logout() {
    // Call live backend logout endpoint
    post("/api/auth/logout", {
      sessionId: sessionId.value,
      csrfToken: csrfToken.value,
    }).catch(console.error);

    token.value = "";
    user.value = null;
    refreshToken.value = "";
    lastActivity.value = 0;
    sessionId.value = "";
    csrfToken.value = generateCSRFToken();

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("lastActivity");
    localStorage.removeItem("sessionId");

    router.push("/login");
  }

  function updateLastActivity() {
    lastActivity.value = Date.now();
    localStorage.setItem("lastActivity", lastActivity.value.toString());
  }

  function initializeAuth() {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedRefreshToken = localStorage.getItem("refreshToken");
    const savedLastActivity = localStorage.getItem("lastActivity");

    if (savedToken && savedUser && savedRefreshToken && savedLastActivity) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
      refreshToken.value = savedRefreshToken;
      lastActivity.value = parseInt(savedLastActivity);
    }
  }

  async function checkEmail(email) {
    try {
      const response = await post("/api/auth/check-email", { email });
      // Expecting response: { exists: true/false }
      return response.exists;
    } catch (error) {
      throw error;
    }
  }

  async function sendPasswordReset(email) {
    try {
      await post("/api/auth/send-password-reset", { email });
      // No return value needed, just success or failure
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

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
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
    validatePasswordStrength,
  };
});
