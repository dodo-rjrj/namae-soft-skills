<template>
  <div class="admin-panel bg-gradient-to-br from-white-50 to-blue-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
     <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 bg-clip-text text-transparent mb-8">Gestion des Professeurs</h1>
      
      <!-- Notifications -->
      <div v-if="notification.show" class="mb-4">
        <div :class="[
          'p-4 rounded-md flex items-center',
          notification.type === 'success' ? 'bg-green-50' : 'bg-red-50'
        ]">
          <div class="flex-shrink-0">
            <span v-if="notification.type === 'success'" class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
              <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span v-else class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-100">
              <svg class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
          </div>
          <div class="ml-3 flex-1">
            <p :class="[
              'text-sm font-medium',
              notification.type === 'success' ? 'text-green-800' : 'text-red-800'
            ]">
              {{ notification.message }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Search Bar and Add Button -->
      <div class="bg-white p-4 rounded-md shadow mb-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <input 
              v-model="searchQuery" 
              placeholder="Nom, prénom ou email..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          <div class="flex items-end">
            <button 
              @click="searchQuery = ''"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
            >
              Réinitialiser
            </button>
          </div>
          <div class="flex items-end justify-end">
            <button 
              @click="showAddModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Ajouter un professeur
            </button>
          </div>
        </div>
      </div>
      
      <!-- Professors Table -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-blue-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Nom</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Prénom</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Spécialité</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Département</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="prof in filteredProfessors" :key="prof.id_enseignant">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ prof.nom }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ prof.prenom }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ prof.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ prof.specialite }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ prof.departement }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editProfessor(prof)" class="text-blue-600 hover:text-blue-900 mr-4">Modifier</button>
                <button @click="confirmDelete(prof.id_enseignant)" class="text-red-600 hover:text-red-900">Supprimer</button>
              </td>
            </tr>
            <tr v-if="filteredProfessors.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                Aucun professeur trouvé
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Add/Edit Professor Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ showEditModal ? 'Modifier' : 'Ajouter' }} un professeur
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Error notification for modal -->
        <div v-if="formError" class="mb-4 p-4 rounded-md bg-red-50">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">
                {{ formError }}
              </p>
            </div>
          </div>
        </div>
        
        <div class="space-y-4">
          <!-- Common fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input 
                v-model="form.nom" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input 
                v-model="form.prenom" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email"
                v-model="form.email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div v-if="!showEditModal">
              <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input 
                type="password"
                v-model="form.mot_de_passe" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date d'inscription</label>
              <input 
                type="date"
                v-model="form.date_inscription" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
          </div>
          
          <!-- Professor specific fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Spécialité</label>
              <input 
                v-model="form.specialite" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Département</label>
              <input 
                v-model="form.departement" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="closeModal" 
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button 
            @click="saveProfessor" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            {{ showEditModal ? 'Mettre à jour' : 'Ajouter' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Confirmation Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="text-center mb-6">
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <svg class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="mt-4 text-lg font-medium text-gray-900">
            Confirmation de suppression
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            Êtes-vous sûr de vouloir supprimer cet professeur ? Cette action est irréversible.
          </p>
        </div>
        
        <div class="mt-6 flex justify-center space-x-3">
          <button 
            @click="showConfirmModal = false" 
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button 
            @click="deleteProfessor" 
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Current date for default value
const today = new Date().toISOString().split('T')[0]

// Professors data
const professors = ref([
  { 
    id_enseignant: 1, 
    nom: 'Martin', 
    prenom: 'Pierre', 
    email: 'pierre.martin@example.com', 
    date_inscription: '2023-01-15',
    specialite: 'Informatique',
    departement: 'Sciences'
  },
  { 
    id_enseignant: 2, 
    nom: 'Dubois', 
    prenom: 'Marie', 
    email: 'marie.dubois@example.com', 
    date_inscription: '2022-09-01',
    specialite: 'Mathématiques',
    departement: 'Sciences'
  }
])

// Search query
const searchQuery = ref('')

// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)
const showConfirmModal = ref(false)
const professorToDelete = ref(null)
const formError = ref('')

// Notification state
const notification = ref({
  show: false,
  type: 'success', // 'success' or 'error'
  message: ''
})

// Form state
const form = ref({
  id_enseignant: null,
  nom: '',
  prenom: '',
  email: '',
  mot_de_passe: '',
  date_inscription: today,
  specialite: '',
  departement: ''
})

// Filtered professors based on search query
const filteredProfessors = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return professors.value
  
  return professors.value.filter(prof => 
    prof.nom.toLowerCase().includes(query) || 
    prof.prenom.toLowerCase().includes(query) || 
    prof.email.toLowerCase().includes(query) ||
    prof.specialite.toLowerCase().includes(query) ||
    prof.departement.toLowerCase().includes(query)
  )
})

