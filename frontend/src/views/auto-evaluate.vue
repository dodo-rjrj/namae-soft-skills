<template>
  <div class="app-container">
    <Sidebar class="sidebar-container" />
    <main class="main-content">
      <Header class="navbar-container" />
      <div class="content">
        <WelcomeSection />
        <SkillSelection @select-skill="handleSkillSelect" />
        <EvaluationSection 
          v-if="selectedSkill" 
          :skill="selectedSkill" 
          @submit-evaluation="handleEvaluationSubmit"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '../components/sidebare.vue';
import Header from '../components/navbar.vue';
import WelcomeSection from '../components/welcome.vue';
import SkillSelection from '../components/SkillSelection.vue';


const selectedSkill = ref(null);
const evaluationSubmitted = ref(false);

const handleSkillSelect = (skill) => {
  selectedSkill.value = skill;
  evaluationSubmitted.value = true;
};

const handleEvaluationSubmit = (score) => {
  evaluationSubmitted.value = true;
  console.log(`Evaluation submitted with score: ${score}`);
};
</script>

<style scoped>
.app-container {
  display: flex;
  background-color: hsla(0, 0%, 92%, 0.217);
  height: 100vh;
  overflow: hidden;
}

.sidebar-container {
  height: 100%;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.navbar-container {
  width: 100%;
}

.content {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
}

/* Keep your header styling if needed */
.top-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}
</style>