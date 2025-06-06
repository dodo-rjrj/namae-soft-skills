<template>
  <div class="min-h-screen flex flex-col justify-between bg-gray-50">

    <!-- Centre : Carte + Formulaire -->
    <div class="flex-grow flex items-center justify-center">
      <div class="login-card flex flex-col lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-5xl">

        <!-- Illustration -->
        <div class="skills-illustration w-full lg:w-1/2 relative p-6 bg-blue-100">
          <div class="particles">
            <div v-for="n in 30" :key="`particle-${n}`" class="particle" :style="getParticleStyle(n)"></div>
          </div>
          <div class="waves-container">
            <div class="wave wave1"></div>
            <div class="wave wave2"></div>
            <div class="wave wave3"></div>
          </div>
          <div class="floating-circles">
            <div v-for="n in 5" :key="`circle-${n}`" class="floating-circle" :style="getCircleStyle(n)"></div>
          </div>
          <div class="skills-tagline text-center mt-10">
            <h2 class="text-xl font-semibold">Développez vos compétences essentielles</h2>
            <p>Connectez vos talents et évoluez professionnellement</p>
          </div>
        </div>

        <!-- Formulaire -->
        <div class="login-form w-full lg:w-1/2 p-8">
          <h1 class="title text-2xl font-bold mb-2 text-center">
            Bienvenue sur <span class="highlight">SoftSkills</span>
          </h1>
          <p class="subtitle text-center mb-6">Développez vos compétences interpersonnelles et déverrouillez votre potentiel</p>

          <!-- Formulaire Étudiant -->
          <form v-if="!isTutorMode" @submit.prevent="handleLogin">
            <div class="form-group mb-4">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="email" required class="w-full border p-2 rounded" />
              <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
            </div>
            <div class="form-group mb-4">
              <label for="password">Mot de passe</label>
              <div class="relative">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="password" 
                  required 
                  class="w-full border p-2 rounded pr-10" 
                />
                <button 
                  type="button"
                  @click="togglePassword"
                  class="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  👁️
                </button>
              </div>
              <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
            </div>

            <div class="form-options flex justify-between items-center mb-4">
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  v-model="rememberMe" 
                  class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-2" 
                  id="rememberMe"
                />
                <label for="rememberMe" class="text-sm text-gray-700 whitespace-nowrap">
                  Se souvenir de moi
                </label>
              </div>

              <button 
                type="button"
                @click="isTutorMode = !isTutorMode"
                class="text-sm px-4 py-1 rounded-full font-semibold text-white transition whitespace-nowrap"
                style="background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);"
              >
                {{ isTutorMode ? 'Mode Étudiant' : 'Espace Tuteur' }}
              </button>
            </div>

            <router-link to="/forgot-password" class="text-sm text-blue-600 block text-right mb-4">Mot de passe oublié ?</router-link>

            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 rounded hover:opacity-90 transition disabled:opacity-50"
            >
              <span v-if="isLoading" class="loader">Connexion...</span>
              <span v-else>Se connecter</span>
            </button>
          </form>

          <!-- Formulaire Tuteur -->
          <div v-else class="tutor-form space-y-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">Connexion Tuteur</h3>
              <button 
                type="button"
                @click="isTutorMode = false"
                class="text-sm px-4 py-1 rounded-full font-semibold text-white transition whitespace-nowrap"
                style="background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);"
              >
                Retour à l'espace étudiant
              </button>
            </div>
            <div class="form-group">
              <label>Nom</label>
              <input type="text" v-model="tutor.nom" required class="w-full border p-2 rounded" />
            </div>
            <div class="form-group">
              <label>Prénom</label>
              <input type="text" v-model="tutor.prenom" required class="w-full border p-2 rounded" />
            </div>
            <div class="form-group">
              <label>Entreprise</label>
              <input type="text" v-model="tutor.entreprise" required class="w-full border p-2 rounded" />
            </div>
            <div class="form-group">
              <label>Code d'accès</label>
              <input type="text" v-model="tutor.code" required class="w-full border p-2 rounded" />
            </div>
            <button 
              type="button"
              @click="handleTutorLogin" 
              class="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 rounded hover:opacity-90 transition"
            >
              Connexion Tuteur
            </button>
          </div>

          <!-- Réseaux sociaux stylés -->
          <div class="social-login text-center mt-6">
            <div class="flex items-center mb-4">
              <div class="flex-grow h-px bg-gray-300"></div>
              <span class="px-4 text-gray-500 text-sm">Ou continuer avec</span>
              <div class="flex-grow h-px bg-gray-300"></div>
            </div>
            <div class="social-buttons flex justify-center gap-4">
              <!-- Instagram -->
              <button 
                type="button"
                class="flex items-center gap-2 text-white px-4 py-2 rounded-full shadow hover:opacity-90 transition"
                style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);"
              >
                <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zM12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 2c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm4.5-2a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
                </svg>
                Instagram
              </button>

              <!-- LinkedIn -->
              <button 
                type="button"
                class="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-full shadow hover:bg-blue-800 transition"
              >
                <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C3.33 3.5 2 4.82 2 6.48c0 1.65 1.33 2.98 2.98 2.98 1.64 0 2.97-1.33 2.97-2.98C7.95 4.82 6.62 3.5 4.98 3.5zM2.4 20.5h5.18V9.98H2.4V20.5zM9.56 9.98v10.52h5.17v-5.63c0-3.07 3.67-3.32 3.67 0v5.63h5.17v-6.04c0-5.58-6.02-5.37-7.37-2.63V9.98H9.56z"/>
                </svg>
                LinkedIn
              </button>
            </div>
          </div>

          <p class="signup-link text-center mt-4 text-sm">
            Pas encore de compte ? <router-link to="/register" class="text-blue-600">S'inscrire</router-link>
          </p>
        </div>
      </div>
    </div>

    <!-- Citation en bas -->
    <div class="text-center text-gray-500 p-4 text-sm">
      "Les compétences techniques vous font embaucher, les soft skills vous font progresser."
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      isLoading: false,
      errors: {
        email: '',
        password: ''
      },
      isTutorMode: false,
      tutor: {
        nom: '',
        prenom: '',
        entreprise: '',
        code: ''
      }
    }
  },
  mounted() {
    // Vérifier s'il y a un token sauvegardé au chargement de la page
    this.checkSavedToken()
  },
  methods: {
    // Méthode pour vérifier et restaurer un token sauvegardé
    checkSavedToken() {
      try {
        const savedToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
        const savedUser = localStorage.getItem('user_data') || sessionStorage.getItem('user_data')
        
        if (savedToken && savedUser) {
          const authStore = useAuthStore()
          const userData = JSON.parse(savedUser)
          
          // Vérifier si le store a les méthodes nécessaires
          if (typeof authStore.setToken === 'function' && typeof authStore.setUser === 'function') {
            authStore.setToken(savedToken)
            authStore.setUser(userData)
            console.log('Token restauré depuis le stockage local')
          } else {
            // Fallback si les méthodes n'existent pas dans le store
            console.log('Token trouvé mais méthodes du store non disponibles')
          }
        }
      } catch (error) {
        console.error('Erreur lors de la restauration du token:', error)
        this.clearSavedAuth()
      }
    },
    
    // Méthode pour sauvegarder les données d'authentification
    saveAuthData(token, userData, rememberMe = false) {
      try {
        if (rememberMe) {
          // Sauvegarder de façon persistante avec localStorage
          localStorage.setItem('auth_token', token)
          localStorage.setItem('user_data', JSON.stringify(userData))
          localStorage.setItem('remember_me', 'true')
          console.log('Données sauvegardées dans localStorage (persistant)')
        } else {
          // Sauvegarder seulement pour la session avec sessionStorage
          sessionStorage.setItem('auth_token', token)
          sessionStorage.setItem('user_data', JSON.stringify(userData))
          console.log('Données sauvegardées dans sessionStorage (session)')
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error)
      }
    },
    
    // Méthode pour nettoyer les données sauvegardées
    clearSavedAuth() {
      try {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
        localStorage.removeItem('remember_me')
        sessionStorage.removeItem('auth_token')
        sessionStorage.removeItem('user_data')
        console.log('Données d\'authentification supprimées')
      } catch (error) {
        console.error('Erreur lors du nettoyage:', error)
      }
    },
    
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    
    getParticleStyle(n) {
      const size = 2 + Math.random() * 5
      const speed = 15 + Math.random() * 30
      const delay = Math.random() * 5
      const opacity = 0.1 + Math.random() * 0.4
      const top = Math.random() * 100
      const left = Math.random() * 100
      return {
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
        opacity: opacity
      }
    },
    
    getCircleStyle(index) {
      const size = 30 + (index * 15)
      const duration = 15 + (index * 5)
      const delay = index * 2
      const opacity = 0.1 + (0.05 * index)
      return {
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity: opacity
      }
    },
    
    validateForm() {
      let isValid = true
      this.errors.email = ''
      this.errors.password = ''
      
      if (!this.email) {
        this.errors.email = 'L\'email est requis'
        isValid = false
      } else if (!/^\S+@\S+\.\S+$/.test(this.email)) {
        this.errors.email = 'Veuillez entrer un email valide'
        isValid = false
      }
      
      if (!this.password) {
        this.errors.password = 'Le mot de passe est requis'
        isValid = false
      } else if (this.password.length < 6) {
        this.errors.password = 'Le mot de passe doit contenir au moins 6 caractères'
        isValid = false
      }
      
      return isValid
    },
    
    async handleLogin() {
      if (!this.validateForm()) return
      
      this.isLoading = true
      
      try {
        const authStore = useAuthStore()
        console.log('Tentative de connexion avec:', {
          email: this.email,
          rememberMe: this.rememberMe
        })
        
        // Appel de la méthode login du store
        const response = await authStore.login({
          email: this.email,
          password: this.password
        })
        
        console.log('Réponse du serveur:', response)
        
        // Vérifier si la réponse contient les données nécessaires
        if (response) {
          // Différentes structures de réponse possibles
          const token = response.token || response.access_token || response.accessToken
          const user = response.user || response.data || response
          
          if (token && user) {
            // Sauvegarder le token et les données utilisateur
            this.saveAuthData(token, user, this.rememberMe)
            console.log('Connexion réussie et token sauvegardé')
            
            // Redirection selon le rôle
            this.redirectUser(user)
          } else {
            // Si pas de token mais connexion réussie
            console.log('Connexion réussie sans token explicite')
            this.redirectUser(response)
          }
        }
        
      } catch (error) {
        console.error('Erreur de connexion:', error)
        
        // Messages d'erreur plus spécifiques
        if (error.response) {
          const status = error.response.status
          const message = error.response.data?.message || error.response.data?.error
          
          if (status === 401) {
            this.errors.password = 'Email ou mot de passe incorrect'
          } else if (status === 422) {
            this.errors.email = message || 'Données invalides'
          } else {
            this.errors.password = message || 'Une erreur est survenue'
          }
        } else {
          this.errors.password = 'Erreur de connexion. Vérifiez votre connexion internet.'
        }
        
        // Nettoyer les données en cas d'erreur
        this.clearSavedAuth()
      } finally {
        this.isLoading = false
      }
    },
    
    // Méthode pour gérer la redirection
    redirectUser(userData) {
      const role = userData.role || userData.user_type || 'default'
      
      switch (role.toLowerCase()) {
        case 'admin':
        case 'administrateur':
          this.$router.push('/admin/dashboard')
          break
        case 'etudiant':
        case 'student':
          this.$router.push('/etudiant/dashboard')
          break
        case 'tuteur':
        case 'tutor':
          this.$router.push('/tuteur/dashboard')
          break
        default:
          this.$router.push('/dashboard')
      }
    },
    
    // Méthode de déconnexion
    logout() {
      try {
        const authStore = useAuthStore()
        if (typeof authStore.logout === 'function') {
          authStore.logout()
        }
        this.clearSavedAuth()
        this.$router.push('/login')
        console.log('Déconnexion effectuée')
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      }
    },
    
    handleTutorLogin() {
      if (!this.tutor.nom || !this.tutor.prenom || !this.tutor.entreprise || !this.tutor.code) {
        alert('Veuillez remplir tous les champs tuteur.')
        return
      }
      
      if (this.tutor.code !== '123456') {
        alert("Code d'accès invalide.")
        return
      }
      
      try {
        // Créer un token fictif pour le tuteur
        const tutorToken = 'tutor_' + Date.now()
        const tutorData = {
          nom: this.tutor.nom,
          prenom: this.tutor.prenom,
          entreprise: this.tutor.entreprise,
          role: 'tuteur',
          email: `${this.tutor.nom.toLowerCase()}.${this.tutor.prenom.toLowerCase()}@${this.tutor.entreprise.toLowerCase()}.com`
        }
        
        // Sauvegarder les données du tuteur
        this.saveAuthData(tutorToken, tutorData, true)
        
        console.log('Connexion tuteur réussie:', tutorData)
        alert('Bienvenue, Tuteur ' + this.tutor.nom + ' !')
        
        // Redirection vers l'interface tuteur
        this.$router.push('/tuteur/dashboard')
      } catch (error) {
        console.error('Erreur lors de la connexion tuteur:', error)
        alert('Une erreur est survenue lors de la connexion.')
      }
    }
  }
}
</script>

<style scoped>
.loader {
  display: inline-block;
}

.particle {
  position: absolute;
  background: rgba(59, 130, 246, 0.5);
  border-radius: 50%;
  animation: float linear infinite;
}

@keyframes float {
  from {
    transform: translateY(100vh) scale(0);
  }
  to {
    transform: translateY(-100px) scale(1);
  }
}

.floating-circle {
  position: absolute;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  animation: pulse ease-in-out infinite alternate;
}

@keyframes pulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  border-radius: 50%;
  animation: wave 6s ease-in-out infinite;
}

.wave1 { animation-delay: 0s; }
.wave2 { animation-delay: 2s; }
.wave3 { animation-delay: 4s; }

@keyframes wave {
  0%, 100% {
    transform: translateX(-50%) translateY(0px);
  }
  50% {
    transform: translateX(-50%) translateY(-20px);
  }
}
</style>