// Show notification
const showNotification = (type, message) => {
  notification.value = {
    show: true,
    type,
    message
  }
  
  // Hide notification after 5 seconds
  setTimeout(() => {
    notification.value.show = false
  }, 5000)
}

// Close modal and reset form
const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  formError.value = ''
  form.value = {
    id_enseignant: null,
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    date_inscription: today,
    specialite: '',
    departement: ''
  }
}

// Edit professor
const editProfessor = (prof) => {
  form.value = { ...prof }
  showEditModal.value = true
}

// Confirm delete professor
const confirmDelete = (id) => {
  professorToDelete.value = id
  showConfirmModal.value = true
}

// Delete professor
const deleteProfessor = () => {
  professors.value = professors.value.filter(p => p.id_enseignant !== professorToDelete.value)
  showConfirmModal.value = false
  showNotification('success', 'Professeur supprimé avec succès')
}

// Save professor (add or update)
const saveProfessor = () => {
  // Validation
  if (!form.value.nom || !form.value.prenom || !form.value.email) {
    formError.value = 'Veuillez remplir tous les champs obligatoires'
    return
  }
  
  if (showEditModal.value) {
    // Update existing professor
    const index = professors.value.findIndex(p => p.id_enseignant === form.value.id_enseignant)
    if (index !== -1) {
      professors.value[index] = { ...form.value }
      closeModal()
      showNotification('success', 'Professeur mis à jour avec succès')
    }
  } else {
    // Add new professor
    const maxId = professors.value.length > 0 
      ? Math.max(...professors.value.map(p => p.id_enseignant)) 
      : 0
      
    professors.value.push({
      ...form.value,
      id_enseignant: maxId + 1
    })
    
    closeModal()
    showNotification('success', 'Professeur ajouté avec succès')
  }
}
</script>

<style>
.bg-blue-50 {
  background-color: #eff6ff;
}
.text-blue-600 {
  color: #2563eb;
}
.border-blue-500 {
  border-color: #3b82f6;
}
.focus\:ring-blue-500:focus {
  --tw-ring-color: #3b82f6;
}
.focus\:border-blue-500:focus {
  border-color: #3b82f6;
}
.bg-blue-600 {
  background-color: #2563eb;
}
.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}

/* Green colors for success notifications */
.bg-green-50 {
  background-color: #f0fdf4;
}
.bg-green-100 {
  background-color: #dcfce7;
}
.text-green-600 {
  color: #16a34a;
}
.text-green-800 {
  color: #166534;
}

/* Red colors for error notifications */
.bg-red-50 {
  background-color: #fef2f2;
}
.bg-red-100 {
  background-color: #fee2e2;
}
.text-red-400 {
  color: #f87171;
}
.text-red-600 {
  color: #dc2626;
}
.text-red-700 {
  color: #b91c1c;
}
.bg-red-600 {
  background-color: #dc2626;
}
.hover\:bg-red-700:hover {
  background-color: #b91c1c;
}
</style>