<template>
<div class="dashboard bg-white min-h-screen p-4">
  <!-- Header -->
    <div class="mb-6 flex flex-col sm:flex-row justify-between items-center">
      <h1 class="text-2xl font-bold text-blue-800 mb-3 sm:mb-0">
        <span class="mr-2">📈</span>Tableau de Bord 
      </h1>
      <div class="bg-white rounded-lg shadow p-1">
        <button 
          v-for="p in ['Jour', 'Semaine', 'Mois']" 
          :key="p"
          @click="period = p.toLowerCase()"
          class="px-3 py-1 rounded-md text-sm"
          :class="period === p.toLowerCase() ? 'bg-white text-black' : 'text-blue-600'"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow" v-for="(stat, i) in stats" :key="i">
        <div class="flex justify-between mb-2">
          <span class="text-gray-500">{{ stat.title }}</span>
          <span class="text-2xl">{{ stat.icon }}</span>
        </div>
        <p class="text-xl font-bold text-blue-800">{{ stat.value }}</p>
        <p class="text-sm text-gray-500">
          <span v-if="stat.trend !== undefined" :class="stat.trend > 0 ? 'text-green-500' : 'text-red-500'">
            {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
          </span>
          {{ stat.subtext }}
        </p>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="bg-white text-black p-3">
          <h2 class="font-medium">Nombre d'évaluations</h2>
        </div>
        <div class="p-4 h-64">
          <canvas ref="evalsChart"></canvas>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="bg-white text-black p-3">
          <h2 class="font-medium">Évolution des Soft Skills</h2>
        </div>
        <div class="p-4 h-64">
          <canvas ref="skillsChart"></canvas>
        </div>
      </div>
    </div>
    
    <!-- Statistics by Department -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="bg-white text-black p-3">
        <h2 class="font-medium">Statistiques par Filière</h2>
      </div>
      <div class="p-4 overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-blue-100">
            <tr>
              <th class="px-4 py-2 text-left">Filière</th>
              <th class="px-4 py-2 text-left">Évals</th>
              <th class="px-4 py-2 text-left">Moy. Skills</th>
              <th class="px-4 py-2 text-left">Évolution</th>
              <th class="px-4 py-2 text-left">Tendance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dept in departments" :key="dept.name" class="border-b">
              <td class="px-4 py-3">{{ dept.name }}</td>
              <td class="px-4 py-3">{{ dept.evals }}</td>
              <td class="px-4 py-3 font-medium text-blue-800">{{ dept.avg }}/5</td>
              <td class="px-4 py-3">
                <span :class="dept.growth > 0 ? 'text-green-500' : 'text-red-500'">
                  {{ dept.growth > 0 ? '+' : '' }}{{ dept.growth }}%
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="h-2 rounded-full bg-blue-500" :style="{width: `${dept.trend * 20}%`}"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Soft Skills Report -->
    <div class="bg-white rounded-lg shadow">
      <div class="bg-white text-black p-3">
        <h2 class="font-medium">Rapport sur l'Évolution des Soft Skills</h2>
      </div>
      <div class="p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="skill in softSkills" :key="skill.name" class="bg-blue-50 p-3 rounded">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">{{ skill.name }}</h3>
              <span class="text-xl">{{ skill.icon }}</span>
            </div>
            <div class="mb-2">
              <div class="flex justify-between mb-1">
                <span class="text-sm text-gray-600">Score moyen</span>
                <span class="text-sm font-medium text-blue-800">{{ skill.score }}/5</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="h-2 rounded-full bg-blue-500" :style="{width: `${skill.score * 20}%`}"></div>
              </div>
            </div>
            <p class="text-sm text-gray-600">
              <span :class="skill.growth > 0 ? 'text-green-500' : 'text-red-500'">
                {{ skill.growth > 0 ? '+' : '' }}{{ skill.growth }}%
              </span> 
              depuis la dernière période
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

export default {
  name: 'StatisticsDashboard',
  setup() {
    // Period filter state
    const period = ref('semaine')
    
    // Chart references
    const evalsChart = ref(null)
    const skillsChart = ref(null)
    let evalsChartInstance = null
    let skillsChartInstance = null
    
    // Stats cards data
    const stats = ref([
      { title: 'Total Évaluations', icon: '📊', value: '1247', trend: 8.5, subtext: 'depuis la dernière période' },
      { title: 'Moyenne Soft Skills', icon: '🧠', value: '3.8/5', trend: 4.2, subtext: 'depuis la dernière période' },
      { title: 'Filière Performance', icon: '🏆', value: 'Informatique', subtext: '4.2/5 en moyenne' },
      { title: 'Évaluations', icon: '📅', value: '87', subtext: '92% du quota attendu' }
    ])
    
    // Departments data
    const departments = ref([
      { name: 'Informatique', evals: 425, avg: 4.2, growth: 6.8, trend: 4.5 },
      { name: 'Marketing', evals: 387, avg: 3.9, growth: 3.2, trend: 4.1 },
      { name: 'Finance', evals: 215, avg: 3.7, growth: -1.5, trend: 3.5 },
      { name: 'RH', evals: 170, avg: 4.0, growth: 5.0, trend: 4.3 },
      { name: 'Design', evals: 50, avg: 3.6, growth: 2.1, trend: 3.8 }
    ])
    
    // Soft skills data
    const softSkills = ref([
      { name: 'Communication', score: 4.1, growth: 7.2, icon: '💬' },
      { name: 'Travail d\'équipe', score: 3.9, growth: 3.5, icon: '👥' },
      { name: 'Leadership', score: 3.6, growth: 2.0, icon: '🚀' },
      { name: 'Résolution de problèmes', score: 4.0, growth: 5.3, icon: '🧩' },
      { name: 'Adaptabilité', score: 3.7, growth: -1.2, icon: '🔄' },
      { name: 'Gestion du temps', score: 3.5, growth: 4.7, icon: '⏱️' }
    ])
    
    // Chart data based on period
    const getChartData = (p) => {
      if (p === 'jour') {
        return {
          labels: ['8h', '10h', '12h', '14h', '16h', '18h', '20h'],
          evalsData: [5, 8, 3, 7, 12, 4, 2],
          skillsData1: [3.9, 4.0, 4.0, 4.1, 4.2, 4.1, 4.1],
          skillsData2: [3.7, 3.8, 3.8, 3.9, 3.9, 3.9, 3.9]
        }
      } else if (p === 'semaine') {
        return {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          evalsData: [18, 12, 15, 22, 20, 8, 4],
          skillsData1: [3.8, 3.9, 4.0, 4.1, 4.2, 4.1, 4.1],
          skillsData2: [3.7, 3.7, 3.8, 3.8, 3.9, 3.9, 3.9]
        }
      } else {
        return {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
          evalsData: [78, 92, 105, 121, 132, 91, 85, 72, 98, 120, 110, 140],
          skillsData1: [3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.0, 4.1, 4.1, 4.2, 4.1, 4.1],
          skillsData2: [3.4, 3.5, 3.5, 3.6, 3.7, 3.7, 3.8, 3.8, 3.8, 3.9, 3.9, 3.9]
        }
      }
    }
    
    // Initialize charts
    const initCharts = () => {
      const { labels, evalsData, skillsData1, skillsData2 } = getChartData(period.value)
      
      // Evaluations chart
      const evalsCtx = evalsChart.value.getContext('2d')
      evalsChartInstance = new Chart(evalsCtx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Nombre d\'évaluations',
            data: evalsData,
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          }
        }
      })
      
      // Skills chart
      const skillsCtx = skillsChart.value.getContext('2d')
      skillsChartInstance = new Chart(skillsCtx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Communication',
            data: skillsData1,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Travail d\'équipe',
            data: skillsData2,
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { min: 0, max: 5 }
          }
        }
      })
    }
    
    // Update charts on period change
    const updateCharts = () => {
      const { labels, evalsData, skillsData1, skillsData2 } = getChartData(period.value)
      
      // Update stats card for period evals
      if (period.value === 'jour') {
        stats.value[3].value = '31'
      } else if (period.value === 'semaine') {
        stats.value[3].value = '87'
      } else {
        stats.value[3].value = '329'
      }
      
      // Update charts
      evalsChartInstance.data.labels = labels
      evalsChartInstance.data.datasets[0].data = evalsData
      evalsChartInstance.update()
      
      skillsChartInstance.data.labels = labels
      skillsChartInstance.data.datasets[0].data = skillsData1
      skillsChartInstance.data.datasets[1].data = skillsData2
      skillsChartInstance.update()
    }
    
    // Initialize charts on mount
    onMounted(() => {
      initCharts()
    })
    
    // Watch for period changes
    watch(period, () => {
      updateCharts()
    })
    
    return {
      period,
      stats,
      departments,
      softSkills,
      evalsChart,
      skillsChart
    }
  }
}
</script>