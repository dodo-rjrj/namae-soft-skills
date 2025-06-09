<template>
  <div class="dashboard bg-white p-6 min-h-screen">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto">
      <!-- Header with filters -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-blue-800 mb-4 md:mb-0">Dashboard Professeur</h1>
        <div class="flex flex-wrap gap-3">
          <div class="relative">
            <select v-model="filters.class" @change="updateCharts" class="appearance-none bg-white pl-4 pr-10 py-2.5 rounded-xl border-0 shadow-md text-blue-700 font-medium focus:ring-2 focus:ring-blue-300 focus:outline-none">
              <option value="">Toutes les classes</option>
              <option value="G-INF1">G-INF1</option>
              <option value="G-INF2">G-INF2</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <div class="relative">
            <select v-model="filters.project" @change="updateCharts" class="appearance-none bg-white pl-4 pr-10 py-2.5 rounded-xl border-0 shadow-md text-blue-700 font-medium focus:ring-2 focus:ring-blue-300 focus:outline-none">
              <option value="">Tous les projets</option>
              <option value="projet1">Projet 1</option>
              <option value="projet2">Projet 2</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <div class="relative">
            <select v-model="filters.period" @change="updateCharts" class="appearance-none bg-white pl-4 pr-10 py-2.5 rounded-xl border-0 shadow-md text-blue-700 font-medium focus:ring-2 focus:ring-blue-300 focus:outline-none">
              <option value="">Toute l'année</option>
              <option value="S1">Semestre 1</option>
              <option value="S2">Semestre 2</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="(stat, index) in stats" :key="index" 
             class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
          <div class="p-1" :class="stat.topColor">
            <div class="bg-white rounded-xl p-5">
              <div class="flex items-center">
                <div class="p-3 rounded-xl" :class="stat.bgColor">
                  <component :is="stat.icon" class="h-6 w-6 text-white" />
                </div>
                <div class="ml-4">
                  <h2 class="text-sm font-medium text-gray-500">{{ stat.title }}</h2>
                  <p class="text-2xl font-bold" :class="stat.textColor">{{ stat.value }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Recent Actions -->
        <div class="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 overflow-hidden">
          <h2 class="text-xl font-bold text-blue-800 mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Dernières actions
          </h2>
          <ul class="space-y-4">
            <li v-for="(action, index) in recentActions" :key="index" 
                class="relative pl-8 pb-5 border-l-2 last:border-l-0 last:pb-0" :class="action.borderColor">
              <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full" :class="action.bgColor"></div>
              <div class="bg-blue-50 rounded-xl p-4">
                <p class="text-sm font-semibold text-blue-800">{{ action.title }}</p>
                <p class="text-xs text-blue-600 mt-1">{{ action.date }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Charts -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-blue-800 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Visualisations
            </h2>
            <div class="flex space-x-2">
              <button 
                v-for="(type, index) in chartTypes" 
                :key="index"
                @click="activeChartType = type.id"
                :class="[
                  'px-3 py-1 text-sm rounded-md transition-colors',
                  activeChartType === type.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                ]"
              >
                {{ type.name }}
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Radar Chart -->
            <div 
              v-show="activeChartType === 'radar' || activeChartType === 'all'"
              class="bg-blue-50 rounded-xl p-5 h-72 flex items-center justify-center transition-all duration-500"
              :class="{'opacity-100': activeChartType === 'radar' || activeChartType === 'all', 'opacity-0': activeChartType !== 'radar' && activeChartType !== 'all'}"
            >
              <div class="text-center">
                <h3 class="text-blue-800 font-semibold mb-4">Compétences par acteur</h3>
                <div class="relative w-48 h-48 mx-auto">
                  <!-- Radar chart visualization -->
                  <div v-for="(circle, i) in radarCircles" :key="'circle-'+i" 
                       class="absolute border-2 border-blue-200 rounded-full transition-all duration-1000"
                       :style="{
                         inset: `${circle.inset}%`,
                         opacity: circle.opacity
                       }">
                  </div>
                  
                  <!-- Radar lines -->
                  <div v-for="(line, i) in radarLines" :key="'line-'+i" 
                       class="absolute inset-0 flex items-center justify-center transition-all duration-1000">
                    <div class="w-full h-[2px] bg-blue-200"
                         :style="{ transform: `rotate(${line.rotation}deg)` }">
                    </div>
                  </div>
                  
                  <!-- Data points -->
                  <div class="absolute inset-0">
                    <svg viewBox="0 0 100 100" class="w-full h-full">
                      <path :d="radarPath" 
                            fill="rgba(59, 130, 246, 0.2)" 
                            stroke="#3b82f6" 
                            stroke-width="2"
                            class="transition-all duration-1000">
                      </path>
                      <circle 
                        v-for="(point, i) in radarPoints" 
                        :key="'point-'+i"
                        :cx="point.x" 
                        :cy="point.y" 
                        r="3" 
                        fill="#3b82f6"
                        class="transition-all duration-1000">
                      </circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Line Chart -->
            <div 
              v-show="activeChartType === 'line' || activeChartType === 'all'"
              class="bg-blue-50 rounded-xl p-5 h-72 flex items-center justify-center transition-all duration-500"
              :class="{'opacity-100': activeChartType === 'line' || activeChartType === 'all', 'opacity-0': activeChartType !== 'line' && activeChartType !== 'all'}"
            >
              <div class="text-center w-full">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-blue-800 font-semibold">Évolution temporelle</h3>
                  <div class="flex space-x-2">
                    <button 
                      v-for="(period, i) in timePeriods" 
                      :key="i"
                      @click="activeTimePeriod = period.id"
                      :class="[
                        'px-2 py-1 text-xs rounded',
                        activeTimePeriod === period.id 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-100 text-blue-800'
                      ]"
                    >
                      {{ period.name }}
                    </button>
                  </div>
                </div>
                <div class="w-full h-40 relative">
                  <!-- Line chart visualization -->
                  <div class="absolute bottom-0 left-0 w-full h-[2px] bg-blue-300"></div>
                  <div class="absolute bottom-0 left-0 h-full w-[2px] bg-blue-300"></div>
                  
                  <!-- Grid lines -->
                  <div v-for="(line, i) in [1, 2, 3]" :key="'grid-'+i"
                       class="absolute left-0 w-full h-[1px] bg-blue-200"
                       :style="{ bottom: `${25 * line}%` }">
                  </div>
                  
                  <!-- Data line -->
                  <div class="absolute bottom-0 left-0 w-full h-full">
                    <svg viewBox="0 0 100 50" class="w-full h-full">
                      <path :d="linePath" 
                            fill="none" 
                            stroke="#3b82f6" 
                            stroke-width="2"
                            class="transition-all duration-1000">
                      </path>
                      <path :d="lineAreaPath" 
                            fill="url(#gradient)" 
                            stroke="none"
                            class="transition-all duration-1000">
                      </path>
                      
                      <!-- Gradient definition -->
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stop-color="rgba(59, 130, 246, 0.5)" />
                          <stop offset="100%" stop-color="rgba(59, 130, 246, 0)" />
                        </linearGradient>
                      </defs>
                      
                      <!-- Data points -->
                      <circle 
                        v-for="(point, i) in linePoints" 
                        :key="'linepoint-'+i"
                        :cx="point.x" 
                        :cy="point.y" 
                        r="3" 
                        fill="#3b82f6"
                        class="transition-all duration-1000 hover:r-4">
                      </circle>
                    </svg>
                  </div>
                  
                  <!-- Tooltips -->
                  <div 
                    v-for="(point, i) in linePoints" 
                    :key="'tooltip-'+i"
                    class="absolute bg-white px-2 py-1 rounded shadow-md text-xs text-blue-800 transform -translate-x-1/2 -translate-y-full opacity-0 hover:opacity-100 transition-opacity"
                    :style="{ 
                      left: `${point.x}%`, 
                      bottom: `calc(${point.y}% + 10px)` 
                    }">
                    {{ point.label }}: {{ point.value }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Access Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <button v-for="(action, index) in quickActions" :key="index"
                @click="executeAction(action)"
                class="flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group">
          <div class="p-4 rounded-full bg-blue-100 group-hover:bg-blue-600 transition-colors duration-200">
            <component :is="action.icon" class="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-200" />
          </div>
          <span class="font-semibold text-blue-800">{{ action.title }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Icons would normally be imported from a library like lucide-vue-next
// For simplicity, I'm using placeholder components
const ClipboardIcon = { 
  template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>' 
};
const AlertIcon = { 
  template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>' 
};
const ChartIcon = { 
  template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>' 
};
const UserIcon = { 
  template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>' 
};
const CompareIcon = { 
  template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>' 
};
const DownloadIcon = { 
  template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>' 
};

// Filters
const filters = ref({
  class: '',
  project: '',
  period: ''
});

// Chart types
const chartTypes = ref([
  { id: 'all', name: 'Tous' },
  { id: 'radar', name: 'Compétences' },
  { id: 'line', name: 'Évolution' }
]);

const activeChartType = ref('all');

// Time periods for line chart
const timePeriods = ref([
  { id: 'week', name: 'Semaine' },
  { id: 'month', name: 'Mois' },
  { id: 'semester', name: 'Semestre' }
]);

const activeTimePeriod = ref('month');

// Stats
const stats = ref([
  { 
    title: 'Évaluations faites', 
    value: '124', 
    icon: ClipboardIcon, 
    bgColor: 'bg-blue-600',
    topColor: 'bg-blue-600',
    textColor: 'text-blue-600'
  },
  { 
    title: 'Évaluations à faire', 
    value: '18', 
    icon: ClipboardIcon, 
    bgColor: 'bg-amber-500',
    topColor: 'bg-amber-500',
    textColor: 'text-amber-500'
  },
  { 
    title: 'Alertes en attente', 
    value: '7', 
    icon: AlertIcon, 
    bgColor: 'bg-red-500',
    topColor: 'bg-red-500',
    textColor: 'text-red-500'
  },
  { 
    title: 'Moyenne générale', 
    value: '14.8', 
    icon: ChartIcon, 
    bgColor: 'bg-green-500',
    topColor: 'bg-green-500',
    textColor: 'text-green-500'
  }
]);

// Recent actions
const recentActions = ref([
  {
    title: 'Évaluation de Thomas Durant',
    date: 'Aujourd\'hui, 14:30',
    bgColor: 'bg-blue-600',
    borderColor: 'border-blue-300'
  },
  {
    title: 'Signalement: Baisse de Marie Dupont',
    date: 'Hier, 10:15',
    bgColor: 'bg-red-500',
    borderColor: 'border-red-300'
  },
  {
    title: 'Auto-évaluation de Lucas Martin',
    date: '12 Oct, 16:45',
    bgColor: 'bg-green-500',
    borderColor: 'border-green-300'
  }
]);

// Quick actions
const quickActions = ref([
  {
    title: 'Évaluer un étudiant',
    icon: UserIcon
  },
  {
    title: 'Voir les alertes',
    icon: AlertIcon
  },
  {
    title: 'Comparer évaluations',
    icon: CompareIcon
  },
  {
    title: 'Télécharger rapports',
    icon: DownloadIcon
  }
]);

// Radar chart data
const radarSkills = ref([
  { name: 'Communication', value: 80 },
  { name: 'Leadership', value: 65 },
  { name: 'Travail d\'équipe', value: 90 },
  { name: 'Résolution de problèmes', value: 75 },
  { name: 'Créativité', value: 60 },
  { name: 'Adaptabilité', value: 85 },
  { name: 'Organisation', value: 70 },
  { name: 'Esprit critique', value: 80 }
]);

// Line chart data
const lineData = ref({
  week: [
    { x: 0, y: 40, label: 'Lun', value: 3.0 },
    { x: 20, y: 30, label: 'Mar', value: 3.5 },
    { x: 40, y: 35, label: 'Mer', value: 3.2 },
    { x: 60, y: 15, label: 'Jeu', value: 4.2 },
    { x: 80, y: 25, label: 'Ven', value: 3.8 },
    { x: 100, y: 10, label: 'Sam', value: 4.5 }
  ],
  month: [
    { x: 0, y: 40, label: 'Sem 1', value: 3.0 },
    { x: 20, y: 30, label: 'Sem 2', value: 3.5 },
    { x: 40, y: 35, label: 'Sem 3', value: 3.2 },
    { x: 60, y: 15, label: 'Sem 4', value: 4.2 },
    { x: 80, y: 25, label: 'Sem 5', value: 3.8 },
    { x: 100, y: 10, label: 'Sem 6', value: 4.5 }
  ],
  semester: [
    { x: 0, y: 35, label: 'Jan', value: 3.2 },
    { x: 20, y: 30, label: 'Fév', value: 3.5 },
    { x: 40, y: 25, label: 'Mar', value: 3.8 },
    { x: 60, y: 15, label: 'Avr', value: 4.2 },
    { x: 80, y: 20, label: 'Mai', value: 4.0 },
    { x: 100, y: 10, label: 'Juin', value: 4.5 }
  ]
});

// Radar chart computed properties
const radarCircles = ref([
  { inset: 0, opacity: 0.25 },
  { inset: 15, opacity: 0.5 },
  { inset: 30, opacity: 0.75 },
  { inset: 45, opacity: 1 }
]);

const radarLines = ref([
  { rotation: 0 },
  { rotation: 45 },
  { rotation: 90 },
  { rotation: 135 }
]);

// Calculate radar chart points
const radarPoints = computed(() => {
  const points = [];
  const centerX = 50;
  const centerY = 50;
  const radius = 30;
  
  radarSkills.value.forEach((skill, index) => {
    const angle = (Math.PI * 2 * index) / radarSkills.value.length;
    const value = skill.value / 100; // Normalize to 0-1
    const x = centerX + radius * value * Math.cos(angle - Math.PI/2);
    const y = centerY + radius * value * Math.sin(angle - Math.PI/2);
    points.push({ x, y });
  });
  
  return points;
});

// Create radar path
const radarPath = computed(() => {
  if (radarPoints.value.length === 0) return '';
  
  let path = `M ${radarPoints.value[0].x} ${radarPoints.value[0].y}`;
  
  for (let i = 1; i < radarPoints.value.length; i++) {
    path += ` L ${radarPoints.value[i].x} ${radarPoints.value[i].y}`;
  }
  
  path += ' Z'; // Close the path
  return path;
});

// Line chart computed properties
const linePoints = computed(() => {
  return lineData.value[activeTimePeriod.value];
});

const linePath = computed(() => {
  if (linePoints.value.length === 0) return '';
  
  let path = `M ${linePoints.value[0].x} ${linePoints.value[0].y}`;
  
  for (let i = 1; i < linePoints.value.length; i++) {
    path += ` L ${linePoints.value[i].x} ${linePoints.value[i].y}`;
  }
  
  return path;
});

const lineAreaPath = computed(() => {
  if (linePoints.value.length === 0) return '';
  
  let path = linePath.value;
  path += ` L ${linePoints.value[linePoints.value.length - 1].x} 50`;
  path += ` L ${linePoints.value[0].x} 50 Z`;
  
  return path;
});

// Methods
const updateCharts = () => {
  // Update radar chart data based on filters
  const classFilter = filters.value.class;
  const projectFilter = filters.value.project;
  const periodFilter = filters.value.period;
  
  // Simulate data changes based on filters
  radarSkills.value = radarSkills.value.map(skill => {
    // Generate a random variation between -15 and +15
    const variation = Math.floor(Math.random() * 30) - 15;
    // Ensure the value stays between 0 and 100
    const newValue = Math.max(0, Math.min(100, skill.value + variation));
    return { ...skill, value: newValue };
  });
  
  // Update line chart data
  Object.keys(lineData.value).forEach(period => {
    lineData.value[period] = lineData.value[period].map(point => {
      // Generate a random variation between -10 and +10
      const variation = Math.floor(Math.random() * 20) - 10;
      // Ensure the y value stays between 0 and 50
      const newY = Math.max(0, Math.min(50, point.y + variation));
      // Update the value based on the y position (inverse relationship)
      const newValue = ((50 - newY) / 10).toFixed(1);
      return { ...point, y: newY, value: newValue };
    });
  });
};

const executeAction = (action) => {
  console.log('Action exécutée:', action.title);
  // Here you would implement the actual action
  updateCharts(); // For demo purposes, update charts when an action is executed
};

// Watch for changes in time period
watch(activeTimePeriod, () => {
  // This would typically fetch new data for the selected time period
  console.log('Période changée:', activeTimePeriod.value);
});

// Initialize with random data
onMounted(() => {
  // Simulate initial data load
  updateCharts();
  
  // Set up interval for periodic updates (every 30 seconds)
  setInterval(() => {
    // Simulate real-time data updates
    updateCharts();
  }, 30000);
});
</script>

<style scoped>
/* Add any custom styles here */
</style>