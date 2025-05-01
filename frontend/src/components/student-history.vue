<template>
  <div class="history-container">
    <h2 class="title">Historique de Étudiants</h2>
    
    <!-- Filters -->
    <div class="filters-section">
      <h3>Filtres</h3>
      <div class="filters-grid">
        <div class="filter-group">
          <label>Par nom</label>
          <input type="text" v-model="filters.name" placeholder="Entrez un nom" class="input" />
        </div>
        
        <div class="filter-group">
          <label>Par periode</label>
          <select v-model="filters.period" class="select">
            <option>01/01/2023-15/04/2025</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Par class</label>
          <select v-model="filters.class" class="select">
            <option>Tous les classes</option>
            <option>G-INF1</option>
            <option>AP2 TD4</option>
            <option>APITD2</option>
            <option>G-INDUS1</option>
            <option>G-INF3</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Par competance</label>
          <select v-model="filters.competence" class="select">
            <option>Tous les competances</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Par projets</label>
          <select v-model="filters.project" class="select">
            <option>Tous les projets</option>
            <option>Projet -002008</option>
          </select>
        </div>
        
        <div class="filter-actions">
          <button class="btn-apply" @click="applyFilters">Apply</button>
          <button class="btn-reset" @click="resetFilters">Reinitialiser</button>
        </div>
      </div>
    </div>
    
    <!-- Students Table -->
    <div class="students-table">
      <div class="table-header">
        <div class="header-cell profile">Profile</div>
        <div class="header-cell">Nom</div>
        <div class="header-cell">Class</div>
        <div class="header-cell">Score Globale</div>
        <div class="header-cell">...</div>
      </div>
      
      <div v-if="filteredStudents.length === 0" class="no-results">
        Aucun étudiant trouvé avec ces critères
      </div>
      
      <div v-for="student in filteredStudents" :key="student.id" class="table-row">
        <div class="cell profile">
          <img :src="student.avatar" :alt="student.name" class="avatar" />
        </div>
        <div class="cell name">{{ student.name }}</div>
        <div class="cell class">{{ student.class }}</div>
        <div class="cell score">{{ student.score }}/5</div>
        <div class="cell">
          <button class="btn-evaluate" @click="evaluate(student)">PROFILE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const filters = ref({
  name: '',
  class: 'Tous les classes',
  project: 'Tous les projets',
  period: '01/01/2023-15/04/2025',
  competence: 'Tous les competances'
});

const activeFilters = ref(false);

const allStudents = ref([
  { 
    id: 1, 
    name: 'Douae', 
    class: 'G-INF1', 
    score: '4', 
    avatar: '/placeholder.svg?height=50&width=50'
  },
  { 
    id: 2, 
    name: 'AMINE jsp', 
    class: 'AP2 TD4', 
    score: '3.5', 
    avatar: '/placeholder.svg?height=50&width=50'
  },
  { 
    id: 3, 
    name: 'Bachire bakali', 
    class: 'APITD2', 
    score: '2.3', 
    avatar: '/placeholder.svg?height=50&width=50'
  },
  { 
    id: 4, 
    name: 'MANAR jss', 
    class: 'G-INDUS1', 
    score: '4.7', 
    avatar: '/placeholder.svg?height=50&width=50'
  },
  { 
    id: 5, 
    name: 'NASSIM ki', 
    class: 'G-INF3', 
    score: '2.8', 
    avatar: '/placeholder.svg?height=50&width=50'
  }
]);

// Computed property for filtered students
const filteredStudents = computed(() => {
  if (!activeFilters.value) {
    return allStudents.value;
  }
  
  return allStudents.value.filter(student => {
    // Filter by name
    if (filters.value.name && !student.name.toLowerCase().includes(filters.value.name.toLowerCase())) {
      return false;
    }
    
    // Filter by class
    if (filters.value.class !== 'Tous les classes' && student.class !== filters.value.class) {
      return false;
    }
    
    // Additional filters would go here
    // For project, period, and competence
    
    return true;
  });
});

const applyFilters = () => {
  activeFilters.value = true;
  console.log('Filters applied:', filters.value);
};

const resetFilters = () => {
  filters.value = {
    name: '',
    class: 'Tous les classes',
    project: 'Tous les projets',
    period: '01/01/2023-15/04/2025',
    competence: 'Tous les competances'
  };
  activeFilters.value = false;
};

const evaluate = (student) => {
  console.log('Evaluate student:', student.name);
};

const report = (student) => {
  console.log('Report student:', student.name);
};
</script>

<style scoped>
.history-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 20px;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1e40af;
}

.filters-section {
  background: #dbeafe;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.filters-section h3 {
  font-size: 1rem;
  color: #1e40af;
  margin-bottom: 15px;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-size: 0.9rem;
  color: #1e40af;
}

.input, .select {
  padding: 8px 12px;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: white;
}

.filter-actions {
  display: flex;
  gap: 10px;
  align-items: flex-end;
  grid-column: 2;
  justify-content: flex-end;
}

.btn-apply {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-apply:hover {
  background: #2563eb;
}

.btn-reset {
  background: white;
  color: #3b82f6;
  border: 1px solid #3b82f6;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-reset:hover {
  background: #f0f9ff;
}

.students-table {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.table-header {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr 100px 100px;
  background: #dbeafe;
  font-weight: 600;
  color: #1e40af;
}

.header-cell {
  padding: 12px;
  border-bottom: 1px solid #bfdbfe;
}

.table-row {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr 100px 100px;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;
}

.table-row:hover {
  background-color: #f0f9ff;
}

.table-row:last-child {
  border-bottom: none;
}

.cell {
  padding: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #dbeafe;
}

.btn-evaluate {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background-color 0.2s;
}

.btn-evaluate:hover {
  background: #2563eb;
}


.no-results {
  padding: 20px;
  text-align: center;
  color: #6b7280;
  font-style: italic;
}

@media (max-width: 768px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-actions {
    grid-column: 1;
  }
  
  .table-header, .table-row {
    grid-template-columns: 60px 1fr 80px 80px;
  }
  
  .header-cell:nth-child(5), .header-cell:nth-child(6),
  .cell:nth-child(5), .cell:nth-child(6) {
    display: none;
  }
}
</style>