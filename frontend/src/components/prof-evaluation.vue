<template>
  <div class="evaluation-wrapper">
    <!-- Section de sélection de compétence -->
    <section class="evaluation-card skill-selection">
      <h3>Sélectionner la soft skill à évaluer</h3>
      
      <div class="skills-grid">
        <div class="skills-header">
          <span class="skill-label">Soft skill</span>
          <span></span>
          <span class="score-label">Dernier score obtenu</span>
        </div>
        
        <div v-for="skill in skills" :key="skill.name" class="skill-row">
          <span class="skill-name">{{ skill.displayName }}</span>
          <button 
            class="evaluate-btn" 
            @click="selectSkillForEvaluation(skill.name)"
          >
            Évaluer
          </button>
          <div class="score-bubble">{{ skill.score }}</div>
        </div>
        
        <div class="skill-row">
          <span class="skill-name">Autre compétence</span>
          <button class="add-btn">+</button>
          <div class="score-bubble"></div>
        </div>
      </div>
    </section>
    
    <!-- Section d'évaluation (visible après sélection d'une compétence) -->
    <section v-if="selectedSkill" class="evaluation-card evaluation-section">
      <div class="evaluation-header">
        <div class="skill-badge">
          <span class="skill-icon">{{ getSkillIcon(selectedSkill) }}</span>
          <h3>Évaluation - {{ getDisplayName(selectedSkill) }}</h3>
        </div>
        <div class="progress-indicator">
          <span>{{ answeredQuestions }}/{{ currentQuestions.length }} questions</span>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>
      </div>
      
      <div class="questions-container">
        <div class="questions-header">
          <span>Questions d'évaluation</span>
          <span class="score-text">Score</span>
        </div>
        
        <div v-for="(question, index) in currentQuestions" :key="index" class="question-item">
          <div class="question-number">{{ index + 1 }}</div>
          <p class="question-text">{{ question }}</p>
          <div class="rating">
            <button 
              v-for="star in 5" 
              :key="star" 
              class="star-btn"
              :class="{ 'active': ratings[index] >= star, 'hover': hoverRating[index] >= star }"
              @click="rateQuestion(index, star)"
              @mouseenter="setHoverRating(index, star)"
              @mouseleave="clearHoverRating(index)"
            >
              ★
            </button>
            <span v-if="ratings[index] > 0" class="rating-value">{{ ratings[index] }}/5</span>
          </div>
        </div>
        
        <div class="comment-section">
          <label for="comment">Observations et commentaires</label>
          <textarea 
            id="comment" 
            placeholder="Ajouter un commentaire sur la performance de l'étudiant..." 
            v-model="comment"
          ></textarea>
        </div>
      </div>
      
      <div class="submit-section">
        <div v-if="averageScore > 0" class="current-score">
          Score actuel: <span class="score-value">{{ averageScore }}/5</span>
        </div>
        <button class="submit-btn" @click="submitEvaluation" :disabled="!canSubmit">
          <span v-if="canSubmit">Soumettre l'évaluation</span>
          <span v-else>Veuillez répondre à toutes les questions</span>
        </button>
      </div>
    </section>
    
    <!-- Section de résultat (visible après soumission) -->
    <div v-if="submitted" class="result-box">
      <div class="result-icon">🎯</div>
      <p class="result-title">Évaluation terminée</p>
      <p class="result-skill">{{ getDisplayName(selectedSkill) }}</p>
      <div class="result-score-container">
        <div class="result-score">{{ averageScore }}</div>
        <div class="result-max">/5</div>
      </div>
      <div class="result-bar">
        <div class="result-fill" :style="{ width: (averageScore / 5) * 100 + '%' }"></div>
      </div>
      <button class="new-evaluation-btn" @click="resetEvaluation">Nouvelle évaluation</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Liste des compétences avec leurs questions spécifiques
