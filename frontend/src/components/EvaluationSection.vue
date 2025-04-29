<template>
  <section class="evaluation-card">
    <div class="evaluation-header">
      <span class="star-icon">⭐</span>
      <h3>Auto-évaluation - Compétence : {{ skill }}</h3>
    </div>
    
    <div class="questions-container">
      <div class="questions-header">
        <span>Questions</span>
        <span>Score</span>
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
    
    <button class="submit-btn" @click="submitEvaluation">Je soumets mon formulaire</button>
    
    <div v-if="submitted" class="result-box">
      <p>Merci pour votre honnêteté</p>
      <p class="result-score">vous avez obtenue un score de : {{ averageScore }}/5</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  skill: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['submit-evaluation']);

const questions = ref([
  'Ai-je des objectifs clairs et précis ?',
  'Suis-je capable de respecter les délais fixés sans stress excessif ?',
  'Est-ce que je gère plusieurs tâches à la fois sans me disperser ?',
  'Est-ce que je planifie mes tâches à l\'avance avec des priorités claires ?',
  'Est-ce que je termine ce que je commence avant de passer à autre chose ?',
  'Est-ce que je commence tôt ou je repousse ?',
  'Révise-je régulièrement mes objectifs ?',
  'Est-ce que je planifie mes journées ou semaines à l\'avance ?',
  'Est-ce que je respecte le temps prévu pour chaque tâche sans trop déborder ?',
  'Quand un imprévu survient, suis-je capable d\'adapter mon planning efficacement ?'
]);

const ratings = ref(questions.value.map(() => Math.floor(Math.random() * 5) + 1));
const submitted = ref(false);

const averageScore = computed(() => {
  const sum = ratings.value.reduce((acc, val) => acc + val, 0);
  return (sum / ratings.value.length).toFixed(1);
});

const rateQuestion = (questionIndex, rating) => {
  ratings.value[questionIndex] = rating;
};

const submitEvaluation = () => {
  submitted.value = true;
  emit('submit-evaluation', averageScore.value);
};
</script>

<style scoped>
.evaluation-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.evaluation-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.star-icon {
  font-size: 1.2rem;
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
  background-color: #f0f9ff;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  margin-top: 1.5rem;
}

.result-score {
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  color: #6366f1;
}
</style>