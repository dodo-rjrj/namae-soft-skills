<template>
  <div class="history-container">
    <strong>Historique des évaluations</strong>
    
    <div class="filters">
      <div class="filter-group">
        <label>Période</label>
        <select v-model="filters.period">
          <option value="all">Tous</option>
          <option value="month">Dernier mois</option>
          <option value="trimester">Dernier trimestre</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Projet</label>
        <select v-model="filters.project">
          <option value="all">Tous</option>
          <option value="project1">Projet 1</option>
          <option value="project2">Projet 2</option>
        </select>
      </div>
    </div>
    
    <table class="skills-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Skills</th>
          <th>Score</th>
          <th>Comment</th>
          <th>Évaluateur</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in filteredEvaluations" :key="i" class="skill-row">
          <td>{{ item.date }}</td>
          <td>{{ item.skill }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.comment }}</td>
          <td class="user-col">
            <img :src="item.evaluatorPhoto" alt="Photo" class="user-img" />
            <div>{{ item.evaluatorName }}</div>
          </td>
        </tr>
        <tr v-if="filteredEvaluations.length === 0">
          <td colspan="5" class="no-data">Aucune évaluation trouvée</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Filtres
const filters = ref({
  period: 'all',
  project: 'all'
});

// Données
const evaluations = [
  {
    date: '4/09/24',
    skill: 'Teamwork',
    score: 4.9,
    comment: 'Concise and confident speaker',
    evaluatorName: 'Etu Amina',
    evaluatorPhoto: '/placeholder.svg?height=40&width=40',
    project: 'project1'
  },
  {
    date: '3/27/24',
    skill: 'Problem Solving',
    score: 4.9,
    comment: 'Active listener in team talks',
    evaluatorName: 'Prof Amal',
    evaluatorPhoto: '/placeholder.svg?height=40&width=40',
    project: 'project2'
  },
  {
    date: '4/10/24',
    skill: 'Communication',
    score: 4.9,
    comment: 'Clearly expresses ideas.',
    evaluatorName: 'Prof ALGHAILANI',
    evaluatorPhoto: '/placeholder.svg?height=40&width=40',
    project: 'project1'
  }
];

// Filtrage des évaluations
const filteredEvaluations = computed(() => {
  return evaluations.filter(item => {
    // Filtre par projet
    if (filters.value.project !== 'all' && item.project !== filters.value.project) {
      return false;
    }
    
    // Filtre par période
    if (filters.value.period !== 'all') {
      const evalDate = new Date(item.date);
      const now = new Date();
      
      if (filters.value.period === 'month' && 
          (now - evalDate > 30 * 24 * 60 * 60 * 1000)) {
        return false;
      }
      
      if (filters.value.period === 'trimester' && 
          (now - evalDate > 90 * 24 * 60 * 60 * 1000)) {
        return false;
      }
    }
    
    return true;
  });
});
</script>

<style scoped>
.history-container {
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

strong { 
  font-size: 24px; 
  display: block; 
  margin-bottom: 15px; 
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

select {
  padding: 6px 10px;
  border: 1px solid #9c6ab8;
  border-radius: 5px;
  width: 140px;
}

.skills-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

.skills-table th {
  background: #F6F8FF;
  padding: 10px;
  text-align: left;
}

.skill-row { background: #F6F8FF; }

.skills-table td {
  padding: 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.skills-table td:first-child {
  border-left: 1px solid #eee;
  border-radius: 8px 0 0 8px;
}

.skills-table td:last-child {
  border-right: 1px solid #eee;
  border-radius: 0 8px 8px 0;
}

.user-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.user-img {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}

@media (max-width: 768px) {
  .filters { flex-direction: column; }
}
</style>