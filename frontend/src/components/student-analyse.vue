<template> 
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
</template>

<script setup>
import { ref } from 'vue'


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
font-family: 'Poppins', sans-serif;
color: #2d3748;
background-color: #f8fafc;
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
padding: 1.5rem;
margin-left: 20px;
background-color: #f8fafc;
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
margin-bottom: 2.5rem;
background: linear-gradient(135deg, #ffffff 0%, #f9f7ff 100%);
border-radius: 20px;
padding: 2rem;
box-shadow: 0 10px 30px rgba(93, 75, 140, 0.08);
border-left: 5px solid #6366f1;
transform: translateY(0);
transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.section-title-container:hover {
transform: translateY(-5px);
box-shadow: 0 15px 35px rgba(93, 75, 140, 0.12);
}

.section-title {
font-size: 2.2rem;
font-weight: 700;
color: #4a4a68;
margin: 0;
background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
letter-spacing: -0.5px;
}

.skill-selection-card {
background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
border-radius: 20px;
padding: 2rem;
text-align: center;
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
margin-bottom: 2.5rem;
border-bottom: 3px solid #6366f1;
transition: transform 0.3s ease;
}

.skill-selection-card:hover {
transform: translateY(-7px);
}

.skill-selection-card h3 {
font-size: 1.4rem;
font-weight: 600;
margin-bottom: 1.8rem;
color: #4a4a68;
position: relative;
display: inline-block;
}

.skill-selection-card h3::after {
content: '';
position: absolute;
bottom: -10px;
left: 50%;
transform: translateX(-50%);
width: 50px;
height: 3px;
background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
border-radius: 3px;
}

.skill-buttons {
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 1.2rem;
margin-bottom: 1.5rem;
}

.skill-button {
background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
color: white;
border: none;
border-radius: 30px;
padding: 0.7rem 1.5rem;
font-size: 1rem;
font-weight: 500;
cursor: pointer;
transition: all 0.3s ease;
box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
position: relative;
overflow: hidden;
z-index: 1;
}

.skill-button::before {
content: '';
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
opacity: 0;
z-index: -1;
transition: opacity 0.3s ease;
border-radius: 30px;
}

.skill-button:hover {
transform: translateY(-5px);
box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
}

.skill-button:hover::before {
opacity: 1;
}

.add-skill-button {
width: 45px;
height: 45px;
border-radius: 50%;
background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
color: white;
border: none;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
font-size: 1.8rem;
transition: all 0.3s ease;
}

.add-skill-button:hover {
transform: rotate(90deg) scale(1.1);
box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.analyse-content {
animation: fadeInUp 0.7s ease-in-out;
}

@keyframes fadeInUp {
from { 
opacity: 0; 
transform: translateY(30px); 
}
to { 
opacity: 1; 
transform: translateY(0); 
}
}

.analyse-title {
font-size: 1.6rem;
font-weight: 600;
margin-bottom: 2rem;
color: #4a4a68;
text-align: center;
position: relative;
display: inline-block;
left: 50%;
transform: translateX(-50%);
}

.analyse-title::after {
content: '';
position: absolute;
bottom: -10px;
left: 0;
width: 100%;
height: 3px;
background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
border-radius: 3px;
}

.analyse-cards-container {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 2rem;
margin-bottom: 2.5rem;
}

.analyse-card {
background: white;
border-radius: 20px;
padding: 1.8rem;
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
height: 100%;
transition: transform 0.3s ease, box-shadow 0.3s ease;
position: relative;
z-index: 1;
overflow: hidden;
}

.analyse-card::before {
content: '';
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 5px;
background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
z-index: 2;
}

.analyse-card:hover {
transform: translateY(-10px);
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.card-title {
font-size: 1.2rem;
font-weight: 600;
margin-bottom: 1.5rem;
color: #4a4a68;
position: relative;
padding-bottom: 10px;
}

.card-title::after {
content: '';
position: absolute;
bottom: 0;
left: 0;
width: 40px;
height: 3px;
background: #6366f1;
border-radius: 3px;
}

.progression-card, .days-card {
background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
}

.chart-container {
height: 180px;
position: relative;
display: flex;
align-items: flex-end;
margin-top: 1.5rem;
}

.chart-line {
position: absolute;
bottom: 0;
left: 0;
width: 100%;
height: 70%;
background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
clip-path: polygon(0 100%, 10% 80%, 20% 85%, 30% 70%, 40% 75%, 50% 60%, 60% 50%, 70% 40%, 80% 30%, 90% 25%, 100% 20%, 100% 100%);
border-radius: 8px 8px 0 0;
opacity: 0.8;
transition: all 0.5s ease;
}

.chart-container:hover .chart-line {
height: 80%;
opacity: 1;
}

.calendar-grid {
display: grid;
grid-template-columns: repeat(7, 1fr);
gap: 0.7rem;
margin-top: 1.5rem;
}

.calendar-day {
width: 30px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
font-size: 0.9rem;
font-weight: 500;
border-radius: 50%;
transition: all 0.3s ease;
border: 1px solid rgba(99, 102, 241, 0.2);
color: #4a4a68;
}

.calendar-day.completed {
background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
color: white;
box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
transform: scale(1.1);
}

.calendar-day:hover {
transform: scale(1.1);
border-color: #6366f1;
}

.score-card {
display: flex;
flex-direction: column;
align-items: center;
}

.score-circle {
width: 150px;
height: 150px;
border-radius: 50%;
background: conic-gradient(#6366f1 86%, #e6e6e6 0);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: relative;
margin-top: 1.5rem;
box-shadow: 0 10px 30px rgba(99, 102, 241, 0.15);
transition: transform 0.5s ease;
}

.score-circle:hover {
transform: scale(1.05) rotate(5deg);
}

.score-circle::before {
content: '';
position: absolute;
width: 130px;
height: 130px;
border-radius: 50%;
background-color: white;
box-shadow: inset 0 5px 15px rgba(0, 0, 0, 0.05);
}

.score-value {
font-size: 2.5rem;
font-weight: 700;
background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
position: relative;
z-index: 1;
}

.score-max {
font-size: 1.2rem;
color: #a3a3c2;
position: relative;
z-index: 1;
font-weight: 500;
}

.comparison-card {
display: flex;
flex-direction: column;
align-items: center;
}

.bar-chart {
width: 100%;
height: 180px;
display: flex;
align-items: flex-end;
justify-content: center;
gap: 3rem;
margin-top: 1.5rem;
position: relative;
}

.bar-chart::before {
content: '';
position: absolute;
bottom: 0;
left: 0;
width: 100%;
height: 1px;
background-color: rgba(0, 0, 0, 0.1);
}

.bar {
width: 60px;
border-radius: 10px 10px 0 0;
transition: height 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
position: relative;
}

.bar::after {
content: attr(data-value);
position: absolute;
top: -25px;
left: 50%;
transform: translateX(-50%);
font-weight: 600;
font-size: 0.9rem;
color: #4a4a68;
}

.current-bar {
height: 70%;
background: linear-gradient(0deg, #6366f1 0%, #818cf8 100%);
box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
}

.current-bar::before {
content: 'Actuel';
position: absolute;
bottom: -25px;
left: 50%;
transform: translateX(-50%);
font-size: 0.8rem;
color: #6366f1;
font-weight: 500;
}

.target-bar {
height: 90%;
background: linear-gradient(0deg, #8b5cf6 0%, #a78bfa 100%);
box-shadow: 0 10px 20px rgba(139, 92, 246, 0.2);
}

.target-bar::before {
content: 'Objectif';
position: absolute;
bottom: -25px;
left: 50%;
transform: translateX(-50%);
font-size: 0.8rem;
color: #8b5cf6;
font-weight: 500;
}

.bar-chart:hover .current-bar {
height: 75%;
}

.bar-chart:hover .target-bar {
height: 95%;
}

.detailed-analyse-container {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 2rem;
margin-bottom: 3.5rem;
}

.evolution-card {
background: white;
border-radius: 20px;
padding: 2rem;
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
transition: transform 0.3s ease, box-shadow 0.3s ease;
position: relative;
overflow: hidden;
}

.evolution-card::before {
content: '';
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 5px;
background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
}

.evolution-card:hover {
transform: translateY(-10px);
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.evolution-chart {
display: flex;
align-items: flex-end;
justify-content: space-between;
position: relative;
height: 180px;
margin-top: 1.5rem;
}

.chart-point {
display: flex;
flex-direction: column;
align-items: center;
width: 100px;
z-index: 2;
transition: transform 0.3s ease;
}

.chart-point:hover {
transform: translateY(-5px);
}

.point-value {
font-weight: 700;
font-size: 1.4rem;
background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
}

.point-label {
font-size: 0.9rem;
text-align: center;
margin-top: 0.8rem;
color: #6b7280;
font-weight: 500;
}

.chart-line-evolution {
position: absolute;
bottom: 0;
left: 0;
width: 100%;
height: 65%;
background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
clip-path: polygon(0 30%, 100% 0, 100% 100%, 0 100%);
border-radius: 10px;
opacity: 0.8;
transition: all 0.5s ease;
}

.evolution-chart:hover .chart-line-evolution {
height: 70%;
opacity: 1;
}

.comment-card {
background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
border-radius: 20px;
padding: 2rem;
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
display: flex;
flex-direction: column;
transition: transform 0.3s ease, box-shadow 0.3s ease;
position: relative;
overflow: hidden;
border-left: 5px solid #8b5cf6;
}

.comment-card:hover {
transform: translateY(-10px);
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.comment-text {
flex-grow: 1;
color: #4c1d95;
font-size: 1.05rem;
line-height: 1.8;
font-weight: 400;
position: relative;
padding-left: 20px;
}

.comment-text::before {
content: '"';
position: absolute;
left: 0;
top: -10px;
font-size: 3rem;
color: #8b5cf6;
opacity: 0.3;
font-family: Georgia, serif;
}

.view-more {
display: flex;
justify-content: flex-end;
margin-top: 1.5rem;
}

.view-more-link {
color: #6366f1;
text-decoration: none;
font-size: 1rem;
font-weight: 600;
transition: all 0.3s ease;
display: inline-flex;
align-items: center;
position: relative;
}

.view-more-link::after {
content: '→';
margin-left: 5px;
transition: transform 0.3s ease;
}

.view-more-link:hover {
color: #8b5cf6;
}

.view-more-link:hover::after {
transform: translateX(5px);
}

/* Media queries */
@media (max-width: 1200px) {
.analyse-cards-container {
grid-template-columns: repeat(2, 1fr);
}
}

@media (max-width: 992px) {
.detailed-analyse-container {
grid-template-columns: 1fr;
}

.section-title {
font-size: 1.8rem;
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

.section-title-container,
.skill-selection-card,
.analyse-card,
.evolution-card,
.comment-card {
padding: 1.5rem;
}

.skill-selection-card h3,
.analyse-title {
font-size: 1.3rem;
}
}

@media (max-width: 480px) {
.skill-buttons {
gap: 0.8rem;
}

.skill-button {
padding: 0.6rem 1.2rem;
font-size: 0.9rem;
}

.calendar-grid {
gap: 0.4rem;
}

.calendar-day {
width: 25px;
height: 25px;
font-size: 0.8rem;
}

.score-circle {
width: 120px;
height: 120px;
}

.score-circle::before {
width: 100px;
height: 100px;
}

.score-value {
font-size: 2rem;
}
}
</style>