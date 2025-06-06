<template>
  <div class="welcome-card">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="welcome-title">
          Welcome back,
          <span class="highlight">{{ nom }} {{prenom  }}</span>
        </h1>
        <p class="tagline">
          Soft skills don't show up on a resume — they're felt in every word, every gesture, and every silence
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Récupérer le user depuis localStorage
const user = JSON.parse(localStorage.getItem('user'))

// Initialiser les ref avec les données du user
const nom = ref(user?.nom || '')
const prenom = ref(user?.prenom || '')

</script>



<style scoped>
.welcome-card {
  background: #EFF6FF;
  padding: 3rem;
  width:auto;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.highlight {
  background-color: #93C5FD;
  padding: 0.2rem 0.4rem;
  border-radius: 0.375rem;
  color: #1E40AF;
  font-weight: 600;
}

.tagline {
  color: #6B7280;
  margin-top: 0.75rem;
  font-size: 1.25rem;
  line-height: 1.25rem;

}

.welcome-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1F2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>