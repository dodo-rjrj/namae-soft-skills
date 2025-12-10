import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { post } from "../services/api";
import router from "../router";
import { generateCSRFToken } from "../utils/security";

// Mock data pour l'équipe
const MOCK_USERS = [
  {
    id: 1,
    email: "etudiant@test.com",
    mot_de_passe: "Password123!",
    nom: "Dupont",
    prenom: "Jean",
    role: "etudiant",
    telephone: "0123456789"
  },
  {
    id: 2,
    email: "prof@test.com",
    mot_de_passe: "Password123!",
    nom: "Martin",
    prenom: "Marie",
    role: "enseignant",
    telephone: "0123456790"
  },
  {
    id: 3,
    email: "admin@test.com",
    mot_de_passe: "Password123!",
    nom: "Durand",
    prenom: "Pierre",
    role: "administrateur",
    telephone: "0123456791"
  },
  {
    id: 4,
    email: "tuteur@test.com",
    mot_de_passe: "Password123!",
    nom: "Moreau",
    prenom: "Sophie",
    role: "proffesionnel",
    telephone: "0123456792"
  }
];

// Variable pour activer/désactiver le mode mock
const USE_MOCK_DATA = false; // Changez à false quand vous voulez utiliser la vraie API

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

  // Fonction pour simuler une réponse API
  function mockApiResponse(data, delay = 500) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), delay);
    });
  }

  // Fonction pour générer un token factice
  function generateMockToken(userId) {
    return `mock_token_${userId}_${Date.now()}`;
  }

  async function refreshAccessToken() {
    if (!refreshToken.value) {
      throw new Error("No refresh token available");
    }

    try {
      if (USE_MOCK_DATA) {
        // Mock refresh token
        const mockResponse = await mockApiResponse({
          token: generateMockToken(user.value?.id || 1),
          refreshToken: `mock_refresh_${Date.now()}`
        });
        
        if (mockResponse.token) {
          setTokens(mockResponse.token, mockResponse.refreshToken);
          return mockResponse.token;
        }
      } else {
        // Vraie API
        const response = await post("/api/auth/refresh", {
          refreshToken: refreshToken.value,
        });
        if (response.token) {
          setTokens(response.token, response.refreshToken || refreshToken.value);
          return response.token;
        }
      }
      
      throw new Error("Invalid refresh response");
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

      let response;

      if (USE_MOCK_DATA) {
        // Mode Mock - Simulation de connexion
        console.log("🔧 Mode MOCK activé - Simulation de connexion");
        
        // Chercher l'utilisateur dans les données mock
        const mockUser = MOCK_USERS.find(
          u => u.email === credentials.email && u.mot_de_passe === credentials.password
        );

        if (mockUser) {
          // Simuler un délai de réseau
          await new Promise(resolve => setTimeout(resolve, 800));
          
          response = {
            message: "Connexion réussie.",
            token: generateMockToken(mockUser.id),
            refreshToken: `mock_refresh_${mockUser.id}_${Date.now()}`,
            utilisateur: {
              id: mockUser.id,
              email: mockUser.email,
              nom: mockUser.nom,
              prenom: mockUser.prenom,
              role: mockUser.role,
              telephone: mockUser.telephone
            }
          };
          
          console.log("✅ Mock login successful:", response);
        } else {
          throw new Error("Email ou mot de passe incorrect");
        }
      } else {
        // Mode réel - API Backend
        console.log("🌐 Mode RÉEL - Connexion à l'API");
        response = await post("/api/auth/login", {
          email: credentials.email,
          mot_de_passe: credentials.password,
        });
      }

      console.log("Login response received:", response);

      if (
        response.message === "Connexion réussie." &&
        response.token &&
        response.utilisateur
      ) {
        console.log("Login successful, setting tokens...");

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

        // Redirect based on role
        switch (utilisateur.role) {
          case "etudiant":
            router.push("/student-dashboard");
            break;
          case "enseignant":
            router.push("/prof-dashboard");
            break;
          case "administrateur":
            router.push("/admin-student-management");
            break;
          case "proffesionnel":
            router.push("/tuteur");
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
    if (USE_MOCK_DATA) {
      console.log("🔧 Mock logout");
    } else {
      // Call live backend logout endpoint
      post("/api/auth/logout", {
        sessionId: sessionId.value,
        csrfToken: csrfToken.value,
      }).catch(console.error);
    }

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
      if (USE_MOCK_DATA) {
        // Mock check email
        await mockApiResponse({}, 300);
        const exists = MOCK_USERS.some(u => u.email === email);
        return exists;
      } else {
        const response = await post("/api/auth/check-email", { email });
        return response.exists;
      }
    } catch (error) {
      throw error;
    }
  }

  async function sendPasswordReset(email) {
    try {
      if (USE_MOCK_DATA) {
        // Mock password reset
        console.log("🔧 Mock: Envoi email de réinitialisation à", email);
        await mockApiResponse({}, 1000);
        return;
      } else {
        await post("/api/auth/send-password-reset", { email });
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

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  }

  // Fonction utilitaire pour obtenir les utilisateurs de test
  function getMockUsers() {
    return MOCK_USERS;
  }

  // Fonction pour basculer entre mock et réel
  function toggleMockMode() {
    USE_MOCK_DATA = !USE_MOCK_DATA;
    console.log(`Mode ${USE_MOCK_DATA ? 'MOCK' : 'RÉEL'} activé`);
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
    getMockUsers,
    toggleMockMode,
  };
});