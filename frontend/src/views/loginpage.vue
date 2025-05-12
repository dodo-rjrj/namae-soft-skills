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
              <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required class="w-full border p-2 rounded" />
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
    @click.prevent="isTutorMode = !isTutorMode"
    class="text-sm px-4 py-1 rounded-full font-semibold text-white transition whitespace-nowrap"
    style="background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);"
  >
    {{ isTutorMode ? 'Mode Étudiant' : 'Espace Tuteur' }}
  </button>
</div>


           <router-link to="/forgot-password" class="text-sm text-blue-600 block text-right mb-4">Mot de passe oublié ?</router-link>

            <button type="submit" class="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 rounded hover:opacity-90 transition">
              <span v-if="isLoading" class="loader"></span>
              <span v-else>Se connecter</span>
            </button>
          </form>

          <!-- Formulaire Tuteur -->
          <div v-else class="tutor-form space-y-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">Connexion Tuteur</h3>
              <button 
                @click.prevent="isTutorMode = false"
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
            <button @click="handleTutorLogin" class="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 rounded hover:opacity-90 transition">
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
<button class="flex items-center gap-2 text-white px-4 py-2 rounded-full shadow hover:opacity-90 transition"
        style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);">
  <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24">
    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zM12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 2c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm4.5-2a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
  </svg>
  Instagram
