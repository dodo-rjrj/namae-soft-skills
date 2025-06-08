<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Titre -->
      <div class="text-center mb-8 bg-white rounded-2xl p-6 shadow-lg">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Analyse des Soft Skills
        </h1>
      </div>
      
      <!-- Sélection des compétences -->
      <div class="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center">
          Choisissez la soft skill à analyser
        </h3>
        <div class="flex flex-wrap justify-center gap-3 mb-4">
          <button 
            v-for="skill in skills" 
            :key="skill.id" 
            @click="selectSkill(skill)"
            :class="[
              'px-4 py-2 rounded-full font-medium transition-all duration-300',
              selectedSkill?.id === skill.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            ]"
          >
            {{ skill.name }}
          </button>
          <button class="w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            +
          </button>
        </div>
      </div>
      
      <!-- Contenu d'analyse -->
      <div v-if="selectedSkill" class="space-y-6">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">
          Analyse de : "{{ selectedSkill.name }}"
        </h2>
        
        <!-- Cartes d'analyse -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Progression temporelle -->
          <div class="bg-white rounded-2xl p-6 shadow-lg col-span-2">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Progression dans le temps</h3>
            <div class="h-64 relative">
              <svg viewBox="0 0 500 200" class="w-full h-full">
                <!-- Grille de fond -->
                <defs>
                  <pattern id="grid" width="50" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 25" fill="none" stroke="#f3f4f6" stroke-width="1"/>
                  </pattern>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#3b82f6"/>
                    <stop offset="100%" stop-color="#8b5cf6"/>
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="rgba(59, 130, 246, 0.2)"/>
                    <stop offset="100%" stop-color="rgba(59, 130, 246, 0)"/>
                  </linearGradient>
                </defs>
                
                <!-- Grille -->
                <rect width="500" height="200" fill="url(#grid)" />
                
                <!-- Axes principaux -->
                <line x1="60" y1="170" x2="460" y2="170" stroke="#374151" stroke-width="2"/>
                <line x1="60" y1="170" x2="60" y2="30" stroke="#374151" stroke-width="2"/>
                
                <!-- Lignes de grille horizontales -->
                <line v-for="i in 5" :key="'hgrid-'+i" 
                      x1="60" :y1="170 - i * 28" 
                      x2="460" :y2="170 - i * 28" 
                      stroke="#e5e7eb" stroke-width="1" stroke-dasharray="2,2"/>
                
                <!-- Labels Y (pourcentages) -->
                <text v-for="(label, i) in yLabels" :key="'ylabel-'+i" 
                      x="50" :y="175 - i * 28" 
                      text-anchor="end" 
                      class="text-xs fill-gray-600 font-medium">
                  {{ label }}
                </text>
                
                <!-- Labels X (mois) -->
                <text v-for="(month, i) in months" :key="'xlabel-'+i" 
                      :x="80 + i * 65" y="190" 
                      text-anchor="middle" 
                      class="text-xs fill-gray-600 font-medium">
                  {{ month }}
                </text>
                
                <!-- Zone sous la courbe -->
                <path :d="progressionAreaPath" 
                      fill="url(#areaGradient)" 
                      class="transition-all duration-1000"/>
                
                <!-- Ligne de progression principale -->
                <path :d="progressionPath" 
                      fill="none" 
                      stroke="url(#progressGradient)" 
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="transition-all duration-1000"/>
                
                <!-- Points de données avec animation -->
                <g v-for="(point, i) in progressionData" :key="'point-'+i">
                  <circle :cx="80 + i * 65" 
                          :cy="170 - (point.value * 1.4)" 
                          r="6" 
                          fill="#ffffff"
                          stroke="#3b82f6"
                          stroke-width="3"
                          class="hover:r-8 transition-all cursor-pointer drop-shadow-lg">
                  </circle>
                  <!-- Valeurs au-dessus des points -->
                  <text :x="80 + i * 65" 
                        :y="160 - (point.value * 1.4)" 
                        text-anchor="middle" 
                        class="text-xs fill-gray-700 font-semibold">
                    {{ point.value.toFixed(2) }}%
                  </text>
                </g>
                
                <!-- Titre des axes -->
                <text x="260" y="15" text-anchor="middle" class="text-sm fill-gray-700 font-semibold">
                  Progression (%)
                </text>
                <text x="25" y="100" text-anchor="middle" transform="rotate(-90, 25, 100)" 
                      class="text-sm fill-gray-700 font-semibold">
                  Score
                </text>
              </svg>
            </div>
          </div>
          
          <!-- Score actuel -->
          <div class="bg-white rounded-2xl p-6 shadow-lg text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Score actuel</h3>
            <div class="relative w-32 h-32 mx-auto">
              <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" 
                        fill="none" 
                        stroke="#e5e7eb" 
                        stroke-width="8"/>
                <circle cx="50" cy="50" r="40" 
                        fill="none" 
                        stroke="url(#scoreGradient)" 
                        stroke-width="8"
                        stroke-linecap="round"
                        :stroke-dasharray="circumference"
                        :stroke-dashoffset="circumference - (currentScore / 5) * circumference"
                        class="transition-all duration-1000"/>
                <defs>
                  <linearGradient id="scoreGradient">
                    <stop offset="0%" stop-color="#3b82f6"/>
                    <stop offset="100%" stop-color="#8b5cf6"/>
                  </linearGradient>
                </defs>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-bold text-blue-600">{{ currentScore.toFixed(2) }}</span>
                <span class="text-sm text-gray-500">/5</span>
              </div>
            </div>
          </div>
          
          <!-- Comparaison objectif -->
          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Vs Objectif</h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Actuel</span>
                  <span>{{ currentScore.toFixed(2) }}/5</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                       :style="{ width: (currentScore / 5) * 100 + '%' }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Objectif</span>
                  <span>{{ targetScore.toFixed(2) }}/5</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-purple-500 h-3 rounded-full transition-all duration-1000"
                       :style="{ width: (targetScore / 5) * 100 + '%' }"></div>
                </div>
              </div>
              <div class="text-center">
                <span :class="['text-sm font-medium', 
                              currentScore >= targetScore ? 'text-green-600' : 'text-orange-600']">
                  {{ currentScore >= targetScore ? '🎯 Objectif atteint!' : `📈 ${(targetScore - currentScore).toFixed(2)} points restants` }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Analyse détaillée -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Évolution par projet -->
          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Évolution par projet</h3>
            <div class="space-y-4">
              <div v-for="(project, i) in projectEvolution" :key="i" 
                   class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div class="font-medium text-gray-800">{{ project.name }}</div>
                  <div class="text-sm text-gray-500">{{ project.date }}</div>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-20 bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                         :style="{ width: project.score + '%' }"></div>
                  </div>
                  <span class="text-sm font-medium text-gray-700">{{ project.score.toFixed(2) }}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Commentaires et recommandations -->
          <div class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Analyse IA</h3>
            <div class="space-y-4">
              <div class="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <p class="text-gray-700 leading-relaxed">
                  {{ aiAnalysis }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="text-2xl">{{ trendEmoji }}</span>
                  <span class="font-medium text-gray-700">{{ trendText }}</span>
                </div>
                <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Voir plus →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const skills = ref([
  { id: 1, name: 'Organisation' },
  { id: 2, name: 'Communication' },
  { id: 3, name: 'Leadership' },
  { id: 4, name: 'Créativité' },
  { id: 5, name: 'Résolution de problèmes' },
  { id: 6, name: 'Gestion du temps' }
])

const selectedSkill = ref(null)
const currentScore = ref(4.3)
const targetScore = ref(4.8)

// Données pour les graphiques
const progressionData = ref([
  { value: 30 }, { value: 45 }, { value: 52 }, { value: 68 }, { value: 75 }, { value: 86 }
])

const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin']
const yLabels = ['0%', '20%', '40%', '60%', '80%', '100%']

const projectEvolution = ref([
  { name: 'Projet Web', date: 'Mars 2024', score: 65 },
  { name: 'App Mobile', date: 'Avril 2024', score: 78 },
  { name: 'Dashboard', date: 'Mai 2024', score: 86 },
  { name: 'API REST', date: 'Juin 2024', score: 92 }
])

// Computed properties
const circumference = computed(() => 2 * Math.PI * 40)

const progressionPath = computed(() => {
  let path = `M 80 ${170 - progressionData.value[0].value * 1.4}`
  for (let i = 1; i < progressionData.value.length; i++) {
    path += ` L ${80 + i * 65} ${170 - progressionData.value[i].value * 1.4}`
  }
  return path
})

const progressionAreaPath = computed(() => {
  let path = `M 80 170`
  path += ` L 80 ${170 - progressionData.value[0].value * 1.4}`
  for (let i = 1; i < progressionData.value.length; i++) {
    path += ` L ${80 + i * 65} ${170 - progressionData.value[i].value * 1.4}`
  }
  path += ` L ${80 + (progressionData.value.length - 1) * 65} 170 Z`
  return path
})

const aiAnalysis = computed(() => {
  if (!selectedSkill.value) return ''
  
  const analyses = {
    'Organisation': 'Excellente progression dans l\'organisation. Vos méthodes de planification se sont considérablement améliorées.',
    'Communication': 'Forte amélioration dans la communication écrite et orale. Continuez à pratiquer les présentations.',
    'Leadership': 'Développement notable du leadership. Votre capacité à motiver l\'équipe s\'améliore.',
    'Créativité': 'Créativité en hausse constante. Vos solutions innovantes sont remarquées.',
    'Résolution de problèmes': 'Approche analytique renforcée. Vous trouvez des solutions efficaces rapidement.',
    'Gestion du temps': 'Gestion du temps optimisée. Respect des délais et priorisation maîtrisés.'
  }
  
  return analyses[selectedSkill.value.name] || 'Analyse en cours...'
})

const trendEmoji = computed(() => {
  const lastTwo = progressionData.value.slice(-2)
  if (lastTwo[1].value > lastTwo[0].value) return '📈'
  if (lastTwo[1].value < lastTwo[0].value) return '📉'
  return '➡️'
})

const trendText = computed(() => {
  const lastTwo = progressionData.value.slice(-2)
  const diff = lastTwo[1].value - lastTwo[0].value
  if (diff > 5) return 'Forte progression'
  if (diff > 0) return 'Progression stable'
  if (diff < -5) return 'Baisse significative'
  return 'Stagnation'
})

// Methods
const selectSkill = (skill) => {
  selectedSkill.value = skill
  updateDataForSkill(skill)
}

const updateDataForSkill = (skill) => {
  const baseValues = [30, 45, 52, 68, 75, 86]
  const variation = skill.id * 5
  
  progressionData.value = baseValues.map(value => ({
    value: parseFloat(Math.min(100, Math.max(0, value + (Math.random() - 0.5) * variation)).toFixed(2))
  }))
  
  currentScore.value = parseFloat((3 + Math.random() * 2).toFixed(2))
  targetScore.value = parseFloat(Math.min(5, currentScore.value + 0.3 + Math.random() * 0.5).toFixed(2))
  
  projectEvolution.value = projectEvolution.value.map(project => ({
    ...project,
    score: parseFloat(Math.min(100, Math.max(20, project.score + (Math.random() - 0.5) * 20)).toFixed(2))
  }))
}

// Initialiser avec la première compétence
if (skills.value.length > 0) {
  selectSkill(skills.value[0])
}
</script>