<template>
  <div class="admin-panel min-h-screen bg-white-100 ">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Classes Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 via-violet-500 to-blue-700 bg-clip-text text-transparent">Gestion des Classes</h1>
          <p class="mt-1 text-sm text-gray-600">Gérez les classes et leurs informations</p>
        </div>
        <button 
          @click="openClassModal(null)" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Ajouter une classe
        </button>
      </div>
      
      <!-- Classes Filter -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-8 border border-blue-100">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input 
                v-model="classFilter.search" 
                placeholder="Nom ou description..."
                class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
            <select 
              v-model="classFilter.niveau" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tous les niveaux</option>
              <option value="Ging1">Ging1</option>
              <option value="Ging2">Ging2</option>
              <option value="Ging3">Ging3</option>
              <option value="GIL1">GIL1</option>
              <option value="GIL2">GIL2</option>
              <option value="GIL3">GIL3</option>
              <option value="GST">GST</option>
              <option value="Master">Master</option>
              <option value="Doctorat">Doctorat</option>
              <option value="AP1">AP1</option>
              <option value="AP2">AP2</option>
            </select>
          </div>
          
          <div class="flex items-end">
            <button 
              @click="resetClassFilters"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
      
      <!-- Classes Table -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-blue-50">
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Nom</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Niveau</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Description</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Étudiants</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="classe in filteredClasses" :key="classe.id" class="hover:bg-blue-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ classe.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="getNiveauClass(classe.niveau)">
                    {{ classe.niveau }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-700 line-clamp-2">{{ classe.description }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="bg-blue-100 text-blue-800 py-1 px-2.5 rounded-full text-xs font-semibold">
                      {{ classe.etudiants }} étudiant(s)
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button 
                      @click="openClassModal(classe)" 
                      class="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors duration-200"
                      title="Modifier"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    
                    <button 
                      @click="deleteClass(classe.id)" 
                      class="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors duration-200"
                      title="Supprimer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredClasses.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-sm text-gray-500 bg-gray-50">
                  <div class="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-lg font-medium text-gray-600">Aucune classe trouvée</p>
                    <button 
                      @click="resetClassFilters" 
                      class="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Class Modal -->
    <div v-if="showClassModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="p-6 border-b border-gray-200 bg-blue-50">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-900">
              {{ editingClass ? 'Modifier' : 'Ajouter' }} une classe
            </h3>
            <button 
              @click="showClassModal = false" 
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="p-6 space-y-6">
          <div>
            <label for="class-name" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input 
              type="text" 
              id="class-name" 
              v-model="classForm.name" 
              class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Nom de la classe"
            >
          </div>
          
          <div>
            <label for="class-niveau" class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
            <select 
              id="class-niveau" 
              v-model="classForm.niveau" 
              class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Ging1">Ging1</option>
              <option value="Ging2">Ging2</option>
              <option value="Ging3">Ging3</option>
              <option value="GIL1">GIL1</option>
              <option value="GIL2">GIL2</option>
              <option value="GIL3">GIL3</option>
              <option value="GST">GST</option>
              <option value="Master">Master</option>
              <option value="Doctorat">Doctorat</option>
              <option value="AP1">AP1</option>
              <option value="AP2">AP2</option>
            </select>
          </div>
          
          <div>
            <label for="class-description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              id="class-description" 
              v-model="classForm.description" 
              rows="3"
              class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Description détaillée de la classe"
            ></textarea>
          </div>
          
          <div>
            <label for="class-etudiants" class="block text-sm font-medium text-gray-700 mb-1">Nombre d'étudiants</label>
            <input 
              type="number" 
              id="class-etudiants" 
              v-model="classForm.etudiants" 
              min="0"
              class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Nombre d'étudiants"
            >
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            @click="showClassModal = false" 
            class="bg-white py-2.5 px-5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Annuler
          </button>
          <button 
            @click="saveClass" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {{ editingClass ? 'Mettre à jour' : 'Ajouter' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Notification -->
    <transition name="notification">
      <div v-if="notification.show" class="fixed bottom-4 right-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg shadow-xl z-50 flex items-center max-w-md">
        <svg class="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <div>
          <p class="font-medium">{{ notification.title }}</p>
          <p class="text-sm">{{ notification.message }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Types
interface Classe {
  id: number;
  name: string;
  niveau: string;
  description: string;
  etudiants: number;
}

interface ClassFilter {
  search: string;
  niveau: string;
}

interface NotificationType {
  show: boolean;
  title: string;
  message: string;
}

// Classes
const classes = ref<Classe[]>([
  { 
    id: 1, 
    name: 'Informatique A', 
    niveau: 'Ging1', 
    description: 'Classe d\'informatique pour les étudiants de première année', 
    etudiants: 32
  },
  { 
    id: 2, 
    name: 'Réseaux B', 
    niveau: 'Ging2', 
    description: 'Classe spécialisée en réseaux informatiques', 
    etudiants: 28
  },
  { 
    id: 3, 
    name: 'Développement Web', 
    niveau: 'GIL2', 
    description: 'Formation aux technologies du web et au développement d\'applications', 
    etudiants: 25
  },
  { 
    id: 4, 
    name: 'Intelligence Artificielle', 
    niveau: 'Master', 
    description: 'Cours avancés sur les algorithmes d\'IA et le machine learning', 
    etudiants: 18
  },
  { 
    id: 5, 
    name: 'Préparatoire Sciences', 
    niveau: 'AP1', 
    description: 'Classe préparatoire scientifique première année', 
    etudiants: 45
  }
])

const classFilter = ref<ClassFilter>({
  search: '',
  niveau: ''
})

const filteredClasses = computed(() => {
  return classes.value.filter(classe => {
    const matchesSearch = !classFilter.value.search || 
      classe.name.toLowerCase().includes(classFilter.value.search.toLowerCase()) || 
      classe.description.toLowerCase().includes(classFilter.value.search.toLowerCase())
    
    const matchesNiveau = !classFilter.value.niveau || classe.niveau === classFilter.value.niveau
    
    return matchesSearch && matchesNiveau
  })
})

function resetClassFilters() {
  classFilter.value = {
    search: '',
    niveau: ''
  }
}

// Notification system
const notification = ref<NotificationType>({
  show: false,
  title: '',
  message: ''
})

function showNotification(title: string, message: string) {
  notification.value = {
    show: true,
    title,
    message
  }
  
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

// Class Methods
const showClassModal = ref(false)
const editingClass = ref<Classe | null>(null)
const classForm = ref<Classe>({ 
  id: 0,
  name: '', 
  niveau: 'Ging1', 
  description: '', 
  etudiants: 0
})

function openClassModal(classe: Classe | null) {
  if (classe) {
    editingClass.value = classe
    classForm.value = { ...classe }
  } else {
    editingClass.value = null
    classForm.value = { 
      id: 0,
      name: '', 
      niveau: 'Ging1', 
      description: '', 
      etudiants: 0
    }
  }
  showClassModal.value = true
}

function saveClass() {
  if (!classForm.value.name) {
    showNotification('Attention', 'Le nom de la classe est obligatoire')
    return
  }
  
  if (editingClass.value) {
    const index = classes.value.findIndex(c => c.id === editingClass.value!.id)
    if (index !== -1) {
      classes.value[index] = { ...classForm.value }
      showNotification('Succès', 'La classe a été mise à jour avec succès')
    }
  } else {
    const newId = Math.max(0, ...classes.value.map(c => c.id)) + 1
    classes.value.push({ ...classForm.value, id: newId })
    showNotification('Succès', 'La classe a été ajoutée avec succès')
  }
  showClassModal.value = false
}

function deleteClass(id: number) {
  classes.value = classes.value.filter(c => c.id !== id)
  showNotification('Succès', 'La classe a été supprimée avec succès')
}

// Helper functions
function getNiveauClass(niveau: string): string {
  const niveauClasses: Record<string, string> = {
    'Ging1': 'bg-green-100 text-green-800',
    'Ging2': 'bg-green-100 text-green-800',
    'Ging3': 'bg-green-100 text-green-800',
    'GIL1': 'bg-yellow-100 text-yellow-800',
    'GIL2': 'bg-yellow-100 text-yellow-800',
    'GIL3': 'bg-yellow-100 text-yellow-800',
    'GST': 'bg-orange-100 text-orange-800',
    'Master': 'bg-blue-100 text-blue-800',
    'Doctorat': 'bg-red-100 text-red-800',
    'AP1': 'bg-blue-100 text-blue-800',
    'AP2': 'bg-blue-100 text-blue-800'
  }
  
  return niveauClasses[niveau] || 'bg-gray-100 text-gray-800'
}
</script>

<style>
/* Animation for notifications */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Line clamp for descriptions */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c5c5c5;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}

/* Gradient text for title */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>