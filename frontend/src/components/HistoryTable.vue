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
        <tr v-for="(item, i) in filteredEvaluations" :key="i" class="skill-row" :style="{'animation-delay': i * 0.1 + 's'}">
          <td>{{ item.date }}</td>
          <td>{{ item.skill }}</td>
          <td>{{ item.score }}/5</td>
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
  background: linear-gradient(135deg, #ffffff 0%, #f9f7ff 100%);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 1rem;
  box-shadow: 0 10px 30px rgba(93, 75, 140, 0.08);
  border-left: 5px solid #7fadf8;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.history-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(93, 75, 140, 0.12);
}

strong {
  font-size: 1.8rem;
  font-weight: 700;
  display: block;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #5153e2 0%, #b6cdef 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  position: relative;
  padding-bottom: 10px;
}

strong::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #aec3ec 0%, #5580f7 100%);
  border-radius: 3px;
}

.filters {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-weight: 600;
  color: #4a4a68;
  font-size: 0.9rem;
}

select {
  padding: 10px 15px;
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 10px;
  width: 180px;
  font-family: 'Poppins', sans-serif;
  color: #4a4a68;
  background-color: #f8fafc;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px;
  padding-right: 40px;
}

select:focus {
  outline: none;
  border-color: #4f47e9;
  box-shadow: 0 3px 15px rgba(99, 102, 241, 0.1);
}

select:hover {
  border-color: #6366f1;
}

.skills-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
  margin-top: 1rem;
}

.skills-table th {
  background: #f8fafc;
  padding: 15px 20px;
  text-align: left;
  font-weight: 600;
  color: #4a4a68;
  font-size: 0.95rem;
  border-bottom: 2px solid rgba(92, 112, 242, 0.547);
  position: relative;
}

.skills-table th::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 30px;
  height: 2px;
  background: #85b8eb;
}

.skill-row {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.skill-row:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  z-index: 1;
  position: relative;
}

.skills-table td {
  padding: 15px 20px;
  border: none;
  color: #4b5563;
  font-size: 0.95rem;
  vertical-align: middle;
}

.skills-table td:first-child {
  border-left: 1px solid #e5e7eb;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  font-weight: 500;
}

.skills-table td:last-child {
  border-right: 1px solid #e5e7eb;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.skills-table td {
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

/* Style pour la colonne skill */
.skills-table td:nth-child(2) {
  font-weight: 600;
  color: #6366f1;
}

/* Style pour la colonne score */
.skills-table td:nth-child(3) {
  font-weight: 700;
  color: #4a4a68;
  background: linear-gradient(90deg, #6366f1 0%, #6092f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.user-col {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 2px solid white;
  box-shadow: 0 3px 10px rgba(99, 102, 241, 0.2);
  transition: transform 0.3s ease;
}

.user-col:hover .user-img {
  transform: scale(1.1);
}

.user-col div {
  font-weight: 500;
  color: #4a4a68;
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-style: italic;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px dashed #e5e7eb;
}

/* Animation d'entrée */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.skill-row {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.skill-row:nth-child(1) { animation-delay: 0.1s; }
.skill-row:nth-child(2) { animation-delay: 0.2s; }
.skill-row:nth-child(3) { animation-delay: 0.3s; }
.skill-row:nth-child(4) { animation-delay: 0.4s; }
.skill-row:nth-child(5) { animation-delay: 0.5s; }

/* Badge pour le score */
.skills-table td:nth-child(3) {
  position: relative;
}

.skills-table td:nth-child(3)::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 24px;
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border-radius: 12px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: -1;
}

/* Responsive styles */
@media (max-width: 992px) {
  .skills-table th, .skills-table td {
    padding: 12px 15px;
    font-size: 0.9rem;
  }
  
  .skills-table th:nth-child(4), 
  .skills-table td:nth-child(4) {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 768px) {
  .history-container {
    padding: 1.5rem;
    margin: 1rem 0.5rem;
  }
  
  .filters {
    flex-direction: column;
    gap: 1rem;
  }
  
  strong {
    font-size: 1.5rem;
  }
  
  .skills-table {
    display: block;
    overflow-x: auto;
  }
  
  .skills-table th:nth-child(4),
  .skills-table td:nth-child(4) {
    min-width: 150px;
  }
  
  .user-col {
    flex-direction: row;
  }
}

@media (max-width: 480px) {
  select {
    width: 100%;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .user-img {
    width: 30px;
    height: 30px;
  }
}
</style>