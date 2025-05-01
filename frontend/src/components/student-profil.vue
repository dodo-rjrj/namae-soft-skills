<template>
  <div class="profile-container">
    <h2 class="profile-title">Profil de l'Étudiant:</h2>
    
    <div class="profile-content">
      <!-- Informations personnelles et score -->
      <div class="personal-info-section">
        <div class="personal-details">
          <div class="info-row">
            <span class="info-label">NOM COMPLET:</span>
            <span class="info-value">{{ student.name }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">FILIERE:</span>
            <span class="info-value">{{ student.major }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Date de naissance:</span>
            <span class="info-value">{{ student.birthDate }}</span>
          </div>
          
          <div class="action-buttons">
            <button class="btn-report" @click="reportStudent">signaler</button>
            <button class="btn-evaluate" @click="evaluateStudent">evaluer</button>
          </div>
        </div>
        
        <div class="score-container">
          <div class="score-box">
            <div class="score-label">SCORE:</div>
            <div class="score-value">{{ student.score }}</div>
            <div class="score-max">/5</div>
          </div>
        </div>
        
        <div class="profile-picture">
          <img :src="student.avatar" :alt="student.name" class="avatar" />
          <div class="username">@{{ student.username }}</div>
        </div>
      </div>
      
     
      <SoftSkillCards/>
      <!-- Graphique de progression -->
      <div class="progression-section">
        <div class="progression-header">
          <h3 class="section-title">Graphique de progression:</h3>
          <select v-model="selectedView" class="view-select" @change="updateChartView">
            <option value="both">Les deux</option>
            <option value="class">Moyen de classe</option>
            <option value="individual">Individuel</option>
          </select>
        </div>
        
        <div class="chart-container">
          <!-- Chart visualization -->
          <div class="chart">
            <!-- Y-axis labels -->
            <div class="y-axis">
              <div class="y-label">5</div>
              <div class="y-label">2.5</div>
              <div class="y-label">0</div>
            </div>
            
            <!-- Chart content -->
            <div class="chart-content">
              <!-- Grid lines -->
              <div class="grid-line" style="top: 0%"></div>
              <div class="grid-line" style="top: 50%"></div>
              <div class="grid-line" style="top: 100%"></div>
              
              <!-- Student line (yellow) -->
              <svg v-if="showIndividualLine" class="chart-svg" viewBox="0 0 600 200" preserveAspectRatio="none">
                <polyline
                  :points="getChartPoints(studentData)"
                  stroke="#fbbf24"
                  stroke-width="3"
                  fill="none"
                />
                <!-- Data points -->
                <circle 
                  v-for="(point, index) in studentDataPoints" 
                  :key="'student-' + index"
                  :cx="point.x" 
                  :cy="point.y" 
                  r="4" 
                  fill="#fbbf24" 
                />
              </svg>
              
              <!-- Class average line (blue) -->
              <svg v-if="showClassLine" class="chart-svg" viewBox="0 0 600 200" preserveAspectRatio="none">
                <polyline
                  :points="getChartPoints(classData)"
                  stroke="#93c5fd"
                  stroke-width="3"
                  fill="none"
                />
                <!-- Data points -->
                <circle 
                  v-for="(point, index) in classDataPoints" 
                  :key="'class-' + index"
                  :cx="point.x" 
                  :cy="point.y" 
                  r="4" 
                  fill="#93c5fd" 
                />
              </svg>
              
              <!-- X-axis labels -->
              <div class="x-labels">
                <div v-for="(month, index) in months" :key="index" class="x-label">
                  {{ month }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Legend -->
          <div class="chart-legend">
            <div v-if="showIndividualLine" class="legend-item">
              <div class="legend-color" style="background-color: #fbbf24;"></div>
              <div class="legend-text">RAJEI {{ student.name }}</div>
            </div>
            <div v-if="showClassLine" class="legend-item">
              <div class="legend-color" style="background-color: #93c5fd;"></div>
              <div class="legend-text">MOYEN DE CLASS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SoftSkillCards from './components/SoftSkillCards.vue'

// Student data
const student = ref({
  name: 'Douae',
  major: 'GINF-1',
  birthDate: '27-01-2004',
  score: '4.2',
  username: 'douae',
  avatar: '/placeholder.svg?height=80&width=80'
});

// Competences data
const competences = ref([
  { name: 'Communication', score: 4.9 },
  { name: 'Adaptability', score: 4.5 },
  { name: 'Teamwork', score: 3.9 },
  { name: 'Organisation', score: 3.4 }
]);

const activeCompetenceIndex = ref(0);
const selectedView = ref('both');

// Months for the chart
const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'];

// Chart data
const studentData = ref([0.8, 4.2, 3.5, 2.5, 2.3, 2.0, 4.0]);
const classData = ref([0.5, 1.2, 0.8, 1.0, 1.5, 1.0, 2.5]);

// Computed properties for chart visibility
const showIndividualLine = computed(() => {
  return selectedView.value === 'both' || selectedView.value === 'individual';
});

const showClassLine = computed(() => {
  return selectedView.value === 'both' || selectedView.value === 'class';
});

// Calculate chart points
const getChartPoints = (dataArray) => {
  const width = 600;
  const height = 200;
  const segmentWidth = width / (dataArray.length - 1);
  
  let points = '';
  dataArray.forEach((value, index) => {
    // Convert value to y-coordinate (0 = bottom, 5 = top)
    // Invert y-axis (SVG 0 is at top)
    const x = index * segmentWidth;
    const y = height - (value / 5 * height);
    points += `${x},${y} `;
  });
  
  return points.trim();
};

// Generate data points for SVG circles
const studentDataPoints = computed(() => {
  const width = 600;
  const height = 200;
  const segmentWidth = width / (studentData.value.length - 1);
  
  return studentData.value.map((value, index) => {
    const x = index * segmentWidth;
    const y = height - (value / 5 * height);
    return { x, y };
  });
});

const classDataPoints = computed(() => {
  const width = 600;
  const height = 200;
  const segmentWidth = width / (classData.value.length - 1);
  
  return classData.value.map((value, index) => {
    const x = index * segmentWidth;
    const y = height - (value / 5 * height);
    return { x, y };
  });
});

// Navigation for competences
const nextCompetence = () => {
  activeCompetenceIndex.value = (activeCompetenceIndex.value + 1) % competences.value.length;
};

// Update chart view based on selection
const updateChartView = () => {
  console.log('View changed to:', selectedView.value);
};

// Actions
const evaluateStudent = () => {
  console.log('Evaluate student:', student.value.name);
};

const reportStudent = () => {
  console.log('Report student:', student.value.name);
};
</script>

<style scoped>
.profile-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 20px;
}

.profile-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1e40af;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Personal info section */
.personal-info-section {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 20px;
  background-color: #f0f9ff;
  border-radius: 10px;
  padding: 20px;
}

.personal-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-label {
  font-weight: 600;
  color: #1e40af;
  min-width: 150px;
}

.info-value {
  color: #1e293b;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn-report {
  background: #fef3c7;
  color: #92400e;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.btn-report:hover {
  background: #fde68a;
}

.btn-evaluate {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.btn-evaluate:hover {
  background: #2563eb;
}

.score-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.score-box {
  background-color: #dbeafe;
  border-radius: 10px;
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 5px rgba(59, 130, 246, 0.1);
}

.score-label {
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 5px;
}

.score-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e40af;
  line-height: 1;
}

.score-max {
  font-size: 1.2rem;
  color: #64748b;
}

.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #dbeafe;
  border: 3px solid #3b82f6;
}

.username {
  font-size: 0.9rem;
  color: #64748b;
}

/* Progression section */
.progression-section {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.progression-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.view-select {
  padding: 6px 12px;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: white;
  color: #1e40af;
  cursor: pointer;
  transition: all 0.2s;
}

.view-select:hover {
  border-color: #3b82f6;
}

.chart-container {
  padding: 10px;
}

.chart {
  display: flex;
  height: 200px;
  position: relative;
  margin-bottom: 30px;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 10px;
  width: 30px;
}

.y-label {
  font-size: 0.8rem;
  color: #64748b;
}

.chart-content {
  flex-grow: 1;
  position: relative;
  border-left: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.grid-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #e2e8f0;
}

.chart-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.x-labels {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: -25px;
  left: 0;
  width: 100%;
}

.x-label {
  font-size: 0.7rem;
  color: #64748b;
  transform: rotate(-45deg);
  transform-origin: top left;
  white-space: nowrap;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-text {
  font-size: 0.8rem;
  color: #64748b;
}


</style>