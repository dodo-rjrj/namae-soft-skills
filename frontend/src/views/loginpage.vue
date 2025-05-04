<template>
  <div class="login-container">
    <div class="login-card">
      <div class="skills-illustration">
        <!-- Particules d'arrière-plan améliorées -->
        <div class="particles">
          <div v-for="n in 30" :key="`particle-${n}`" class="particle" :style="getParticleStyle(n)"></div>
        </div>
        
        <!-- Vagues animées -->
        <div class="waves-container">
          <div class="wave wave1"></div>
          <div class="wave wave2"></div>
          <div class="wave wave3"></div>
        </div>
        
        <!-- Cercles lumineux flottants -->
        <div class="floating-circles">
          <div v-for="n in 5" :key="`circle-${n}`" class="floating-circle" :style="getCircleStyle(n)"></div>
        </div>
        
        <div class="skills-tagline">
          <h2>Développez vos compétences essentielles</h2>
          <p>Connectez vos talents et évoluez professionnellement</p>
        </div>
      </div>
      
      <div class="login-form">
        <h1 class="title">Bienvenue sur <span class="highlight">SoftSkills</span></h1>
        <p class="subtitle">Développez vos compétences interpersonnelles et déverrouillez votre potentiel</p>
        
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                required 
                placeholder="votre@email.com"
                :class="{ 'input-error': errors.email }"
              />
              <span class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
            </div>
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <div class="input-wrapper">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password" 
                required 
                placeholder="••••••••"
                :class="{ 'input-error': errors.password }"
              />
              <button 
                type="button" 
                class="input-icon clickable" 
                @click="togglePassword"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              </button>
            </div>
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>
          
          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" v-model="rememberMe">
              <span class="checkmark"></span>
              Se souvenir de moi
            </label>
            <a href="#" class="forgot-password">Mot de passe oublié?</a>
          </div>
          
          <button type="submit" class="login-button" :disabled="isLoading">
            <span v-if="isLoading" class="loader"></span>
            <span v-else>Se connecter</span>
          </button>
        </form>
        
        <div class="social-login">
          <p class="divider"><span>Ou continuer avec</span></p>
          <div class="social-buttons">
            <button class="social-button google">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" x2="12" y1="8" y2="8"/><line x1="3.95" x2="8.54" y1="6.06" y2="14"/><line x1="10.88" x2="15.46" y1="21.94" y2="14"/></svg>
              Google
            </button>
            <button class="social-button linkedin">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </button>
          </div>
        </div>
        
        <p class="signup-link">
          Pas encore de compte? <a href="#">S'inscrire</a>
        </p>
      </div>
    </div>
    
    <div class="skill-quote">
      <blockquote>
        "Les compétences techniques vous font embaucher, les soft skills vous font progresser."
      </blockquote>
    </div>
  </div>
</template>

<script>
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
      }
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    getParticleStyle(index) {
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
        // Simuler une requête API
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Ici, vous intégreriez votre logique d'authentification réelle
        console.log('Login avec:', { 
          email: this.email, 
          password: this.password,
          rememberMe: this.rememberMe 
        })
        
        // Redirection après connexion réussie
        // this.$router.push('/dashboard')
      } catch (error) {
        console.error('Erreur de connexion:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  position: relative;
  overflow: hidden;
}

.login-card {
  display: flex;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.skills-illustration {
  flex: 1;
  /* Palette Vibrante et Énergique - dégradé de cyan à violet */
  background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Particules d'arrière-plan */
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
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(20px);
    opacity: 0;
  }
}

/* Vagues animées */
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
  background-size: 1200px 100%;
  animation: wave linear infinite;
}

.wave1 {
  opacity: 0.3;
  animation-duration: 20s;
  bottom: -10%;
}

.wave2 {
  opacity: 0.2;
  animation-duration: 15s;
  bottom: -20%;
  animation-delay: -5s;
}

.wave3 {
  opacity: 0.1;
  animation-duration: 30s;
  bottom: -30%;
  animation-delay: -2s;
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Cercles lumineux flottants */
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
  0% {
    transform: translate(calc(-50% + 0px), calc(-50% + 0px));
  }
  25% {
    transform: translate(calc(-50% + 20px), calc(-50% - 20px));
  }
  50% {
    transform: translate(calc(-50% - 10px), calc(-50% + 10px));
  }
  75% {
    transform: translate(calc(-50% - 20px), calc(-50% - 10px));
  }
  100% {
    transform: translate(calc(-50% + 0px), calc(-50% + 0px));
  }
}

.skills-tagline {
  margin-top: 2rem;
  text-align: center;
  color: white;
  position: relative;
  z-index: 2;
}

.skills-tagline h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 1s ease;
}

.skills-tagline p {
  font-size: 0.9rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease 0.2s both;
}

.login-form {
  flex: 1.2;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #424242; /* Neutre foncé */
  margin-bottom: 0.5rem;
}

.highlight {
  /* Dégradé de la palette Vibrante et Énergique */
  background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
}

.input-wrapper {
  position: relative;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
}

input:focus {
  outline: none;
  /* Couleur principale de la palette */
  border-color: #00bcd4;
  box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.1);
}

.input-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}

.clickable {
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
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
  height: 18px;
  width: 18px;
  background-color: #eee;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

.checkbox-container input:checked ~ .checkmark {
  /* Couleur principale de la palette */
  background-color: #00bcd4;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-password {
  /* Couleur secondaire de la palette */
  color: #7e57c2;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  /* Dégradé de la palette Vibrante et Énergique */
  background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.login-button:hover {
  transform: translateY(-2px);
  /* Ombre avec la couleur principale */
  box-shadow: 0 5px 15px rgba(0, 188, 212, 0.4);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

.social-login {
  margin-top: 2rem;
}

.divider {
  text-align: center;
  position: relative;
  margin: 1.5rem 0;
  color: #999;
  font-size: 0.85rem;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: calc(50% - 70px);
  height: 1px;
  background-color: #ddd;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background-color: white;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

.social-buttons {
  display: flex;
  gap: 1rem;
}

.social-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.social-button:hover {
  background-color: #f9f9f9;
  transform: translateY(-2px);
}

.google {
  color: #DB4437;
}

.linkedin {
  color: #0077B5;
}

.signup-link {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666;
}

.signup-link a {
  /* Couleur d'accent de la palette */
  color: #ffab00;
  font-weight: 600;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}

.skill-quote {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #555;
  font-style: italic;
  max-width: 80%;
  z-index: 0;
}

.error-message {
  color: #e53e3e;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.input-error {
  border-color: #e53e3e;
}

/* Animations */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
  }
  
  .skills-illustration {
    padding: 2rem 1rem;
  }
  
  .skills-tagline h2 {
    font-size: 1.2rem;
  }
  
  .skills-tagline p {
    font-size: 0.8rem;
  }
  
  .login-form {
    padding: 2rem 1.5rem;
  }
}
</style>