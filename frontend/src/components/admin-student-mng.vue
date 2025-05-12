<template>
  <div class="admin-panel bg-gradient-to-br from-white-50 to-blue-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Enhanced Title with Gradient -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 bg-clip-text text-transparent">Gestion des Étudiants</h1>
        </div>
      </div>
      
      <!-- Enhanced Search Bar and Add Button -->
      <div class="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-100">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input 
                v-model="searchQuery" 
                placeholder="Nom, prénom ou email..."
                class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
            </div>
          </div>
          <div class="flex items-end">
            <button 
              @click="searchQuery = ''"
              class="bg-gray-200 hover:bg-gray-300 transition-colors duration-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm hover:shadow"
            >
              <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Réinitialiser
            </button>
          </div>
          <div class="flex items-end justify-end">
            <button 
              @click="showAddModal = true"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <svg class="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Ajouter un étudiant
            </button>
          </div>
        </div>
      </div>
      
      <!-- Enhanced Students Table -->
      <div class="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Nom</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Prénom</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Email</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Filière</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-blue-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ student.nom }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ student.prenom }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ student.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 shadow-sm">
                  {{ student.filiere }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editStudent(student)" class="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-150 hover:bg-indigo-50 px-3 py-1 rounded-md">
                  <span class="flex items-center">
                    <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Modifier
                  </span>
                </button>
                <button @click="confirmDelete(student.id)" class="text-red-600 hover:text-red-900 transition-colors duration-150 hover:bg-red-50 px-3 py-1 rounded-md">
                  <span class="flex items-center">
                    <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    Supprimer
                  </span>
                </button>
              </td>
            </tr>
            <tr v-if="filteredStudents.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-sm text-gray-500">
                <div class="flex flex-col items-center justify-center">
                  <svg class="h-12 w-12 text-gray-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-lg font-medium">Aucun étudiant trouvé</span>
                  <p class="text-gray-500 mt-1">Essayez de modifier votre recherche ou ajoutez un nouvel étudiant</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Enhanced Add/Edit Student Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 transform transition-all animate-modal-appear">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {{ showEditModal ? 'Modifier' : 'Ajouter' }} un étudiant
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500 transition-colors duration-150">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-6">
          <!-- Common fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input 
                v-model="form.nom" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input 
                v-model="form.prenom" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email"
                v-model="form.email" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
            </div>
            <div v-if="!showEditModal">
              <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input 
                type="password"
                v-model="form.mot_de_passe" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date d'inscription</label>
              <input 
                type="date"
                v-model="form.date_inscription" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
            </div>
          </div>
          
          <!-- Student specific fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Promotion</label>
              <input 
                v-model="form.promotion" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Filière</label>
              <select 
                v-model="form.filiere"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
          </div>
        </div>
        
        <div class="mt-8 flex justify-end space-x-4">
          <button 
            @click="closeModal" 
            class="bg-white py-2 px-6 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
          >
            Annuler
          </button>
          <button 
            @click="saveStudent" 
            class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            {{ showEditModal ? 'Mettre à jour' : 'Ajouter' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all animate-modal-appear">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-3">Confirmer la suppression</h3>
          <p class="text-sm text-gray-500 mt-2">
            Êtes-vous sûr de vouloir supprimer cet étudiant ? Cette action est irréversible.
          </p>
        </div>
        <div class="mt-5 flex justify-center space-x-4">
          <button 
            @click="showConfirmModal = false" 
            class="bg-white py-2 px-6 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
          >
            Annuler
          </button>
          <button 
            @click="deleteStudent" 
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
    
    <!-- Enhanced Notifications -->
    <transition name="notification">
      <div 
        v-if="notification.show" 
        :class="{
          'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-xl z-50 flex items-center border transform transition-all duration-300': true,
          'bg-green-100 border-green-500 text-green-800': notification.type === 'success',
          'bg-red-100 border-red-500 text-red-800': notification.type === 'error',
          'bg-blue-100 border-blue-500 text-blue-800': notification.type === 'info'
        }"
      >
        <svg 
          v-if="notification.type === 'success'"
          class="h-5 w-5 mr-2 text-green-600" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <svg 
          v-if="notification.type === 'error'"
          class="h-5 w-5 mr-2 text-red-600" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <svg 
          v-if="notification.type === 'info'"
          class="h-5 w-5 mr-2 text-blue-600" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
        </svg>
        <span class="font-medium">{{ notification.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Current date for default value
const today = new Date().toISOString().split('T')[0]

// Students data
const students = ref([
  { 
    id: 1, 
    nom: 'Dupont', 
    prenom: 'Jean', 
    email: 'jean.dupont@example.com', 
    date_inscription: '2023-09-01',
    promotion: '2023',
    filiere: 'Ging1',
    mot_de_passe: ''
  },
  { 
    id: 2, 
    nom: 'Lambert', 
    prenom: 'Sophie', 
    email: 'sophie.lambert@example.com', 
    date_inscription: '2023-09-01',
    promotion: '2022',
    filiere: 'GIL2',
    mot_de_passe: ''
  }
])

// Search query
const searchQuery = ref('')

// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)
const showConfirmModal = ref(false)
const studentToDelete = ref(null)

// Notification state
const notification = ref({
  show: false,
  message: '',
  type: 'success' // 'success', 'error', 'info'
})

// Form state
const form = ref({
  id: null,
  nom: '',
  prenom: '',
  email: '',
  mot_de_passe: '',
  date_inscription: today,
  promotion: '',
  filiere: 'Ging1'
})

// Show notification
const showNotification = (message, type = 'success') => {
  notification.value = {
    show: true,
    message,
    type
  }
  
  // Hide notification after 4 seconds
  setTimeout(() => {
    notification.value.show = false
  }, 4000)
}

// Filtered students based on search query
const filteredStudents = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return students.value
  
  return students.value.filter(student => 
    student.nom.toLowerCase().includes(query) || 
    student.prenom.toLowerCase().includes(query) || 
    student.email.toLowerCase().includes(query) ||
    student.filiere.toLowerCase().includes(query)
  )
})

// Close modal and reset form
const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  showConfirmModal.value = false
  form.value = {
    id: null,
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    date_inscription: today,
    promotion: '',
    filiere: 'Ging1'
  }
}

// Edit student
const editStudent = (student) => {
  form.value = { ...student }
  showEditModal.value = true
}

// Confirm delete student
const confirmDelete = (id) => {
  studentToDelete.value = id
  showConfirmModal.value = true
}

// Delete student
const deleteStudent = () => {
  students.value = students.value.filter(s => s.id !== studentToDelete.value)
  showConfirmModal.value = false
  showNotification('Étudiant supprimé avec succès', 'success')
  studentToDelete.value = null
}

// Save student (add or update)
const saveStudent = () => {
  // Validation
  if (!form.value.nom || !form.value.prenom || !form.value.email) {
    showNotification('Veuillez remplir tous les champs obligatoires', 'error')
    return
  }
  
  if (showEditModal.value) {
    // Update existing student
    const index = students.value.findIndex(s => s.id === form.value.id)
    if (index !== -1) {
      students.value[index] = { ...form.value }
      showNotification('Étudiant mis à jour avec succès', 'success')
    }
  } else {
    // Add new student
    const maxId = students.value.length > 0 
      ? Math.max(...students.value.map(s => s.id)) 
      : 0
      
    students.value.push({
      ...form.value,
      id: maxId + 1
    })
    showNotification('Étudiant ajouté avec succès', 'success')
  }
  
  closeModal()
}
</script>

<style>
/* Notification animation */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Gradient text */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
.from-blue-600 {
  --tw-gradient-from: #2563eb;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(37, 99, 235, 0));
}
.via-indigo-500 {
  --tw-gradient-stops: var(--tw-gradient-from), #6366f1, var(--tw-gradient-to, rgba(99, 102, 241, 0));
}
.to-blue-700 {
  --tw-gradient-to: #1d4ed8;
}
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
.text-transparent {
  color: transparent;
}

/* Modal animation */
@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modal-appear {
  animation: modal-appear 0.3s ease-out forwards;
}

/* Table hover effect */
.hover\:bg-blue-50:hover {
  background-color: #eff6ff;
}

/* Button hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Transition effects */
.transition-all {
  transition-property: all;
}
.duration-200 {
  transition-duration: 200ms;
}
.duration-300 {
  transition-duration: 300ms;
}

/* Background gradients */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
.from-white-50 {
  --tw-gradient-from: #f9fafb;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(249, 250, 251, 0));
}
.to-blue-50 {
  --tw-gradient-to: #eff6ff;
}

/* Shadow effects */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>