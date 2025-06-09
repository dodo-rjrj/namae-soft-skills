<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Statistiques & Rapports</h1>
      
      <!-- Filtres -->
      <div class="bg-blue-50 rounded-2xl p-6 shadow-lg mb-8 border border-blue-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="space-y-4">
            <div>
              <label class="block text-blue-700 font-medium mb-2">Par projets</label>
              <select v-model="selectedFilters.projet" @change="updateGraphiques" 
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Tous les projets</option>
                <option v-for="projet in projets" :key="projet" :value="projet">{{ projet }}</option>
              </select>
            </div>
            
            <div>
              <label class="block text-blue-700 font-medium mb-2">Par classes</label>
              <select v-model="selectedFilters.classe" @change="updateGraphiques"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Toutes les classes</option>
                <option v-for="classe in classes" :key="classe" :value="classe">{{ classe }}</option>
              </select>
            </div>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-blue-700 font-medium mb-2">Par périodes</label>
              <select v-model="selectedFilters.periode" @change="updateGraphiques"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option v-for="periode in periodes" :key="periode" :value="periode">{{ periode }}</option>
              </select>
            </div>
            
            <div>
              <label class="block text-blue-700 font-medium mb-2">Par compétences</label>
              <select v-model="selectedFilters.competence" @change="updateGraphiques"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Toutes les compétences</option>
                <option v-for="competence in competences" :key="competence" :value="competence">{{ competence }}</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-4">
          <button @click="afficherGraphiques" 
                  class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Appliquer
          </button>
          <button @click="reinitialiser"
                  class="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
            Réinitialiser
          </button>
        </div>
      </div>
      
      <!-- Graphiques -->
      <div v-if="montrerGraphiques" class="space-y-8">
        <!-- Sélecteur de type de graphique -->
        <div class="bg-white rounded-2xl p-6 shadow-lg">
          <h3 class="text-xl font-semibold mb-4">Type de visualisation</h3>
          <div class="flex flex-wrap gap-3">
            <button v-for="type in typesGraphiques" :key="type.id"
                    @click="activeGraphType = type.id"
                    :class="[
                      'px-4 py-2 rounded-lg font-medium transition-all',
                      activeGraphType === type.id 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ]">
              {{ type.name }}
            </button>
          </div>
        </div>

        <!-- Graphiques principaux -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Graphique en barres -->
          <div v-if="activeGraphType === 'barres'" class="bg-white rounded-2xl p-6 shadow-lg">
            <div class="flex justify-between items-center mb-6">
              <div>
                <h3 class="text-xl font-semibold">Moyennes par compétence</h3>
                <p class="text-gray-600 text-sm">Comparaison des scores moyens</p>
              </div>
              <div class="flex space-x-2">
                <button @click="toggleMetric = 'moyenne'" 
                        :class="['px-3 py-1 rounded text-sm', toggleMetric === 'moyenne' ? 'bg-blue-600 text-white' : 'bg-gray-200']">
                  Moyenne
                </button>
                <button @click="toggleMetric = 'mediane'"
                        :class="['px-3 py-1 rounded text-sm', toggleMetric === 'mediane' ? 'bg-blue-600 text-white' : 'bg-gray-200']">
                  Médiane
                </button>
              </div>
            </div>
            
            <div class="h-80">
              <svg viewBox="0 0 600 300" class="w-full h-full">
                <!-- Grille -->
                <defs>
                  <linearGradient id="barGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#3b82f6"/>
                    <stop offset="100%" stop-color="#1d4ed8"/>
                  </linearGradient>
                  <linearGradient id="barGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#8b5cf6"/>
                    <stop offset="100%" stop-color="#7c3aed"/>
                  </linearGradient>
                </defs>
                
                <!-- Axes -->
                <line x1="60" y1="250" x2="580" y2="250" stroke="#374151" stroke-width="2"/>
                <line x1="60" y1="250" x2="60" y2="50" stroke="#374151" stroke-width="2"/>
                
                <!-- Labels Y -->
                <text v-for="i in 5" :key="'ylabel-'+i" 
                      x="50" :y="250 - (i-1) * 40" 
                      text-anchor="end" class="text-xs fill-gray-600">
                  {{ i-1 }}
                </text>
                
                <!-- Barres dynamiques -->
                <g v-for="(item, index) in currentData" :key="index">
                  <!-- Barre utilisateur -->
                  <rect :x="80 + index * 70" 
                        :y="250 - item.userScore * 50" 
                        width="25" 
                        :height="item.userScore * 50"
                        fill="url(#barGradient1)"
                        class="transition-all duration-1000">
                  </rect>
                  
                  <!-- Barre groupe -->
                  <rect :x="110 + index * 70" 
                        :y="250 - item.groupScore * 50" 
                        width="25" 
                        :height="item.groupScore * 50"
                        fill="url(#barGradient2)"
                        class="transition-all duration-1000">
                  </rect>
                  
                  <!-- Labels -->
                  <text :x="105 + index * 70" y="270" 
                        text-anchor="middle" class="text-xs fill-gray-700">
                    {{ item.label.substring(0, 8) }}
                  </text>
                  
                  <!-- Valeurs -->
                  <text :x="92 + index * 70" :y="240 - item.userScore * 50" 
                        text-anchor="middle" class="text-xs fill-blue-600 font-semibold">
                    {{ item.userScore.toFixed(2) }}
                  </text>
                  <text :x="122 + index * 70" :y="240 - item.groupScore * 50" 
                        text-anchor="middle" class="text-xs fill-purple-600 font-semibold">
                    {{ item.groupScore.toFixed(2) }}
                  </text>
                </g>
              </svg>
            </div>
            
            <div class="flex justify-center space-x-6 mt-4">
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-blue-500 rounded"></div>
                <span class="text-sm">Votre moyenne</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-purple-500 rounded"></div>
                <span class="text-sm">Moyenne du groupe</span>
              </div>
            </div>
          </div>
          
          <!-- Graphique radar -->
          <div v-if="activeGraphType === 'radar'" class="bg-white rounded-2xl p-6 shadow-lg">
            <h3 class="text-xl font-semibold mb-6">Distribution des compétences</h3>
            <div class="h-80 flex items-center justify-center">
              <svg viewBox="0 0 300 300" class="w-full h-full max-w-sm">
                <!-- Grilles concentriques -->
                <g v-for="level in 5" :key="'level-'+level">
                  <polygon :points="getRadarPoints(level * 20)" 
                           fill="none" 
                           stroke="#e5e7eb" 
                           stroke-width="1"/>
                </g>
                
                <!-- Axes -->
                <g v-for="(competence, index) in radarCompetences" :key="'axis-'+index">
                  <line x1="150" y1="150" 
                        :x2="150 + Math.cos(index * 2 * Math.PI / radarCompetences.length - Math.PI/2) * 100" 
                        :y2="150 + Math.sin(index * 2 * Math.PI / radarCompetences.length - Math.PI/2) * 100"
                        stroke="#d1d5db" stroke-width="1"/>
                  
                  <!-- Labels -->
                  <text :x="150 + Math.cos(index * 2 * Math.PI / radarCompetences.length - Math.PI/2) * 120" 
                        :y="150 + Math.sin(index * 2 * Math.PI / radarCompetences.length - Math.PI/2) * 120"
                        text-anchor="middle" 
                        class="text-xs fill-gray-700 font-medium">
                    {{ competence.name }}
                  </text>
                </g>
                
                <!-- Zone de données -->
                <polygon :points="getDataPolygon()" 
                         fill="rgba(59, 130, 246, 0.2)" 
                         stroke="#3b82f6" 
                         stroke-width="2"
                         class="transition-all duration-1000"/>
                
                <!-- Points de données -->
                <g v-for="(competence, index) in radarCompetences" :key="'point-'+index">
                  <circle :cx="150 + Math.cos(index * 2 * Math.PI / radarCompetences.length - Math.PI/2) * competence.value * 20" 
                          :cy="150 + Math.sin(index * 2 * Math.PI / radarCompetences.length - Math.PI/2) * competence.value * 20"
                          r="4" 
                          fill="#3b82f6"
                          class="transition-all duration-1000">
                  </circle>
                </g>
              </svg>
            </div>
          </div>
          
          <!-- Graphique linéaire -->
          <div v-if="activeGraphType === 'evolution'" class="bg-white rounded-2xl p-6 shadow-lg col-span-2">
            <h3 class="text-xl font-semibold mb-6">Évolution temporelle</h3>
            <div class="h-80">
              <svg viewBox="0 0 800 300" class="w-full h-full">
                <!-- Grille -->
                <defs>
                  <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#3b82f6"/>
                    <stop offset="100%" stop-color="#8b5cf6"/>
                  </linearGradient>
                  <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#ef4444"/>
                  </linearGradient>
                </defs>
                
                <!-- Axes -->
                <line x1="60" y1="250" x2="750" y2="250" stroke="#374151" stroke-width="2"/>
                <line x1="60" y1="250" x2="60" y2="50" stroke="#374151" stroke-width="2"/>
                
                <!-- Grille horizontale -->
                <line v-for="i in 4" :key="'hgrid-'+i" 
                      x1="60" :y1="250 - i * 50" 
                      x2="750" :y2="250 - i * 50" 
                      stroke="#f3f4f6" stroke-width="1"/>
                
                <!-- Labels -->
                <text v-for="(mois, index) in moisEvolution" :key="'mois-'+index"
                      :x="100 + index * 100" y="270"
                      text-anchor="middle" class="text-xs fill-gray-600">
                  {{ mois }}
                </text>
                
                <text v-for="i in 5" :key="'ylabel2-'+i" 
                      x="50" :y="255 - (i-1) * 50" 
                      text-anchor="end" class="text-xs fill-gray-600">
                  {{ i-1 }}
                </text>
                
                <!-- Lignes d'évolution -->
                <path :d="getEvolutionPath(evolutionData1)" 
                      fill="none" 
                      stroke="url(#lineGradient1)" 
                      stroke-width="3"
                      class="transition-all duration-1000"/>
                
                <path :d="getEvolutionPath(evolutionData2)" 
                      fill="none" 
                      stroke="url(#lineGradient2)" 
                      stroke-width="3"
                      class="transition-all duration-1000"/>
                
                <!-- Points -->
                <g v-for="(point, index) in evolutionData1" :key="'point1-'+index">
                  <circle :cx="100 + index * 100" 
                          :cy="250 - point * 50" 
                          r="5" 
                          fill="#3b82f6"
                          class="transition-all duration-1000">
                  </circle>
                </g>
                
                <g v-for="(point, index) in evolutionData2" :key="'point2-'+index">
                  <circle :cx="100 + index * 100" 
                          :cy="250 - point * 50" 
                          r="5" 
                          fill="#f59e0b"
                          class="transition-all duration-1000">
                  </circle>
                </g>
              </svg>
            </div>
            
            <div class="flex justify-center space-x-6 mt-4">
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-blue-500 rounded"></div>
                <span class="text-sm">Communication</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-yellow-500 rounded"></div>
                <span class="text-sm">Leadership</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Bouton de rapport -->
        <div class="flex justify-end">
          <div class="relative">
            <button @click="toggleRapportDropdown"
                    class="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center space-x-2">
              <span>Générer un rapport</span>
              <span class="text-sm">▼</span>
            </button>
            
            <div v-if="showRapportOptions" class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
              <button @click="genererRapport('pdf')" 
                      class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-t-lg">
                Exporter en PDF
              </button>
              <button @click="genererRapport('excel')" 
                      class="w-full text-left px-4 py-3 hover:bg-gray-50">
                Exporter en Excel
              </button>
              <button @click="genererRapport('print')" 
                      class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-b-lg">
                Imprimer
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Message de téléchargement -->
      <div v-if="showDownloadMessage" 
           class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
        <span>✅</span>
        <span>{{ downloadMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// État réactif
const montrerGraphiques = ref(false)
const showRapportOptions = ref(false)
const showDownloadMessage = ref(false)
const downloadMessage = ref('')
const activeGraphType = ref('barres')
const toggleMetric = ref('moyenne')

// Données des filtres
const projets = ref(['Java', 'Dev Web', 'C++', 'Python', 'React', 'Vue.js'])
const classes = ref(['AP2', 'GINF1', 'GINF2', 'GINF3'])
const competences = ref(['Communication', 'Leadership', 'Empathie', 'Créativité', 'Adaptabilité', 'Autogestion', 'Négociation'])
const periodes = ref(['01/01/2023-15/04/2025', '01/01/2024-15/04/2025', '01/09/2024-15/04/2025'])

// Types de graphiques
const typesGraphiques = ref([
  { id: 'barres', name: 'Graphique en barres' },
  { id: 'radar', name: 'Graphique radar' },
  { id: 'evolution', name: 'Évolution temporelle' }
])

// Filtres sélectionnés
const selectedFilters = ref({
  projet: '',
  periode: '01/01/2023-15/04/2025',
  classe: '',
  competence: ''
})

// Données dynamiques
const baseData = ref([
  { label: 'Communication', userScore: 2.50, groupScore: 2.30 },
  { label: 'Leadership', userScore: 3.20, groupScore: 2.80 },
  { label: 'Empathie', userScore: 2.10, groupScore: 3.50 },
  { label: 'Créativité', userScore: 1.80, groupScore: 2.20 },
  { label: 'Adaptabilité', userScore: 3.60, groupScore: 2.70 },
  { label: 'Autogestion', userScore: 3.00, groupScore: 2.50 }
])

const radarCompetences = ref([
  { name: 'Comm.', value: 3 },
  { name: 'Lead.', value: 4 },
  { name: 'Emp.', value: 2 },
  { name: 'Créa.', value: 3 },
  { name: 'Adapt.', value: 4 },
  { name: 'Auto.', value: 3 }
])

const evolutionData1 = ref([1.5, 2.2, 2.8, 3.1, 3.5, 3.8, 4.0])
const evolutionData2 = ref([1.2, 1.8, 2.1, 2.5, 2.9, 3.2, 3.6])
const moisEvolution = ref(['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul'])

// Computed
const currentData = computed(() => {
  return baseData.value.map(item => ({
    ...item,
    userScore: toggleMetric.value === 'mediane' ? item.userScore * 0.9 : item.userScore,
    groupScore: toggleMetric.value === 'mediane' ? item.groupScore * 0.9 : item.groupScore
  }))
})

// Méthodes
const afficherGraphiques = () => {
  montrerGraphiques.value = true
  updateGraphiques()
}

const reinitialiser = () => {
  montrerGraphiques.value = false
  selectedFilters.value = {
    projet: '',
    periode: '01/01/2023-15/04/2025',
    classe: '',
    competence: ''
  }
}

const updateGraphiques = () => {
  // Générer de nouvelles données basées sur les filtres
  baseData.value = baseData.value.map(item => ({
    ...item,
    userScore: parseFloat((Math.random() * 3 + 1).toFixed(2)),
    groupScore: parseFloat((Math.random() * 3 + 1).toFixed(2))
  }))
  
  radarCompetences.value = radarCompetences.value.map(comp => ({
    ...comp,
    value: parseFloat((Math.random() * 4 + 1).toFixed(2))
  }))
  
  evolutionData1.value = evolutionData1.value.map(() => parseFloat((Math.random() * 3 + 1).toFixed(2)))
  evolutionData2.value = evolutionData2.value.map(() => parseFloat((Math.random() * 3 + 1).toFixed(2)))
}

const toggleRapportDropdown = () => {
  showRapportOptions.value = !showRapportOptions.value
}

const genererRapport = (type) => {
  const messages = {
    pdf: 'Rapport PDF téléchargé avec succès !',
    excel: 'Fichier Excel téléchargé avec succès !',
    print: 'Document envoyé à l\'imprimante !'
  }
  
  downloadMessage.value = messages[type]
  showDownloadMessage.value = true
  showRapportOptions.value = false
  
  setTimeout(() => {
    showDownloadMessage.value = false
  }, 3000)
}

const getRadarPoints = (radius) => {
  const points = []
  const sides = 6
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2
    const x = 150 + Math.cos(angle) * radius
    const y = 150 + Math.sin(angle) * radius
    points.push(`${x},${y}`)
  }
  return points.join(' ')
}

const getDataPolygon = () => {
  const points = []
  radarCompetences.value.forEach((comp, index) => {
    const angle = (index * 2 * Math.PI) / radarCompetences.value.length - Math.PI / 2
    const x = 150 + Math.cos(angle) * comp.value * 20
    const y = 150 + Math.sin(angle) * comp.value * 20
    points.push(`${x},${y}`)
  })
  return points.join(' ')
}

const getEvolutionPath = (data) => {
  let path = `M 100 ${250 - data[0] * 50}`
  for (let i = 1; i < data.length; i++) {
    path += ` L ${100 + i * 100} ${250 - data[i] * 50}`
  }
  return path
}
</script>