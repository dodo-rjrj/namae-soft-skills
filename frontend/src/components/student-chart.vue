<template>
  <div class="chart-wrapper">
    <!-- Graphique de progression avec Chart.js -->
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
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>

    <!-- Points forts et faibles en soft skills -->
    <div class="soft-skills-section">
      <h3 class="section-title">Analyse des Soft Skills</h3>
      
      <div class="skills-container">
        <div class="skills-column">
          <h4 class="skills-subtitle">Points Forts</h4>
          <ul class="skills-list strengths">
            <li v-for="(skill, index) in strengths" :key="'strength-'+index" class="skill-item">
              <div class="skill-details">
                <div class="skill-name">{{ skill.name }}</div>
                <div class="skill-score">
                  <div class="score-bar">
                    <div class="score-fill" :style="{ width: (skill.score * 20) + '%' }"></div>
                  </div>
                  <span class="score-value">{{ skill.score }}/5</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="skills-column">
          <h4 class="skills-subtitle">Points à Améliorer</h4>
          <ul class="skills-list weaknesses">
            <li v-for="(skill, index) in weaknesses" :key="'weakness-'+index" class="skill-item">
              <div class="skill-details">
                <div class="skill-name">{{ skill.name }}</div>
                <div class="skill-score">
                  <div class="score-bar">
                    <div class="score-fill" :style="{ width: (skill.score * 20) + '%' }"></div>
                  </div>
                  <span class="score-value">{{ skill.score }}/5</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

// Student data
const student = ref({
  name: 'Douae',
  username: 'douae',
});

// Chart view selection
const selectedView = ref('both');
const chartCanvas = ref(null);
let progressChart = null;

// Months for the chart
const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'];

// Chart data
const studentData = ref([0.8, 4.2, 3.5, 2.5, 2.3, 2.0, 4.0]);
const classData = ref([0.5, 1.2, 0.8, 1.0, 1.5, 1.0, 2.5]);

// Soft skills data
const strengths = ref([
  { name: 'Communication', score: 4.8 },
  { name: 'Travail d\'équipe', score: 4.5 },
  { name: 'Créativité', score: 4.2 }
]);

const weaknesses = ref([
  { name: 'Gestion du temps', score: 2.5 },
  { name: 'Résolution de problèmes', score: 2.8 },
  { name: 'Présentation', score: 3.0 }
]);

// Initialize and render chart
const initChart = () => {
  if (progressChart) {
    progressChart.destroy();
  }

  const ctx = chartCanvas.value.getContext('2d');
  
  const datasets = [];
  
  if (selectedView.value === 'both' || selectedView.value === 'individual') {
    datasets.push({
      label: `RAJEI ${student.value.name}`,
      data: studentData.value,
      borderColor: '#fbbf24',
      backgroundColor: 'rgba(251, 191, 36, 0.2)',
      borderWidth: 3,
      pointBackgroundColor: '#fbbf24',
      pointBorderColor: '#ffffff',
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.3
    });
  }
  
  if (selectedView.value === 'both' || selectedView.value === 'class') {
    datasets.push({
      label: 'MOYEN DE CLASS',
      data: classData.value,
      borderColor: '#93c5fd',
      backgroundColor: 'rgba(147, 197, 253, 0.2)',
      borderWidth: 3,
      pointBackgroundColor: '#93c5fd',
      pointBorderColor: '#ffffff',
      pointRadius: 5,
      pointHoverRadius: 7,
      tension: 0.3
    });
  }
  
  progressChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 1
          },
          grid: {
            color: '#e2e8f0'
          },
          title: {
            display: true,
            text: 'Niveau de compétence'
          }
        },
        x: {
          grid: {
            color: '#e2e8f0'
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.8)',
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          padding: 12,
          cornerRadius: 8,
          displayColors: true
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      }
    }
  });
};

// Update chart view based on selection
const updateChartView = () => {
  initChart();
};

// Watch for changes in view selection
watch(selectedView, () => {
  updateChartView();
});

// Initialize chart on component mount
onMounted(() => {
  initChart();
});
</script>

<style scoped>
.chart-wrapper {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 20px;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #1e40af;
}

/* Progression section */
.progression-section {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  margin-bottom: 20px;
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
  height: 300px;
  position: relative;
  margin-bottom: 20px;
}

/* Soft Skills Section */
.soft-skills-section {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.skills-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.skills-subtitle {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 2px solid;
}

.strengths .skills-subtitle {
  color: #047857;
  border-color: #047857;
}

.weaknesses .skills-subtitle {
  color: #b91c1c;
  border-color: #b91c1c;
}

.skills-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skill-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: #f8fafc;
}

.skill-details {
  flex: 1;
}

.skill-name {
  font-weight: 500;
  margin-bottom: 4px;
}

.skill-score {
  display: flex;
  align-items: center;
}

.score-bar {
  flex: 1;
  height: 6px;
  background-color: #e2e8f0;
  border-radius: 3px;
  margin-right: 8px;
  overflow: hidden;
}

.strengths .score-fill {
  height: 100%;
  background-color: #10b981;
  border-radius: 3px;
}

.weaknesses .score-fill {
  height: 100%;
  background-color: #ef4444;
  border-radius: 3px;
}

.score-value {
  font-size: 0.8rem;
  color: #64748b;
  min-width: 40px;
  text-align: right;
}

@media (max-width: 768px) {
  .skills-container {
    grid-template-columns: 1fr;
  }
  
  .skills-column:first-child {
    margin-bottom: 20px;
  }
}
</style>