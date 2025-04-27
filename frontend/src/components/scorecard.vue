<template>
  <div class="score-card">
    <h2 class="score-title">SCORE</h2>
    <div class="score-value">
      <span>{{ score }}/5</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score = ref(4.4)
</script>

<style scoped>
.score-card {
  background: #EFF6FF;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.score-title {
  color: #1F2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.score-value {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: #1E40AF;
}

.score-value span {
  font-weight: 700;
}
</style>