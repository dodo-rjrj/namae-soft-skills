<template>
  <div class="evaluation-wrapper">
    <!-- Section de sélection de compétence -->
    <section class="evaluation-card skill-selection">
      <h3>Selectionner la soft skill a evaluer:</h3>
      
      <div class="skills-grid">
        <div class="skills-header">
          <span class="skill-label">soft skill</span>
          <span></span>
          <span class="score-label">dernier score obtenu</span>
        </div>
        
        <div v-for="skill in skills" :key="skill.name" class="skill-row">
          <span class="skill-name">{{ skill.name }}</span>
          <button 
            class="evaluate-btn" 
            @click="selectSkillForEvaluation(skill.name)"
          >
            évaluer
          </button>
          <div class="score-bubble">{{ skill.score }}</div>
        </div>
        
        <div class="skill-row">
          <span class="skill-name">d'autres</span>
          <button class="add-btn">+</button>
          <div class="score-bubble"></div>
        </div>
      </div>
    </section>
    
    <!-- Section d'évaluation (visible après sélection d'une compétence) -->
    <section v-if="selectedSkill" class="evaluation-card">
      <div class="evaluation-header">
        <h3>Evaluation - Compétence : {{ selectedSkill }}</h3>
      </div>
      
      <div class="questions-container">
        <div class="questions-header">
          <span>Questions:</span>
          <span class="score-text">score:</span>
        </div>
        
        <div v-for="(question, index) in questions" :key="index" class="question-item">
          <p class="question-text">{{ question }}</p>
          <div class="rating">
            <button 
              v-for="star in 5" 
              :key="star" 
              class="star-btn"
              :class="{ 'active': ratings[index] >= star }"
              @click="rateQuestion(index, star)"
            >
              ★
            </button>
          </div>
        </div>
        
      
      </div>
      
      <button class="submit-btn" @click="submitEvaluation">la soumission d'un formulaire</button>
    </section>
    
    <!-- Section de résultat (visible après soumission) -->
    <div v-if="submitted" class="result-box">
      <p class="result-score">score est : {{ averageScore }}/5</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Liste des compétences
const skills = ref([
  { name: 'organisation', score: '3/5' },
  { name: 'creativity', score: '4/5' },
  { name: 'passion', score: '4.5/5' },
  { name: 'time-management', score: '4/5' }
]);

// Questions pour l'organisation (peuvent être adaptées selon la compétence)
const questions = ref([
  'Ai-je des objectifs clairs et précis ?',
  'Suis-je capable de respecter les délais fixés sans stress excessif ?',
  'Est-ce que je sais gérer plusieurs tâches à la fois sans me disperser ?',
  'Est-ce que je planifie mes tâches à l\'avance avec des priorités claires ?',
  'Est-ce que je termine ce que je commence avant de passer à autre chose ?',
  'Est-ce que je commence tôt ou je repousse ?',
  'Révois-je régulièrement mes objectifs ?',
  'Est-ce que je planifie mes journées ou semaines à l\'avance ?',
  'Est-ce que je respecte le temps prévu pour chaque tâche sans trop déborder ?',
  'Quand un imprévu survient, suis-je capable d\'adapter mon planning efficacement ?'
]);

// État du composant
const selectedSkill = ref(null);
const ratings = ref(Array(10).fill(0));
const comment = ref('');
const submitted = ref(false);

// Score moyen calculé
const averageScore = computed(() => {
  const sum = ratings.value.reduce((acc, val) => acc + val, 0);
  return (sum / ratings.value.length).toFixed(1);
});

// Sélectionner une compétence pour évaluation
const selectSkillForEvaluation = (skillName) => {
  selectedSkill.value = skillName;
  ratings.value = Array(10).fill(0);
  comment.value = '';
  submitted.value = false;
};

// Noter une question
const rateQuestion = (questionIndex, rating) => {
  ratings.value[questionIndex] = rating;
};

// Soumettre l'évaluation
const submitEvaluation = () => {
  submitted.value = true;
  
  // Mettre à jour le score de la compétence évaluée
  const skillIndex = skills.value.findIndex(skill => skill.name === selectedSkill.value);
  if (skillIndex !== -1) {
    skills.value[skillIndex].score = `${averageScore.value}/5`;
  }
};
</script>

<style scoped>
.evaluation-wrapper {
  max-width: auto;
  margin: 0 auto;
  margin: 20px;
}

.evaluation-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.skill-selection {
  background-color: white;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
}

.skills-header {
  display: contents;
  font-weight: 600;
  color: #555;
}

.skill-label {
  color: #1e40af;
  font-weight: 600;
}

.score-label {
  color: #1e40af;
  font-weight: 600;
  text-align: center;
}

.skill-row {
  display: contents;
}

.skill-name {
  padding: 0.75rem 0;
}

.evaluate-btn {
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.evaluate-btn:hover {
  background-color: #4f46e5;
}

.add-btn {
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #4f46e5;
}

.score-bubble {
  background-color: #e0f2fe;
  border-radius: 20px;
  padding: 0.4rem 1rem;
  text-align: center;
  color: #6366f1;
  font-weight: 600;
}

.evaluation-header {
  margin-bottom: 1.5rem;
}

.questions-container {
  margin-bottom: 1.5rem;
}

.questions-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eaedf3;
  font-weight: 600;
  color: #555;
}

.score-text {
  margin-right: 2.5rem;
}

.question-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eaedf3;
}

.question-text {
  flex: 1;
  padding-right: 1rem;
}

.rating {
  display: flex;
  gap: 0.25rem;
}

.star-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #d1d5db;
  cursor: pointer;
}

.star-btn.active {
  color: #fbbf24;
}


textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #eaedf3;
  border-radius: 8px;
  min-height: 100px;
  resize: vertical;
}

.submit-btn {
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  margin: 1rem 0;
  align-self: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.submit-btn:hover {
  background-color: #4f46e5;
}

.result-box {
  background-color: #3b82f6;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  margin-top: 1.5rem;
  color: white;
}

.result-score {
  font-weight: 600;
  font-size: 1.2rem;
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr auto;
  }
  
  .score-bubble {
    grid-column: span 2;
    justify-self: center;
  }
  
  .question-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .rating {
    margin-top: 0.5rem;
  }
}
</style>