const skillsData = {
  'organisation': [
    'Est-ce que l\'étudiant définit des objectifs clairs et précis ?',
    'Est-ce que l\'étudiant respecte les délais fixés sans stress excessif ?',
    'Est-ce que l\'étudiant gère plusieurs tâches à la fois sans se disperser ?',
    'Est-ce que l\'étudiant planifie ses tâches à l\'avance avec des priorités claires ?',
    'Est-ce que l\'étudiant termine ce qu\'il commence avant de passer à autre chose ?',
    'Est-ce que l\'étudiant commence ses travaux tôt plutôt que de repousser ?',
    'Est-ce que l\'étudiant révise régulièrement ses objectifs ?',
    'Est-ce que l\'étudiant planifie ses journées ou semaines à l\'avance ?',
    'Est-ce que l\'étudiant respecte le temps prévu pour chaque tâche sans trop déborder ?',
    'Est-ce que l\'étudiant adapte efficacement son planning quand un imprévu survient ?'
  ],
  'creativity': [
    'Est-ce que l\'étudiant propose des idées originales ?',
    'Est-ce que l\'étudiant pense en dehors des sentiers battus ?',
    'Est-ce que l\'étudiant utilise différentes approches pour résoudre un problème ?',
    'Est-ce que l\'étudiant fait preuve d\'imagination dans ses travaux ?',
    'Est-ce que l\'étudiant est ouvert à explorer de nouvelles méthodes ?',
    'Est-ce que l\'étudiant combine des concepts existants de manière innovante ?',
    'Est-ce que l\'étudiant prend des risques créatifs dans ses projets ?',
    'Est-ce que l\'étudiant apporte une perspective unique aux discussions ?',
    'Est-ce que l\'étudiant est curieux et pose des questions stimulantes ?',
    'Est-ce que l\'étudiant développe ses idées de manière approfondie ?'
  ],
  'passion': [
    'Est-ce que l\'étudiant montre de l\'enthousiasme pour le sujet ?',
    'Est-ce que l\'étudiant s\'investit au-delà des exigences minimales ?',
    'Est-ce que l\'étudiant cherche à approfondir ses connaissances par lui-même ?',
    'Est-ce que l\'étudiant partage spontanément des ressources ou informations avec ses pairs ?',
    'Est-ce que l\'étudiant persévère face aux difficultés ?',
    'Est-ce que l\'intérêt de l\'étudiant reste constant tout au long du projet ?',
    'Est-ce que l\'étudiant inspire les autres par son engagement ?',
    'Est-ce que l\'étudiant fait des liens entre le cours et ses intérêts personnels ?',
    'Est-ce que l\'étudiant pose des questions qui démontrent sa curiosité ?',
    'Est-ce que l\'étudiant consacre du temps supplémentaire à améliorer son travail ?'
  ],
  'time-management': [
    'Est-ce que l\'étudiant respecte les délais fixés ?',
    'Est-ce que l\'étudiant arrive préparé aux séances de travail ?',
    'Est-ce que l\'étudiant planifie efficacement son temps pour les projets à long terme ?',
    'Est-ce que l\'étudiant évite la procrastination ?',
    'Est-ce que l\'étudiant priorise correctement ses tâches ?',
    'Est-ce que l\'étudiant gère bien son temps pendant les travaux en classe ?',
    'Est-ce que l\'étudiant est ponctuel aux cours et aux réunions ?',
    'Est-ce que l\'étudiant équilibre bien ses différentes responsabilités ?',
    'Est-ce que l\'étudiant s\'adapte rapidement aux changements de planning ?',
    'Est-ce que l\'étudiant utilise des outils ou méthodes pour gérer son temps ?'
  ],
  'communication': [
    'Est-ce que l\'étudiant s\'exprime clairement à l\'oral ?',
    'Est-ce que les présentations de l\'étudiant sont bien structurées ?',
    'Est-ce que l\'étudiant écoute activement les autres ?',
    'Est-ce que l\'étudiant adapte son discours à son audience ?',
    'Est-ce que l\'étudiant pose des questions pertinentes ?',
    'Est-ce que les documents écrits de l\'étudiant sont clairs et bien organisés ?',
    'Est-ce que l\'étudiant participe activement aux discussions de groupe ?',
    'Est-ce que l\'étudiant donne et reçoit des feedback de manière constructive ?',
    'Est-ce que l\'étudiant utilise efficacement les outils de communication numériques ?',
    'Est-ce que l\'étudiant gère bien les situations de communication difficiles ?'
  ],
  'teamwork': [
    'Est-ce que l\'étudiant collabore efficacement avec ses pairs ?',
    'Est-ce que l\'étudiant contribue équitablement au travail d\'équipe ?',
    'Est-ce que l\'étudiant respecte les idées et opinions des autres ?',
    'Est-ce que l\'étudiant assume ses responsabilités au sein du groupe ?',
    'Est-ce que l\'étudiant aide les autres membres de l\'équipe quand nécessaire ?',
    'Est-ce que l\'étudiant communique efficacement avec son équipe ?',
    'Est-ce que l\'étudiant gère constructivement les conflits ?',
    'Est-ce que l\'étudiant s\'adapte aux différents styles de travail ?',
    'Est-ce que l\'étudiant fait preuve d\'initiative dans les projets de groupe ?',
    'Est-ce que l\'étudiant maintient une attitude positive même dans les moments difficiles ?'
  ]
};

// Icônes pour chaque compétence
const skillIcons = {
  'organisation': '📋',
  'creativity': '🎨',
  'passion': '🔥',
  'time-management': '⏰',
  'communication': '💬',
  'teamwork': '🤝'
};

// Liste des compétences
const skills = ref([
  { name: 'organisation', displayName: 'Organisation', score: '3.0/5' },
  { name: 'creativity', displayName: 'Créativité', score: '4.0/5' },
  { name: 'passion', displayName: 'Passion', score: '4.5/5' },
  { name: 'time-management', displayName: 'Gestion du temps', score: '4.0/5' },
  { name: 'communication', displayName: 'Communication', score: '3.8/5' },
  { name: 'teamwork', displayName: 'Travail d\'équipe', score: '4.2/5' }
]);

// État du composant
const selectedSkill = ref(null);
const currentQuestions = ref([]);
const ratings = ref([]);
const hoverRating = ref([]);
const comment = ref('');
const submitted = ref(false);