</button>


              <!-- LinkedIn -->
              <button class="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-full shadow hover:bg-blue-800 transition">
                <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M4.98 3.5C3.33 3.5 2 4.82 2 6.48c0 1.65 1.33 2.98 2.98 2.98 1.64 0 2.97-1.33 2.97-2.98C7.95 4.82 6.62 3.5 4.98 3.5zM2.4 20.5h5.18V9.98H2.4V20.5zM9.56 9.98v10.52h5.17v-5.63c0-3.07 3.67-3.32 3.67 0v5.63h5.17v-6.04c0-5.58-6.02-5.37-7.37-2.63V9.98H9.56z"/></svg>
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
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    getParticleStyle() {
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
        console.log('Login avec:', { 
          email: this.email, 
          password: this.password,
          rememberMe: this.rememberMe
        })
        
        await authStore.login({
          email: this.email,
          password: this.password
        })
        
        // The router.push is handled in the auth store
      } catch (error) {
        console.error('Erreur de connexion:', error)
        this.errors.password = 'Email ou mot de passe incorrect'
      } finally {
        this.isLoading = false
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
      console.log('Connexion tuteur :', this.tutor)
      alert('Bienvenue, Tuteur ' + this.tutor.nom + ' !')
    }
  }
}
</script>
<style scoped>
  .login-container {
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
    position: relative;
    overflow: hidden;
  }
  
  .login-card {
    display: flex;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 900px;
    height: auto;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
  
  .skills-illustration {
    flex: 1;
    background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
    padding: 1.5rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
  }
  
  .particle {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    animation: floatParticle linear infinite;
  }
  
  @keyframes floatParticle {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
  }
  
  .waves-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
  }
  
  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18.17 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" fill="%23ffffff" fill-opacity="0.1"/></svg>') repeat-x;
    background-size: 1000px 100%;
    animation: wave linear infinite;
  }
  
  .wave1 { opacity: 0.3; animation-duration: 20s; bottom: -10%; }
  .wave2 { opacity: 0.2; animation-duration: 15s; bottom: -20%; animation-delay: -5s; }
  .wave3 { opacity: 0.1; animation-duration: 30s; bottom: -30%; animation-delay: -2s; }
  
  @keyframes wave {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  .floating-circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .floating-circle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
    animation: floatCircle ease-in-out infinite;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  @keyframes floatCircle {
    0% { transform: translate(calc(-50% + 0px), calc(-50% + 0px)); }
    25% { transform: translate(calc(-50% + 15px), calc(-50% - 15px)); }
    50% { transform: translate(calc(-50% - 8px), calc(-50% + 8px)); }
    75% { transform: translate(calc(-50% - 15px), calc(-50% - 8px)); }
    100% { transform: translate(calc(-50% + 0px), calc(-50% + 0px)); }
  }
  
  .skills-tagline {
    margin-top: 1rem;
    text-align: center;
    color: white;
    position: relative;
    z-index: 2;
  }
  
  .skills-tagline h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .skills-tagline p {
    font-size: 0.8rem;
    opacity: 0.9;
  }
  
  .login-form {
    flex: 1.2;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
  }
  
  .title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #424242;
    margin-bottom: 0.4rem;
  }
  
  .highlight {
    background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .subtitle {
    color: #666;
    margin-bottom: 1.5rem;
    font-size: 0.85rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.4rem;
    font-weight: 500;
    color: #555;
    font-size: 0.85rem;
  }
  
  .input-wrapper {
    position: relative;
  }
  
  input {
    width: 100%;
    padding: 0.6rem 0.8rem;
    padding-right: 2.2rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: all 0.2s;
  }
  
  input:focus {
    outline: none;
    border-color: #00bcd4;
    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.1);
  }
  
  .input-icon {
    position: absolute;
    right: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
    font-size: 0.9rem;
  }
  
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.8rem;
  }
  
  .checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }
  
  .checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  .checkmark {
    height: 16px;
    width: 16px;
    background-color: #eee;
    border-radius: 4px;
    margin-right: 6px;
    position: relative;
  }
  
  .checkbox-container:hover input ~ .checkmark {
    background-color: #ccc;
  }
  
  .checkbox-container input:checked ~ .checkmark {
    background-color: #00bcd4;
  }
  
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 5px;
    top: 2px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  
  .checkbox-container input:checked ~ .checkmark:after {
    display: block;
  }
  
  .forgot-password {
    color: #7e57c2;
    text-decoration: none;
    font-size: 0.8rem;
  }
  
  .forgot-password:hover {
    text-decoration: underline;
  }
  
  .login-button {
    width: 100%;
    padding: 0.65rem;
    background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .login-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(0, 188, 212, 0.3);
  }
  
  .loader {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }
  
  .social-login {
    margin-top: 1.5rem;
  }
  
  .divider {
    text-align: center;
    position: relative;
    margin: 1rem 0;
    color: #999;
    font-size: 0.8rem;
  }
  
  .divider::before,
  .divider::after {
    content: "";
    position: absolute;
    top: 50%;
    width: calc(50% - 50px);
    height: 1px;
    background-color: #ddd;
  }
  
  .divider::before { left: 0; }
  .divider::after { right: 0; }
  
  .social-buttons {
    display: flex;
    gap: 0.8rem;
  }
  
  .social-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: white;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .social-button:hover {
    background-color: #f9f9f9;
    transform: translateY(-1px);
  }
  
  .signup-link {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.8rem;
    color: #666;
  }
  
  .signup-link a {
    color: #ffab00;
    font-weight: 600;
    text-decoration: none;
  }
  
  .error-message {
    color: #e53e3e;
    font-size: 0.75rem;
    margin-top: 0.2rem;
  }
  
  .input-error {
    border-color: #e53e3e;
  }
  
  .tutor-toggle-button {
    background-color: #e0f0ff;
    border: 2px solid #007bff;
    color: #007bff;
    padding: 8px 16px;
    font-weight: 600;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: background-color 0.2s;
  }
  
  .tutor-toggle-button:hover {
    background-color: #cce4ff;
  }
  
  .tutor-title {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 768px) {
    .login-card {
      flex-direction: column;
      max-height: none;
    }
    
    .skills-illustration {
      padding: 1.5rem 1rem;
    }
    
    .login-form {
      padding: 1.5rem;
    }
    
    .skills-tagline h2 {
      font-size: 1.1rem;
    }
    
    .skills-tagline p {
      font-size: 0.75rem;
    }
  }
  
</style>