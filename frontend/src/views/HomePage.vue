<template>
    <div class="home-container">
      <!-- Navigation -->
      <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
        <div class="container">
          <div class="logo">
            <span class="logo-text">SoftSkills</span>
          </div>     
          <div class="nav-links" :class="{ 'active': mobileMenuOpen }">
            <a href="#about" @click="closeMobileMenu">À propos</a>
            <a href="#features" @click="closeMobileMenu">Fonctionnalités</a>
            <a href="#testimonials" @click="closeMobileMenu">Témoignages</a>
            <a href="#faq" @click="closeMobileMenu">FAQ</a>
            <a href="/login" class="nav-button highlight-button"><span class="connect-text">Se connecter</span></a>
          </div>
          <div class="mobile-toggle" @click="toggleMobileMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>    
        </div>
      </nav>
  
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">Développez vos <span class="highlight">soft skills</span>, transformez votre carrière</h1>
            <p class="hero-subtitle">La plateforme d'apprentissage <span class="free-badge">100% GRATUITE</span> qui vous aide à maîtriser les compétences interpersonnelles essentielles pour réussir professionnellement</p>
            <div class="hero-buttons">
              <a href="#features" class="primary-button">Découvrir</a>
              <a href="/signup" class="secondary-button">S'inscrire maintenant</a>
            </div>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">15K+</span>
                <span class="stat-label">Utilisateurs</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">Compétences</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">100%</span>
                <span class="stat-label">Gratuit</span>
              </div>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2027%20avr.%202025%2C%2017_56_05-VHDqoOMohrv2H5TSyueeZXGdtywZkJ.png" alt="Professionnels développant leurs soft skills" class="main-image" />
            <div class="floating-card card-1">
              <div class="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>
              </div>
              <div class="card-text">Communication</div>
            </div>
            <div class="floating-card card-2">
              <div class="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div class="card-text">Collaboration</div>
            </div>
          </div>
        </div>
        <div class="hero-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
  
      <!-- About Section -->
      <section id="about" class="about-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Pourquoi les soft skills sont essentielles</h2>
            <p class="section-subtitle">Dans un monde professionnel en constante évolution, les compétences techniques ne suffisent plus</p>
          </div>
          <div class="about-content">
            <div class="about-image">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2027%20avr.%202025%2C%2017_56_05-VHDqoOMohrv2H5TSyueeZXGdtywZkJ.png" alt="Importance des soft skills" class="about-collage" />
            </div>
            <div class="about-text">
              <div class="about-item" v-for="(item, index) in aboutItems" :key="index">
                <div class="about-icon">
                  <span v-html="item.icon"></span>
                </div>
                <div class="about-info">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Features Section -->
      <section id="features" class="features-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Comment SoftSkills transforme votre apprentissage</h2>
            <p class="section-subtitle">Une approche innovante et <span class="free-badge-light">100% GRATUITE</span> pour développer vos compétences interpersonnelles</p>
          </div>
          <div class="features-grid">
            <div class="feature-card" v-for="(feature, index) in features" :key="index">
              <div class="feature-icon" v-html="feature.icon"></div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </div>
        </div>
        <div class="features-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f9f9f9" fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
  
      <!-- How It Works Section -->
      <section class="how-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Comment ça marche</h2>
            <p class="section-subtitle">Un parcours d'apprentissage personnalisé en 4 étapes simples</p>
          </div>
          <div class="steps-container">
            <div class="step-item" v-for="(step, index) in steps" :key="index">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-description">{{ step.description }}</p>
              </div>
            </div>
          </div>
          <div class="how-image">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2027%20avr.%202025%2C%2017_56_05-VHDqoOMohrv2H5TSyueeZXGdtywZkJ.png" alt="Plateforme SoftSkills en action" class="how-collage" />
          </div>
        </div>
      </section>
  
      <!-- Testimonials Section -->
      <section id="testimonials" class="testimonials-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Ce que nos utilisateurs disent</h2>
            <p class="section-subtitle">Découvrez comment SoftSkills a transformé leur carrière</p>
          </div>
          <div class="testimonials-slider">
            <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
              <div class="testimonial-content">
                <div class="testimonial-rating">
                  <span v-for="n in 5" :key="n" class="star">★</span>
                </div>
                <p class="testimonial-text">"{{ testimonial.text }}"</p>
                <div class="testimonial-author">
                  <img :src="testimonial.image" :alt="testimonial.name" class="author-image" />
                  <div class="author-info">
                    <h4 class="author-name">{{ testimonial.name }}</h4>
                    <p class="author-position">{{ testimonial.position }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="testimonials-nav">
            <button class="nav-button prev" @click="prevTestimonial">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div class="testimonials-dots">
              <span v-for="(_, index) in testimonials" :key="index" class="dot" :class="{ active: currentTestimonial === index }" @click="setTestimonial(index)"></span>
            </div>
            <button class="nav-button next" @click="nextTestimonial">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </section>
  
      <!-- Skills Section -->
      <section class="skills-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Les compétences que vous développerez</h2>
            <p class="section-subtitle">Plus de 50 soft skills essentielles pour votre réussite professionnelle</p>
          </div>
          <div class="skills-grid">
            <div class="skill-category" v-for="(category, index) in skillCategories" :key="index">
              <h3 class="category-title">{{ category.title }}</h3>
              <ul class="skills-list">
                <li v-for="(skill, skillIndex) in category.skills" :key="skillIndex">
                  <span class="skill-icon" v-html="skill.icon"></span>
                  {{ skill.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="skills-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fill-opacity="1" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
  
      <!-- FAQ Section -->
      <section id="faq" class="faq-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Questions fréquentes</h2>
            <p class="section-subtitle">Tout ce que vous devez savoir sur SoftSkills</p>
          </div>
          <div class="faq-container">
            <div class="faq-item" v-for="(item, index) in faqItems" :key="index" :class="{ 'active': activeFaq === index }">
              <div class="faq-question" @click="toggleFaq(index)">
                <h3>{{ item.question }}</h3>
                <span class="faq-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </div>
              <div class="faq-answer" :style="{ maxHeight: activeFaq === index ? '500px' : '0' }">
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-title">Prêt à développer vos soft skills?</h2>
            <p class="cta-subtitle">Rejoignez plus de 15 000 professionnels qui transforment leur carrière <span class="free-badge-light">GRATUITEMENT</span></p>
            <div class="cta-buttons">
              <a href="/signup" class="cta-button primary">Commencer maintenant</a>
              <a href="#features" class="cta-button secondary">En savoir plus</a>
            </div>
          </div>
        </div>
        <div class="cta-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f9f9f9" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-logo">
              <span class="logo-text">SoftSkills</span>
              <p class="footer-tagline">Développez vos compétences interpersonnelles, transformez votre carrière</p>
              <div class="free-badge-large">100% GRATUIT</div>
              <div class="social-links">
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
            <div class="footer-links">
              <div class="footer-column">
                <h4>Produit</h4>
                <ul>
                  <li><a href="#features">Fonctionnalités</a></li>
                  <li><a href="#testimonials">Témoignages</a></li>
                  <li><a href="#faq">FAQ</a></li>
                </ul>
              </div>
              <div class="footer-column">
                <h4>Ressources</h4>
                <ul>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Guides</a></li>
                  <li><a href="#">Événements</a></li>
                </ul>
              </div>
              <div class="footer-column">
                <h4>Entreprise</h4>
                <ul>
                  <li><a href="#">À propos</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Partenaires</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; {{ new Date().getFullYear() }} SoftSkills. Tous droits réservés.</p>
            <div class="language-selector">
              <select>
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    data() {
      return {
        isScrolled: false,
        mobileMenuOpen: false,
        currentTestimonial: 0,
        activeFaq: null,
        aboutItems: [
          {
            title: 'Avantage concurrentiel',
            description: '76% des recruteurs considèrent les soft skills comme plus importantes que les compétences techniques pour les postes de leadership.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>'
          },
          {
            title: 'Adaptabilité au changement',
            description: 'Dans un monde en constante évolution, les soft skills vous permettent de vous adapter rapidement aux nouvelles situations et technologies.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>'
          },
          {
            title: 'Collaboration efficace',
            description: 'Les équipes avec de fortes soft skills sont 50% plus productives et génèrent 25% plus d\'innovation que les autres.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
          },
          {
            title: 'Progression de carrière',
            description: '89% des échecs professionnels sont attribués à un manque de soft skills plutôt qu\'à des lacunes techniques.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path><path d="M17 20V8"></path><path d="M22 4v16"></path></svg>'
          }
        ],
        features: [
          {
            title: 'Évaluations personnalisées',
            description: 'Identifiez vos forces et axes d\'amélioration grâce à nos évaluations basées sur des données scientifiques.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>'
          },
          {
            title: 'Parcours d\'apprentissage',
            description: 'Suivez des parcours adaptés à votre profil et à vos objectifs professionnels.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>'
          },
          {
            title: 'Exercices pratiques',
            description: 'Mettez en pratique vos compétences avec des exercices interactifs et des simulations réalistes.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m16 12-4 4-4-4"></path><path d="M12 8v8"></path></svg>'
          },
          {
            title: 'Communauté active',
            description: 'Échangez avec d\'autres apprenants et experts pour partager vos expériences et bonnes pratiques.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path></svg>'
          },
          {
            title: 'Suivi de progression',
            description: 'Visualisez votre évolution et identifiez vos prochains objectifs grâce à des tableaux de bord intuitifs.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-6"></path></svg>'
          },
          {
            title: 'Ressources gratuites',
            description: 'Accédez à une bibliothèque complète de ressources pour approfondir vos connaissances et compétences.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
          }
        ],
        steps: [
          {
            title: 'Évaluation initiale',
            description: 'Commencez par une évaluation complète de vos soft skills actuelles pour identifier vos forces et axes d\'amélioration.'
          },
          {
            title: 'Plan personnalisé',
            description: 'Recevez un plan d\'apprentissage sur mesure basé sur vos résultats et vos objectifs professionnels.'
          },
          {
            title: 'Apprentissage actif',
            description: 'Suivez des modules interactifs, participez à des exercices pratiques et bénéficiez de retours personnalisés.'
          },
          {
            title: 'Application et suivi',
            description: 'Mettez en pratique vos nouvelles compétences dans votre environnement professionnel et suivez votre progression.'
          }
        ],
        testimonials: [
          {
            text: 'SoftSkills a complètement transformé ma façon de communiquer avec mon équipe. Grâce aux exercices pratiques, j\'ai pu développer mon leadership et obtenir une promotion que je visais depuis longtemps.',
            name: 'Sophie Martin',
            position: 'Directrice Marketing, TechCorp',
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2027%20avr.%202025%2C%2017_56_05-VHDqoOMohrv2H5TSyueeZXGdtywZkJ.png'
          },
          {
            text: 'En tant que développeur, j\'ai toujours excellé dans les compétences techniques, mais je manquais de confiance dans mes interactions professionnelles. SoftSkills m\'a aidé à développer mon intelligence émotionnelle et ma communication.',
            name: 'Thomas Dubois',
            position: 'Chef de Projet IT, InnoSoft',
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2027%20avr.%202025%2C%2017_56_05-VHDqoOMohrv2H5TSyueeZXGdtywZkJ.png'
          },
          {
            text: 'J\'étais sceptique au début, mais les résultats parlent d\'eux-mêmes. En 3 mois, j\'ai amélioré ma capacité à gérer les conflits et à négocier efficacement. Mon équipe est plus productive et l\'ambiance de travail s\'est considérablement améliorée.',
            name: 'Émilie Lefèvre',
            position: 'Responsable RH, GlobalRetail',
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2027%20avr.%202025%2C%2017_56_05-VHDqoOMohrv2H5TSyueeZXGdtywZkJ.png'
          }
        ],
        skillCategories: [
          {
            title: 'Communication',
            skills: [
              { name: 'Communication orale', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path></svg>' },
              { name: 'Communication écrite', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>' },
              { name: 'Écoute active', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10a8 8 0 0 1 16 0"></path><path d="M12 10v10"></path><path d="M8 16a4 4 0 0 1 8 0"></path></svg>' },
              { name: 'Feedback constructif', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>' }
            ]
          },
          {
            title: 'Leadership',
            skills: [
              { name: 'Prise de décision', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>' },
              { name: 'Délégation', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>' },
              { name: 'Motivation d\'équipe', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>' },
              { name: 'Gestion de conflits', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"></line></svg>' }
            ]
          },
          {
            title: 'Intelligence émotionnelle',
            skills: [
              { name: 'Empathie', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>' },
              { name: 'Conscience de soi', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="16"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>' },
              { name: 'Gestion des émotions', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 15h8"></path><path d="M8 9h2"></path><path d="M14 9h2"></path></svg>' },
              { name: 'Relations interpersonnelles', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"></path><path d="M15 12V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v7"></path><path d="M9 12h12"></path><path d="M9 16h9"></path></svg>' }
            ]
          }
        ],
        faqItems: [
          {
            question: 'Qu\'est-ce que SoftSkills exactement ?',
            answer: 'SoftSkills est une plateforme d\'apprentissage en ligne GRATUITE dédiée au développement des compétences interpersonnelles (soft skills). Nous proposons des évaluations personnalisées, des parcours d\'apprentissage adaptés et des exercices pratiques pour vous aider à progresser dans votre vie professionnelle.'
          },
          {
            question: 'Comment l\'application peut-elle être entièrement gratuite ?',
            answer: 'Notre mission est de rendre le développement des soft skills accessible à tous. Nous sommes financés par des partenaires et sponsors qui partagent notre vision d\'un monde professionnel où chacun peut développer son plein potentiel, indépendamment de ses moyens financiers.'
          },
          {
            question: 'Combien de temps faut-il pour voir des résultats ?',
            answer: 'La plupart de nos utilisateurs constatent des améliorations mesurables dans leurs compétences après 4 à 6 semaines d\'utilisation régulière. Cependant, comme pour tout apprentissage, les résultats varient selon l\'investissement personnel et la pratique. Nos outils de suivi vous permettent de mesurer votre progression tout au long de votre parcours.'
          },
          {
            question: 'Les certificats sont-ils reconnus par les employeurs ?',
            answer: 'Oui, nos certificats sont reconnus par plus de 500 entreprises partenaires. Ils attestent de compétences réelles et mesurables, ce qui les rend particulièrement valorisés sur le marché du travail. Vous pouvez les ajouter à votre CV et à votre profil LinkedIn.'
          },
          {
            question: 'Puis-je accéder à la plateforme sur mobile ?',
            answer: 'Absolument ! SoftSkills est entièrement responsive et disponible sur tous les appareils. Nous proposons également des applications dédiées pour iOS et Android, vous permettant d\'apprendre même hors connexion.'
          },
          {
            question: 'Y a-t-il des fonctionnalités payantes cachées ?',
            answer: 'Non, absolument pas. Toutes les fonctionnalités de SoftSkills sont 100% gratuites. Nous croyons fermement que le développement personnel et professionnel devrait être accessible à tous, sans barrière financière.'
          }
        ]
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        this.isScrolled = window.scrollY > 50
      },
      toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen
      },
      closeMobileMenu() {
        this.mobileMenuOpen = false
      },
      prevTestimonial() {
        this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length
      },
      nextTestimonial() {
        this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length
      },
      setTestimonial(index) {
        this.currentTestimonial = index
      },
      toggleFaq(index) {
        this.activeFaq = this.activeFaq === index ? null : index
      }
    }
  }
  </script>
  
  <style scoped>
  /* Base Styles */
  .home-container {
    font-family: 'Inter', sans-serif;
    color: #424242;
    line-height: 1.6;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  section {
    padding: 5rem 0;
    position: relative;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #424242;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
    color: #666;
    max-width: 700px;
    margin: 0 auto;
  }
  
  .highlight {
    background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .free-badge {
    display: inline-block;
    background: #ffab00;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 700;
    margin-left: 0.5rem;
    animation: pulse 2s infinite;
  }
  
  .free-badge-light {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.2rem 0.6rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 700;
    margin-left: 0.5rem;
  }
  
  .free-badge-large {
    display: inline-block;
    background: #ffab00;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 700;
    margin-top: 1rem;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  
  /* Navigation */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 1rem 0;
    transition: all 0.3s ease;
  }
  
  .navbar-scrolled {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 0.7rem 0;
  }
  
  .navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  .logo-text {
    background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  
  .nav-links a {
    color: #424242;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
  }
  
  .nav-links a:hover {
    color: #00bcd4;
  }
  
  .nav-button {
    background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
    color: white !important;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    transition: all 0.3s;
  }
  
  .highlight-button {
    background: white;
    color: #0066cc !important;
    font-weight: 700;
    border: 2px solid #0066cc;
    box-shadow: 0 4px 10px rgba(0, 102, 204, 0.3);
    animation: pulse 2s infinite;
  }
  
  .highlight-button:hover {
    background: #0066cc;
    color: white !important;
    box-shadow: 0 4px 15px rgba(0, 102, 204, 0.4);
  }
  
  .connect-text {
    font-size: 1.05rem;
    letter-spacing: 0.5px;
  }
  
  .nav-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 188, 212, 0.3);
  }
  
  .highlight-button:hover {
    box-shadow: 0 4px 15px rgba(255, 171, 0, 0.4);
  }
  
  .mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
  }
  
  .mobile-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: #424242;
    transition: all 0.3s;
  }
  
  /* Hero Section */
  .hero-section {
    padding: 8rem 0 4rem;
    background: linear-gradient(135deg, #f9f9f9 0%, #f5f5f5 100%);
    position: relative;
    overflow: hidden;
  }
  
  .hero-section .container {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  
  .hero-content {
    flex: 1;
  }
  
  .hero-title {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }
  
  .hero-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .primary-button {
    background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
    color: white;
    padding: 0.8rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s;
    display: inline-block;
  }
  
  .primary-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 188, 212, 0.4);
  }
  
  .secondary-button {
    background: transparent;
    color: #424242;
    padding: 0.8rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    border: 2px solid #ddd;
    transition: all 0.3s;
    display: inline-block;
  }
  
  .secondary-button:hover {
    border-color: #00bcd4;
    color: #00bcd4;
  }
  
  .hero-stats {
    display: flex;
    gap: 2rem;
  }
  
  .stat-item {
    display: flex;
    flex-direction: column;
  }
  
  .stat-number {
    font-size: 1.8rem;
    font-weight: 700;
    color: #00bcd4;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: #666;
  }
  
  .hero-image {
    flex: 1;
    position: relative;
  }
  
  .main-image {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .about-collage, .how-collage {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .floating-card {
    position: absolute;
    background: white;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: float 6s ease-in-out infinite;
  }
  
  .card-1 {
    top: 10%;
    left: -5%;
    animation-delay: 0s;
  }
  
  .card-2 {
    top: 40%;
    right: -5%;
    animation-delay: 1s;
  }
  
  .card-icon {
    color: #00bcd4;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .card-text {
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .hero-wave {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    line-height: 0;
  }
  
  /* About Section */
  .about-section {
    background-color: white;
  }
  
  .about-content {
    display: flex;
    align-items: center;
    gap: 4rem;
  }
  
  .about-image {
    flex: 1;
  }
  
  .about-image img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .about-text {
    flex: 1;
  }
  
  .about-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .about-icon {
    color: #00bcd4;
    flex-shrink: 0;
  }
  
  .about-info h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .about-info p {
    color: #666;
  }
  
  /* Features Section */
  .features-section {
    background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
    color: white;
    position: relative;
  }
  
  .features-section .section-title,
  .features-section .section-subtitle {
    color: white;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .feature-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 2rem;
    transition: all 0.3s;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.2);
  }
  
  .feature-icon {
    color: white;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .feature-title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .feature-description {
    color: rgba(255, 255, 255, 0.8);
  }
  
  .features-wave {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    line-height: 0;
  }
  
  /* How It Works Section */
  .how-section {
    background-color: #f9f9f9;
    padding: 6rem 0;
  }
  
  .steps-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto 4rem;
  }
  
  .step-item {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
  }
  
  .step-number {
    background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  .step-title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .step-description {
    color: #666;
  }
  
  .how-image {
    text-align: center;
  }
  
  .how-image img {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  /* Testimonials Section */
  .testimonials-section {
    background-color: white;
  }
  
  .testimonials-slider {
    display: flex;
    overflow-x: hidden;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .testimonial-card {
    flex: 0 0 100%;
    background: #f9f9f9;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
    transform: translateX(calc(-100% * var(--current-testimonial, 0)));
  }
  
  .testimonial-rating {
    color: #ffab00;
    margin-bottom: 1rem;
  }
  
  .testimonial-text {
    font-style: italic;
    margin-bottom: 1.5rem;
    color: #555;
  }
  
  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .author-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .author-name {
    font-weight: 700;
    margin-bottom: 0.2rem;
  }
  
  .author-position {
    font-size: 0.9rem;
    color: #666;
  }
  
  .testimonials-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  
  .nav-button {
    background: none;
    border: none;
    color: #00bcd4;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .nav-button:hover {
    color: #7e57c2;
  }
  
  .testimonials-dots {
    display: flex;
    gap: 0.5rem;
  }
  
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ddd;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .dot.active {
    background-color: #00bcd4;
  }
  
  /* Skills Section */
  .skills-section {
    background: linear-gradient(135deg, #7e57c2 0%, #00bcd4 100%);
    color: white;
    position: relative;
  }
  
  .skills-section .section-title,
  .skills-section .section-subtitle {
    color: white;
  }
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .category-title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  }
  
  .skills-list {
    list-style: none;
    padding: 0;
  }
  
  .skills-list li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.8rem;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .skill-icon {
    color: white;
  }
  
  .skills-wave {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    line-height: 0;
  }
  
  /* FAQ Section */
  .faq-section {
    background-color: #f9f9f9;
  }
  
  .faq-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .faq-item {
    margin-bottom: 1rem;
    border-radius: 10px;
    overflow: hidden;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .faq-question {
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .faq-question h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }
  
  .faq-icon {
    transition: all 0.3s;
  }
  
  .faq-item.active .faq-icon {
    transform: rotate(180deg);
  }
  
  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .faq-answer p {
    padding: 0 1.5rem 1.5rem;
    margin: 0;
    color: #666;
  }
  
  /* CTA Section */
  .cta-section {
    background: linear-gradient(135deg, #00bcd4 0%, #7e57c2 100%);
    color: white;
    text-align: center;
    position: relative;
  }
  
  .cta-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .cta-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  
  .cta-button {
    padding: 0.8rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s;
  }
  
  .cta-button.primary {
    background: white;
    color: #7e57c2;
  }
  
  .cta-button.secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
  }
  
  .cta-button:hover {
    transform: translateY(-2px);
  }
  
  .cta-button.primary:hover {
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);
  }
  
  .cta-wave {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    line-height: 0;
  }
  
  /* Footer */
  .footer {
    background-color: #f9f9f9;
    padding: 5rem 0 2rem;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    gap: 4rem;
    margin-bottom: 3rem;
  }
  
  .footer-logo {
    flex: 1;
    min-width: 250px;
  }
  
  .footer-tagline {
    color: #666;
    margin: 1rem 0 2rem;
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f1f1f1;
    color: #555;
    transition: all 0.3s;
  }
  
  .social-link:hover {
    background: #00bcd4;
    color: white;
  }
  
  .footer-links {
    flex: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
  
  .footer-column {
    flex: 1;
    min-width: 150px;
  }
  
  .footer-column h4 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  
  .footer-column ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-column li {
    margin-bottom: 0.8rem;
  }
  
  .footer-column a {
    color: #666;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-column a:hover {
    color: #00bcd4;
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid #eee;
    color: #666;
  }
  
  .language-selector select {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: white;
    color: #555;
  }
  
  /* Animations */
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
  
  /* Responsive Styles */
  @media (max-width: 992px) {
    .section-title {
      font-size: 2rem;
    }
    
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-section .container {
      flex-direction: column;
    }
    
    .about-content {
      flex-direction: column;
    }
  }
  
  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      background: white;
      flex-direction: column;
      padding: 2rem;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      transform: translateY(-150%);
      transition: transform 0.3s;
      z-index: 999;
    }
    
    .nav-links.active {
      transform: translateY(0);
    }
    
    .mobile-toggle {
      display: flex;
    }
    
    .hero-buttons {
      flex-direction: column;
    }
    
    .hero-stats {
      flex-direction: column;
      gap: 1rem;
    }
    
    .footer-content {
      flex-direction: column;
      gap: 2rem;
    }
    
    .footer-bottom {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
  </style>