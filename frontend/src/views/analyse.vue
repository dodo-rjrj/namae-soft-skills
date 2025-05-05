<template>
    <div class="app-container">
      <div class="navbar-container"><Navbar /></div>
      <div class="content-container">
        <div class="sidebar-container"><Sidebare role="student" /></div>
        <div class="main-content">
          <div class="header2 top-header">
            <Welcome name="MANAR" />
            <Total />
          </div>
          
          <!-- Section titre et sélection des compétences -->
          <div class="section-title-container">
            <h1 class="section-title">Bienvenue sur la page d'analyse</h1>
          </div>
          
          <div class="skill-selection-card">
            <h3>Choisissez la soft skill à analyser!</h3>
            <div class="skill-buttons">
              <button 
                v-for="skill in skills" 
                :key="skill.id" 
                class="skill-button" 
                @click="selectSkill(skill)"
              >
                {{ skill.name }}
              </button>
              <button class="add-skill-button">+</button>
            </div>
          </div>
          
          <!-- Contenu d'analyse (affiché après sélection) -->
          <div v-if="selectedSkill" class="analyse-content">
            <h2 class="analyse-title">Voir l'analyse de : "{{ selectedSkill.name }}"</h2>
            
            <!-- Cartes d'analyse -->
            <div class="analyse-cards-container">
              <div class="analyse-card progression-card">
                <h3 class="card-title">Progression dans le temps</h3>
                <div class="chart-container">
                  <div class="chart-line"></div>
                </div>
              </div>
              
              <div class="analyse-card days-card">
                <h3 class="card-title">Jours clés de progression</h3>
                <div class="calendar-grid">
                  <div v-for="day in 20" :key="day" class="calendar-day" :class="{ completed: [4, 8, 12].includes(day) }">
                    {{ day }}
                  </div>
                </div>
              </div>
              
              <div class="analyse-card score-card">
                <h3 class="card-title">Score soft skill</h3>
                <div class="score-circle">
                  <div class="score-value">4.3</div>
                  <div class="score-max">/5</div>
                </div>
              </div>
              
              <div class="analyse-card comparison-card">
                <h3 class="card-title">Votre score vs objectif</h3>
                <div class="bar-chart">
                  <div class="bar current-bar"></div>
                  <div class="bar target-bar"></div>
                </div>
              </div>
            </div>
            
            <!-- Analyse détaillée -->
            <div class="detailed-analyse-container">
              <div class="evolution-card">
                <h3 class="card-title">Évolution d'une soft skill</h3>
                <div class="evolution-chart">
                  <div class="chart-point">
                    <div class="point-value">30%</div>
                    <div class="point-label">Premiers Projets</div>
                  </div>
                  <div class="chart-line-evolution"></div>
                  <div class="chart-point">
                    <div class="point-value">65%</div>
                    <div class="point-label">Dernier Projet</div>
                  </div>
                </div>
              </div>
              
              <div class="comment-card">
                <p class="comment-text">
                  Les pratiques réalisées ont bien évoluées dans votre soft skill. Bravo ! Continuez comme ça et n'hésitez pas à vous fixer de nouveaux objectifs plus ambitieux pour continuer votre progression.
                </p>
                <div class="view-more">
                  <a href="#" class="view-more-link">view more</a>
                </div>
              </div>
            </div>
          </div>
          
          <Footer v-if="selectedSkill" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../store/auth'
  import { useRouter } from 'vue-router'
  import Sidebare from '../components/sidebare.vue'
  import Welcome from '../components/welcome.vue'
  import Total from '../components/scorecard.vue'
  import Navbar from '../components/navbar.vue'
  import Footer from '../components/footer.vue'
  
  const authStore = useAuthStore()
  const router = useRouter()
  const user = authStore.user
  
  const skills = ref([
    { id: 1, name: 'organisation', class: 'organisation' },
    { id: 2, name: 'Motivation', class: 'motivation' },
    { id: 3, name: 'Patience', class: 'patience' },
    { id: 4, name: 'Time-management', class: 'time-management' },
    { id: 5, name: 'problème-solving', class: 'probleme-solving' },
    { id: 6, name: 'creativity', class: 'creativity' }
  ])
  const selectedSkill = ref(null)
  
  const selectSkill = (skill) => {
    selectedSkill.value = skill
    // setTimeout(() => {
    //   const analyseSection = document.querySelector('.analyse-content')
    //   if (analyseSection) {
    //     window.scrollTo({
    //       top: analyseSection.offsetTop - 20,
    //       behavior: 'smooth'
    //     })
    //   }
    // }, 100)
  }
  
  const logout = () => {
    authStore.logout()
    router.push('/')
  }
  </script>
  
  <style scoped>
  /* Structure de base comme dans le dashboard */
  .app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: 'Inter', sans-serif;
    color: #424242;
  }
  
  .navbar-container {
    width: 100%;
  }
  
  .content-container {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
  }
  
  .sidebar-container {
    height: 100%;
  }
  
  .main-content {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem;
    margin-left: 20px;
    background-color: #f5f5f7;
  }
  
  .header2 {
    display: flex;
    align-items: center;
    margin: 1rem;
  }
  
  .top-header {
    width: 100%;
  }
  
  /* Styles spécifiques à la page d'analyse */
  .section-title-container {
    text-align: center;
    margin-bottom: 2rem;
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  .section-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #424242;
    margin: 0;
  }
  
  .skill-selection-card {
    background-color: #fff1f1;
    border-radius: 15px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }
  
  .skill-selection-card h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #424242;
  }
  
  .skill-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .skill-button {
    background-color: #5d4b8c;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 0.5rem 1.2rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .skill-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .add-skill-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #5d4b8c;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-size: 1.5rem;
  }
  
  .analyse-content {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .analyse-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #424242;
    text-align: center;
  }
  
  .analyse-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .analyse-card {
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    height: 100%;
  }
  
  .card-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #424242;
  }
  
  .progression-card, .days-card {
    background-color: #fff1f1;
  }
  
  .chart-container {
    height: 150px;
    position: relative;
  }
  
  .chart-line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%);
    clip-path: polygon(0 100%, 10% 80%, 20% 85%, 30% 70%, 40% 75%, 50% 60%, 60% 50%, 70% 40%, 80% 30%, 90% 25%, 100% 20%, 100% 100%);
    border-radius: 8px 8px 0 0;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .calendar-day {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    border-radius: 50%;
  }
  
  .calendar-day.completed {
    background-color: #5d4b8c;
    color: white;
  }
  
  .score-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .score-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: conic-gradient(#5d4b8c 86%, #e0e0e0 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 1rem;
  }
  
  .score-circle::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: white;
  }
  
  .score-value {
    font-size: 2rem;
    font-weight: 700;
    color: #5d4b8c;
    position: relative;
    z-index: 1;
  }
  
  .score-max {
    font-size: 1rem;
    color: #888;
    position: relative;
    z-index: 1;
  }
  
  .comparison-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .bar-chart {
    width: 80%;
    height: 150px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }
  
  .bar {
    width: 40px;
    border-radius: 8px 8px 0 0;
  }
  
  .current-bar {
    height: 70%;
    background-color: #ff9a9e;
  }
  
  .target-bar {
    height: 90%;
    background-color: #5d4b8c;
  }
  
  .detailed-analyse-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .evolution-card {
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  .evolution-chart {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;
    height: 150px;
    margin-top: 1rem;
  }
  
  .chart-point {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    z-index: 2;
  }
  
  .point-value {
    font-weight: 600;
    color: #5d4b8c;
  }
  
  .point-label {
    font-size: 0.8rem;
    text-align: center;
    margin-top: 0.5rem;
  }
  
  .chart-line-evolution {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 65%;
    background: linear-gradient(90deg, #ff9a9e 0%, #5d4b8c 100%);
    clip-path: polygon(0 30%, 100% 0, 100% 100%, 0 100%);
    border-radius: 8px;
  }
  
  .comment-card {
    background: #e8e5f2;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
  }
  
  .comment-text {
    flex-grow: 1;
    color: #5d4b8c;
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  .view-more {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  
  .view-more-link {
    color: #5d4b8c;
    text-decoration: none;
    font-size: 0.9rem;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (max-width: 992px) {
    .detailed-analyse-container {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .analyse-cards-container {
      grid-template-columns: 1fr;
    }
    
    .content-container {
      flex-direction: column;
    }
    
    .sidebar-container {
      width: 100%;
      height: auto;
    }
  }
  </style>