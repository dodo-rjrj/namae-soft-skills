<template>
    <div class="p-4">
      <!-- En-tête -->
      <div class="mb-4 flex flex-wrap justify-between items-center gap-2 ">
        <h1 class="text-2xl font-bold text-blue-800 mb-3 sm:mb-0">Gestion des Signalements</h1>
        <div class="flex gap-2">
          <input 
            type="text" 
            placeholder="Rechercher..." 
            class="border p-1 rounded"
            v-model="searchQuery"
          />
          <button 
            class="bg-indigo-600 text-white px-2 py-1 rounded"
            @click="showNewReportModal = true"
          >
            + Nouveau
          </button>
        </div>
      </div>
  
      <!-- Onglets -->
      <div class="border-b mb-4">
        <div class="flex overflow-x-auto">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-3 py-2 text-sm"
            :class="activeTab === tab.id ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
  
      <!-- Contenu -->
      <div class="bg-white border rounded">
        <!-- Liste des signalements -->
        <div v-if="activeTab === 'list'">
          <div class="p-2 border-b flex flex-wrap gap-2">
            <select v-model="filters.status" class="border rounded p-1 text-sm">
              <option value="all">Tous les statuts</option>
              <option value="new">Nouveaux</option>
              <option value="in-progress">En cours</option>
              <option value="resolved">Résolus</option>
            </select>
            <select v-model="filters.priority" class="border rounded p-1 text-sm">
              <option value="all">Toutes les priorités</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>
          </div>
  
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="p-2 text-left">Élève</th>
                  <th class="p-2 text-left">Type</th>
                  <th class="p-2 text-left">Date</th>
                  <th class="p-2 text-left">Statut</th>
                  <th class="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="report in filteredReports" :key="report.id" class="border-t">
                  <td class="p-2">
                    <div class="flex items-center">
                      <div class="h-6 w-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs mr-2">
                        {{ getInitials(report.student) }}
                      </div>
                      <div>
                        <div>{{ report.student }}</div>
                        <div class="text-xs text-gray-500">{{ report.class }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="p-2">{{ report.type }}</td>
                  <td class="p-2">{{ formatDate(report.date) }}</td>
                  <td class="p-2">
                    <span 
                      class="px-1 text-xs rounded"
                      :class="getStatusClass(report.status)"
                    >
                      {{ report.status }}
                    </span>
                  </td>
                  <td class="p-2">
                    <div class="flex gap-1">
                      <button @click="viewReport(report)" class="text-indigo-600">Voir</button>
                      <button @click="editReport(report)" class="text-blue-600">Éditer</button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredReports.length === 0">
                  <td colspan="5" class="p-4 text-center text-gray-500">
                    Aucun signalement trouvé
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- Historique -->
        <div v-if="activeTab === 'history'" class="p-4">
          <div v-for="item in history.slice(0, 5)" :key="item.id" class="mb-3 p-2 border-b">
            <div class="flex justify-between">
              <div>
                <strong>{{ item.student }}</strong> - {{ item.type }}
                <div class="text-xs text-gray-500">{{ formatDate(item.date) }} • {{ item.class }}</div>
                <p class="text-sm mt-1">{{ item.description }}</p>
              </div>
              <span 
                class="px-1 text-xs rounded h-fit"
                :class="getStatusClass(item.status)"
              >
                {{ item.status }}
              </span>
            </div>
            <div v-if="item.solution" class="mt-2 text-sm text-gray-700">
              <strong>Solution:</strong> {{ item.solution }}
            </div>
          </div>
        </div>
  
        <!-- Solutions -->
        <div v-if="activeTab === 'solutions'" class="p-4">
          <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div 
              v-for="solution in solutions.slice(0, 4)" 
              :key="solution.id" 
              class="border rounded p-3"
            >
              <div class="flex justify-between mb-2">
                <h3 class="font-medium">{{ solution.name }}</h3>
                <span 
                  class="px-1 text-xs rounded"
                  :class="getSolutionTypeClass(solution.type)"
                >
                  {{ solution.type }}
                </span>
              </div>
              <p class="text-sm mb-2">{{ solution.description }}</p>
              <div class="text-xs text-gray-500">{{ solution.duration }}</div>
            </div>
          </div>
        </div>
  
        <!-- Plans -->
        <div v-if="activeTab === 'plans'" class="p-4">
          <div 
            v-for="plan in plans.slice(0, 3)" 
            :key="plan.id" 
            class="border rounded p-3 mb-3"
          >
            <div class="flex justify-between mb-2">
              <div>
                <strong>{{ plan.student }}</strong>
                <div class="text-xs text-gray-500">{{ plan.class }}</div>
              </div>
              <span 
                class="px-1 text-xs rounded"
                :class="getPlanStatusClass(plan.status)"
              >
                {{ plan.status }}
              </span>
            </div>
            <div class="mb-2">
              <div class="text-sm font-medium mb-1">Objectifs:</div>
              <ul class="text-sm pl-5 list-disc">
                <li v-for="(obj, i) in plan.objectives.slice(0, 2)" :key="i">{{ obj }}</li>
              </ul>
            </div>
            <div class="flex justify-between text-xs">
              <div>Échéance: {{ formatDate(plan.dueDate) }}</div>
              <div>Progression: {{ plan.progress }}%</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal simplifié -->
      <div v-if="showNewReportModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded max-w-md w-full p-4">
          <div class="flex justify-between mb-4">
            <h3 class="font-medium">Nouveau signalement</h3>
            <button @click="showNewReportModal = false">×</button>
          </div>
          <form @submit.prevent="submitNewReport" class="space-y-3">
            <div>
              <label class="block text-sm mb-1">Élève</label>
              <input type="text" v-model="newReport.student" class="w-full border rounded p-1" required />
            </div>
            <div>
              <label class="block text-sm mb-1">Classe</label>
              <input type="text" v-model="newReport.class" class="w-full border rounded p-1" required />
            </div>
            <div>
              <label class="block text-sm mb-1">Type</label>
              <select v-model="newReport.type" class="w-full border rounded p-1" required>
                <option value="">Sélectionner</option>
                <option value="Comportement">Comportement</option>
                <option value="Absentéisme">Absentéisme</option>
                <option value="Performance">Performance</option>
                <option value="Conflit">Conflit</option>
              </select>
            </div>
            <div>
              <label class="block text-sm mb-1">Description</label>
              <textarea v-model="newReport.description" rows="3" class="w-full border rounded p-1" required></textarea>
            </div>
            <div>
              <label class="block text-sm mb-1">Priorité</label>
              <select v-model="newReport.priority" class="w-full border rounded p-1" required>
                <option value="">Sélectionner</option>
                <option value="Haute">Haute</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
              </select>
            </div>
            <div class="flex justify-end gap-2 pt-2">
              <button type="button" @click="showNewReportModal = false" class="border px-3 py-1 rounded">Annuler</button>
              <button type="submit" class="bg-indigo-600 text-white px-3 py-1 rounded">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Onglets simplifiés
  const tabs = [
    { id: 'list', name: 'Liste' },
    { id: 'history', name: 'Historique' },
    { id: 'solutions', name: 'Solutions' },
    { id: 'plans', name: 'Plans d\'action' }
  ]
  
  // État
  const activeTab = ref('list')
  const searchQuery = ref('')
  const showNewReportModal = ref(false)
  const filters = ref({
    status: 'all',
    priority: 'all'
  })
  const newReport = ref({
    student: '',
    class: '',
    type: '',
    description: '',
    priority: ''
  })
  
  // Données minimales
  const reports = ref([
    { 
      id: 1, 
      student: 'Thomas Martin', 
      class: 'Terminale S2', 
      type: 'Comportement', 
      date: '2023-05-15', 
      status: 'Nouveau', 
      priority: 'Haute',
      description: 'Comportement perturbateur en classe.'
    },
    { 
      id: 2, 
      student: 'Emma Dubois', 
      class: 'Première ES1', 
      type: 'Absentéisme', 
      date: '2023-05-10', 
      status: 'En cours', 
      priority: 'Moyenne',
      description: 'Absences répétées le lundi matin.'
    },
    { 
      id: 3, 
      student: 'Lucas Bernard', 
      class: 'Seconde A', 
      type: 'Performance', 
      date: '2023-05-08', 
      status: 'Résolu', 
      priority: 'Basse',
      description: 'Baisse des résultats en mathématiques.'
    },
    { 
      id: 4, 
      student: 'Chloé Petit', 
      class: 'Terminale L', 
      type: 'Conflit', 
      date: '2023-05-05', 
      status: 'En cours', 
      priority: 'Haute',
      description: 'Conflit avec plusieurs camarades.'
    }
  ])
  
  const history = ref([
    { 
      id: 101, 
      student: 'Julien Dupont', 
      class: 'Terminale S1', 
      type: 'Comportement', 
      date: '2023-04-15', 
      status: 'Résolu', 
      description: 'Comportement irrespectueux.',
      solution: 'Médiation avec l\'enseignant et suivi hebdomadaire.'
    },
    { 
      id: 102, 
      student: 'Sophie Lambert', 
      class: 'Première ES2', 
      type: 'Absentéisme', 
      date: '2023-04-10', 
      status: 'Résolu', 
      description: 'Absences répétées sans justification.',
      solution: 'Contrat d\'assiduité mis en place.'
    },
    { 
      id: 103, 
      student: 'Antoine Girard', 
      class: 'Seconde C', 
      type: 'Performance', 
      date: '2023-03-28', 
      status: 'Résolu', 
      description: 'Difficultés en mathématiques.',
      solution: 'Mise en place de tutorat.'
    }
  ])
  
  const solutions = ref([
    {
      id: 201,
      name: 'Tutorat par les pairs',
      type: 'Académique',
      description: 'Accompagnement individuel par un élève plus âgé.',
      duration: '1h/semaine pendant 2 mois'
    },
    {
      id: 202,
      name: 'Atelier gestion des émotions',
      type: 'Comportemental',
      description: 'Sessions pour gérer ses émotions.',
      duration: '4 séances de 1h30'
    },
    {
      id: 203,
      name: 'Médiation par les pairs',
      type: 'Relationnel',
      description: 'Résolution de conflits par des élèves formés.',
      duration: 'Variable selon besoins'
    }
  ])
  
  const plans = ref([
    {
      id: 301,
      student: 'Thomas Martin',
      class: 'Terminale S2',
      status: 'Actif',
      objectives: [
        'Améliorer le comportement en classe',
        'Développer des stratégies de communication'
      ],
      dueDate: '2023-06-30',
      progress: 25
    },
    {
      id: 302,
      student: 'Emma Dubois',
      class: 'Première ES1',
      status: 'Actif',
      objectives: [
        'Réduire l\'absentéisme',
        'Identifier les causes des absences'
      ],
      dueDate: '2023-06-15',
      progress: 40
    },
    {
      id: 303,
      student: 'Lucas Bernard',
      class: 'Seconde A',
      status: 'Terminé',
      objectives: [
        'Améliorer les résultats en mathématiques',
        'Acquérir des méthodes de travail'
      ],
      dueDate: '2023-05-31',
      progress: 100
    }
  ])
  
  // Fonctions simplifiées
  const filteredReports = computed(() => {
    let result = reports.value
  
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(report => 
        report.student.toLowerCase().includes(query) ||
        report.class.toLowerCase().includes(query) ||
        report.type.toLowerCase().includes(query)
      )
    }
  
    if (filters.value.status !== 'all') {
      result = result.filter(report => 
        report.status.toLowerCase() === filters.value.status
      )
    }
  
    if (filters.value.priority !== 'all') {
      result = result.filter(report => 
        report.priority.toLowerCase() === filters.value.priority
      )
    }
  
    return result
  })
  
  const getInitials = (name) => {
    return name.split(' ').map(part => part.charAt(0)).join('')
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }
  
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'nouveau': return 'bg-blue-100 text-blue-800'
      case 'en cours': return 'bg-yellow-100 text-yellow-800'
      case 'résolu': return 'bg-green-100 text-green-800'
      case 'fermé': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  const getSolutionTypeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'académique': return 'bg-blue-100 text-blue-800'
      case 'comportemental': return 'bg-purple-100 text-purple-800'
      case 'relationnel': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  const getPlanStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'actif': return 'bg-green-100 text-green-800'
      case 'terminé': return 'bg-blue-100 text-blue-800'
      case 'en attente': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  // Fonctions d'action simplifiées
  const viewReport = (report) => console.log('Voir', report)
  const editReport = (report) => console.log('Éditer', report)
  
  const submitNewReport = () => {
    const newId = Math.max(...reports.value.map(r => r.id)) + 1
    reports.value.push({
      id: newId,
      student: newReport.value.student,
      class: newReport.value.class,
      type: newReport.value.type,
      date: new Date().toISOString().split('T')[0],
      status: 'Nouveau',
      priority: newReport.value.priority,
      description: newReport.value.description
    })
    
    newReport.value = { student: '', class: '', type: '', description: '', priority: '' }
    showNewReportModal.value = false
  }
  </script>