// Computed properties
const averageScore = computed(() => {
  const validRatings = ratings.value.filter(r => r > 0);
  if (validRatings.length === 0) return 0;
  const sum = validRatings.reduce((acc, val) => acc + val, 0);
  return (sum / validRatings.length).toFixed(1);
});

const answeredQuestions = computed(() => {
  return ratings.value.filter(r => r > 0).length;
});

const progressPercentage = computed(() => {
  if (currentQuestions.value.length === 0) return 0;
  return (answeredQuestions.value / currentQuestions.value.length) * 100;
});

const canSubmit = computed(() => {
  return answeredQuestions.value === currentQuestions.value.length;
});

// Méthodes
const getDisplayName = (skillName) => {
  const skill = skills.value.find(s => s.name === skillName);
  return skill ? skill.displayName : skillName;
};

const getSkillIcon = (skillName) => {
  return skillIcons[skillName] || '📊';
};

const selectSkillForEvaluation = (skillName) => {
  selectedSkill.value = skillName;
  currentQuestions.value = skillsData[skillName] || [];
  ratings.value = Array(currentQuestions.value.length).fill(0);
  hoverRating.value = Array(currentQuestions.value.length).fill(0);
  comment.value = '';
  submitted.value = false;
};

const rateQuestion = (questionIndex, rating) => {
  ratings.value[questionIndex] = rating;
};

const setHoverRating = (questionIndex, rating) => {
  hoverRating.value[questionIndex] = rating;
};

const clearHoverRating = (questionIndex) => {
  hoverRating.value[questionIndex] = 0;
};

const submitEvaluation = () => {
  if (!canSubmit.value) return;
  
  submitted.value = true;
  
  const skillIndex = skills.value.findIndex(skill => skill.name === selectedSkill.value);
  if (skillIndex !== -1) {
    skills.value[skillIndex].score = `${averageScore.value}/5`;
  }
};

const resetEvaluation = () => {
  selectedSkill.value = null;
  currentQuestions.value = [];
  ratings.value = [];
  hoverRating.value = [];
  comment.value = '';
  submitted.value = false;
};
</script>

<style scoped>
.evaluation-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
}

.evaluation-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.8);
  backdrop-filter: blur(10px);
}

.evaluation-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.skill-selection h3 {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.2rem;
  align-items: center;
}

.skills-header {
  display: contents;
  font-weight: 600;
  color: #64748b;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.skill-label, .score-label {
  color: #6366f1;
  font-weight: 700;
}

.score-label {
  text-align: center;
}

.skill-row {
  display: contents;
}

.skill-name {
  padding: 1rem 0;
  font-weight: 500;
  color: #334155;
}

.evaluate-btn {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.evaluate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.add-btn {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.add-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.score-bubble {
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  border-radius: 25px;
  padding: 0.6rem 1.2rem;
  text-align: center;
  color: #0369a1;
  font-weight: 700;
  border: 1px solid #7dd3fc;
}

.evaluation-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 1.5rem;
}

.skill-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.skill-icon {
  font-size: 2rem;
}

.skill-badge h3 {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.progress-indicator {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 10px;
  transition: width 0.3s ease;
}

.questions-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 2px solid #e2e8f0;
  font-weight: 700;
  color: #1e293b;
  font-size: 1.1rem;
}

.question-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.question-number {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.question-text {
  flex: 1;
  line-height: 1.6;
  color: #334155;
  font-weight: 500;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.star-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  color: #cbd5e1;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.2rem;
}

.star-btn:hover, .star-btn.hover {
  color: #fbbf24;
  transform: scale(1.1);
}

.star-btn.active {
  color: #f59e0b;
  text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
}

.rating-value {
  margin-left: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6366f1;
}

.comment-section {
  margin-top: 2rem;
}

.comment-section label {
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: #1e293b;
  font-size: 1.1rem;
}

textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;
}

textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.submit-section {
  margin-top: 2rem;
  text-align: center;
}

.current-score {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #64748b;
}

.score-value {
  font-weight: 700;
  color: #6366f1;
  font-size: 1.2rem;
}

.submit-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.submit-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
  box-shadow: none;
}

.result-box {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  color: white;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.result-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.result-title {
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.result-skill {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.result-score-container {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.3rem;
  margin-bottom: 1rem;
}

.result-score {
  font-weight: 700;
  font-size: 3rem;
}

.result-max {
  font-size: 1.5rem;
  opacity: 0.8;
}

.result-bar {
  width: 200px;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  margin: 0 auto 2rem;
  overflow: hidden;
}

.result-fill {
  height: 100%;
  background: white;
  border-radius: 10px;
  transition: width 1s ease;
}

.new-evaluation-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  border-radius: 10px;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.new-evaluation-btn:hover {
  background: white;
  color: #6366f1;
}

@media (max-width: 768px) {
  .evaluation-wrapper {
    padding: 1rem;
  }
  
  .evaluation-card {
    padding: 1.5rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr auto;
    gap: 1rem;
  }
  
  .score-bubble {
    grid-column: span 2;
    justify-self: center;
    margin-top: 0.5rem;
  }
  
  .question-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .rating {
    align-self: flex-end;
  }
}
</style>