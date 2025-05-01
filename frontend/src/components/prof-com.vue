<template>
  <div class="dashboard bg-blue-50 p-6 min-h-screen">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto">
      <!-- Header with filters -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-blue-800 mb-4 md:mb-0">Dashboard Professeur</h1>
        <div class="flex flex-wrap gap-3">
          <div class="relative">
            <select v-model="filters.class" class="appearance-none bg-white pl-4 pr-10 py-2.5 rounded-xl border-0 shadow-md text-blue-700 font-medium focus:ring-2 focus:ring-blue-300 focus:outline-none">
              <option value="">Toutes les classes</option>
              <option value="terminale">Terminale</option>
              <option value="premiere">Première</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <div class="relative">
            <select v-model="filters.project" class="appearance-none bg-white pl-4 pr-10 py-2.5 rounded-xl border-0 shadow-md text-blue-700 font-medium focus:ring-2 focus:ring-blue-300 focus:outline-none">
              <option value="">Tous les projets</option>
              <option value="projet1">Projet 1</option>
              <option value="projet2">Projet 2</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <div class="relative">
            <select v-model="filters.period" class="appearance-none bg-white pl-4 pr-10 py-2.5 rounded-xl border-0 shadow-md text-blue-700 font-medium focus:ring-2 focus:ring-blue-300 focus:outline-none">
              <option value="">Toute l'année</option>
              <option value="trimestre1">Trimestre 1</option>
              <option value="trimestre2">Trimestre 2</option>
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
          <h2 class="text-xl font-bold text-blue-800 mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Visualisations
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-blue-50 rounded-xl p-5 h-72 flex items-center justify-center">
              <div class="text-center">
                <h3 class="text-blue-800 font-semibold mb-4">Compétences par acteur</h3>
                <div class="relative w-48 h-48 mx-auto">
                  <!-- Radar chart visualization -->
                  <div class="absolute inset-0 border-2 border-blue-200 rounded-full opacity-25"></div>
                  <div class="absolute inset-[15%] border-2 border-blue-300 rounded-full opacity-50"></div>
                  <div class="absolute inset-[30%] border-2 border-blue-400 rounded-full opacity-75"></div>
                  <div class="absolute inset-[45%] border-2 border-blue-500 rounded-full"></div>
                  
                  <!-- Radar lines -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-full h-[2px] bg-blue-200 rotate-0"></div>
                  </div>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-full h-[2px] bg-blue-200 rotate-45"></div>
                  </div>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-full h-[2px] bg-blue-200 rotate-90"></div>
                  </div>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-full h-[2px] bg-blue-200 rotate-135"></div>
                  </div>
                  
                  <!-- Data points -->
                  <div class="absolute inset-0">
                    <svg viewBox="0 0 100 100" class="w-full h-full">
                      <path d="M50,20 L70,30 L80,50 L70,70 L50,80 L30,70 L20,50 L30,30 Z" 
                            fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" stroke-width="2"></path>
                      <circle cx="50" cy="20" r="3" fill="#3b82f6" />
                      <circle cx="70" cy="30" r="3" fill="#3b82f6" />
                      <circle cx="80" cy="50" r="3" fill="#3b82f6" />
                      <circle cx="70" cy="70" r="3" fill="#3b82f6" />
                      <circle cx="50" cy="80" r="3" fill="#3b82f6" />
                      <circle cx="30" cy="70" r="3" fill="#3b82f6" />
                      <circle cx="20" cy="50" r="3" fill="#3b82f6" />
                      <circle cx="30" cy="30" r="3" fill="#3b82f6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-blue-50 rounded-xl p-5 h-72 flex items-center justify-center">
              <div class="text-center w-full">
                <h3 class="text-blue-800 font-semibold mb-4">Évolution temporelle</h3>
                <div class="w-full h-40 relative">
                  <!-- Line chart visualization -->
                  <div class="absolute bottom-0 left-0 w-full h-[2px] bg-blue-300"></div>
                  <div class="absolute bottom-0 left-0 h-full w-[2px] bg-blue-300"></div>
                  
                  <!-- Grid lines -->
                  <div class="absolute bottom-[25%] left-0 w-full h-[1px] bg-blue-200"></div>
                  <div class="absolute bottom-[50%] left-0 w-full h-[1px] bg-blue-200"></div>
                  <div class="absolute bottom-[75%] left-0 w-full h-[1px] bg-blue-200"></div>
                  
                  <!-- Data line -->
                  <div class="absolute bottom-0 left-0 w-full h-full">
                    <svg viewBox="0 0 100 50" class="w-full h-full">
                      <path d="M0,40 L20,30 L40,35 L60,15 L80,25 L100,10" 
                            fill="none" stroke="#3b82f6" stroke-width="2"></path>
                      <path d="M0,40 L20,30 L40,35 L60,15 L80,25 L100,10 L100,50 L0,50 Z" 
                            fill="url(#gradient)" stroke="none"></path>
                      
                      <!-- Gradient definition -->
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stop-color="rgba(59, 130, 246, 0.5)" />
                          <stop offset="100%" stop-color="rgba(59, 130, 246, 0)" />
                        </linearGradient>
                      </defs>
                      
                      <!-- Data points -->
                      <circle cx="0" cy="40" r="3" fill="#3b82f6" />
                      <circle cx="20" cy="30" r="3" fill="#3b82f6" />
                      <circle cx="40" cy="35" r="3" fill="#3b82f6" />
                      <circle cx="60" cy="15" r="3" fill="#3b82f6" />
                      <circle cx="80" cy="25" r="3" fill="#3b82f6" />
                      <circle cx="100" cy="10" r="3" fill="#3b82f6" />
                    </svg>
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
import { ref } from 'vue';

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
</script>