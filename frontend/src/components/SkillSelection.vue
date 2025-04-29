<template>
  <section class="skill-selection-card">
    <div class="container">
    <h3 class="header">Sélectionner la soft skill dont l'quel vous serez évaluer:</h3>
    <h3 class="header">dernier score obtenu   :</h3></div>
    
    <div class="skills-container">
      <div class="skills-list">
        <div 
          v-for="skill in skills" 
          :key="skill.name" 
          class="skill-item"
          :class="{ 'selected': skill.name === selectedSkill }"
          @click="selectSkill(skill.name)"
        >
          <span>{{ skill.name }}</span>
          <button class="evaluate-btn">évaluer</button>
        </div>
       
          <button class="evaluate-btn">+</button>
      </div>
      
      <div class="scores-display">
     
        <div 
          v-for="skill in skills" 
          :key="`score-${skill.name}`" 
          class="score-item"
        >
          <span class="score">{{ skill.score }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['select-skill']);

const skills = ref([
  { name: 'organisation', score: '3/5' },
  { name: 'creativity', score: '4/5' },
  { name: 'passion', score: '4/5' },
  { name: 'time-management', score: '3/5' },

]);

const selectedSkill = ref(null);

const selectSkill = (skillName) => {
  selectedSkill.value = skillName;
  emit('select-skill', skillName);
};
</script>

<style scoped>
.skill-selection-card {
  background-color: #fdf4ff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.skill-selection-card h3 {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: #555;
}

.skills-container {
  display: flex;
  gap: 2rem;
}

.skills-list {
  flex: 3;
}

.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0e7ff;
  cursor: pointer;
}

.skill-item.selected {
  background-color: #f0e7ff;
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

.scores-display {
  flex: 1;
  background-color: #e0f2fe;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.scores-display h4 {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.score-item {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
}

.score {
  font-weight: 600;
  color: #6366f1;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
  font-size: 18px;

}

</style>