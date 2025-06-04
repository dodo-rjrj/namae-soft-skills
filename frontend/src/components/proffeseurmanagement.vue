<template>
  <div class="admin-panel bg-gradient-to-br from-white-50 to-blue-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
     <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 bg-clip-text text-transparent mb-8">Gestion des Professeurs</h1>
      
      <!-- Search Bar and Add Button -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input 
                v-model="searchQuery" 
                placeholder="Nom, prénom ou email..."
                class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
            </div>
          </div>
          <div class="flex items-end">
            <button 
              @click="searchQuery = ''"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition duration-150 flex items-center"
            >
              <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Réinitialiser
            </button>
          </div>
          <div class="flex items-end justify-end">
            <button 
              @click="showAddModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition duration-150 flex items-center shadow-md"
            >
              <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Ajouter un professeur
            </button>
          </div>
        </div>
      </div>
      
      <!-- Professors Table -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Nom</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Prénom</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Email</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Spécialité</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Département</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="prof in filteredProfessors" :key="prof.id_utilisateur" class="hover:bg-blue-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ prof.nom }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ prof.prenom }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ prof.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ prof.specialite }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ prof.departement }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="editProfessor(prof)" class="text-blue-600 hover:text-blue-900 mr-4 flex items-center">
                  <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Modifier
                </button>
                <button @click="deleteProfessor(prof.id_utilisateur)" class="text-red-600 hover:text-red-900 flex items-center">
                  <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  Supprimer
                </button>
              </td>
            </tr>
            <tr v-if="filteredProfessors.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-sm text-gray-500">
                <div class="flex flex-col items-center">
                  <svg class="h-12 w-12 text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-lg font-medium">Aucun professeur trouvé</p>
                  <p class="text-sm text-gray-400">Essayez de modifier vos critères de recherche</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Add/Edit Professor Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-blue-800">
            {{ showEditModal ? 'Modifier' : 'Ajouter' }} un professeur
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500 transition duration-150">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Error notification for modal -->
        <div v-if="formError" class="mb-4 p-4 rounded-lg bg-red-100 border border-red-400 text-red-700 flex items-center">
          <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          {{ formError }}
        </div>
        
        <div class="space-y-4">
          <!-- Common fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input 
                v-model="form.nom" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input 
                v-model="form.prenom" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email"
                v-model="form.email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
            </div>
           
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date d'inscription</label>
              <input 
                type="date"
                v-model="form.date_inscription" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
            </div>
          </div>
          
          <!-- Professor specific fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Spécialité</label>
              <input 
                v-model="form.specialite" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Département</label>
              <input 
                v-model="form.departement" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="closeModal" 
            class="bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150"
          >
            Annuler
          </button>
          <button 
            @click="saveProfessor" 
            class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md transition duration-150"
          >
            {{ showEditModal ? 'Mettre à jour' : 'Ajouter' }}
          </button>
        </div>
      </div>
    </div>
    
    
    <!-- Notifications -->
    <transition name="notification">
      <div 
        v-if="notification.show" 
        :class="{
          'fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center border': true,
          'bg-green-100 border-green-400 text-green-700': notification.type === 'success',
          'bg-red-100 border-red-400 text-red-700': notification.type === 'error',
          'bg-blue-100 border-blue-400 text-blue-700': notification.type === 'info'
        }"
      >
        <svg 
          v-if="notification.type === 'success'"
          class="h-5 w-5 mr-2" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <svg 
          v-if="notification.type === 'error'"
          class="h-5 w-5 mr-2" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <svg 
          v-if="notification.type === 'info'"
          class="h-5 w-5 mr-2" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
        </svg>
        {{ notification.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api' // Votre configuration axios existante

const router = useRouter()

// Current date for default value
const today = new Date().toISOString().split('T')[0]

// Professors data - maintenant chargée depuis l'API
const professors = ref([])
const loading = ref(false)

// Search query
const searchQuery = ref('')

// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)

// Notification state
const notification = ref({
  show: false,
  message: '',
  type: 'success' // 'success', 'error', 'info'
})

// Form state
const form = ref({
  id_utilisateur: null,
  nom: '',
  prenom: '',
  email: '',
  mot_de_passe: '',
  date_inscription: today,
  specialite: '',
  departement: '',
  poste: ''
})

// Charger les professeurs au démarrage
onMounted(() => {
  loadProfessors()
})

// Fonction pour charger tous les professeurs
const loadProfessors = async (nomRecherche = '') => {
  loading.value = true
  try {
    console.log('Chargement des professeurs...')

    let url = '/api/utilisateurs'
    if (nomRecherche && nomRecherche.trim() !== '') {
      url = `/api/utilisateurs/rechercher?nom=${encodeURIComponent(nomRecherche)}`
    }

    const response = await api.get(url)
    console.log('Réponse API professeurs:', response.data)

    // Filtrer seulement les enseignants/professeurs
    const allUsers = response.data.utilisateurs || response.data || []
    professors.value = allUsers.filter(user => user.role === 'enseignant' || user.role === 'professeur')
    
    console.log('Professeurs filtrés:', professors.value)
  } catch (error) {
    console.error('Erreur complète:', error)
    console.error('Status:', error.response?.status)
    console.error('Data:', error.response?.data)
    console.error('URL appelée:', error.config?.url)

    showNotification('Erreur lors du chargement des professeurs', 'error')
  } finally {
    loading.value = false
  }
}

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

// Filtered professors based on search query
const filteredProfessors = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) {
    // Log pour voir la structure des professeurs
    if (professors.value.length > 0) {
      console.log('Structure du premier professeur:', professors.value[0])
      console.log('Clés disponibles:', Object.keys(professors.value[0]))
    }
    return professors.value
  }
  
  return professors.value.filter(prof => 
    prof.nom?.toLowerCase().includes(query) || 
    prof.prenom?.toLowerCase().includes(query) || 
    prof.email?.toLowerCase().includes(query) ||
    prof.specialite?.toLowerCase().includes(query) ||
    prof.departement?.toLowerCase().includes(query)
  )
})

// Close modal and reset form
const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  form.value = {
    id_utilisateur: null,
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    date_inscription: today,
    specialite: '',
    departement: '',
    poste: ''
  }
}

// Edit professor
const editProfessor = (prof) => {
  form.value = { 
    ...prof,
    date_inscription: prof.date_inscription ? 
      new Date(prof.date_inscription).toISOString().split('T')[0] : 
      today
  }
  showEditModal.value = true
}

// Delete professor directly
const deleteProfessor = async (id) => {
  console.log('ID reçu pour suppression:', id)
  console.log('Type de l\'ID:', typeof id)
  
  if (!id) {
    showNotification('Aucun professeur sélectionné pour suppression', 'error')
    return
  }

  loading.value = true
  try {
    console.log('Suppression du professeur ID:', id)
    
    const response = await api.delete(`/api/utilisateurs/supprimer/${id}`)
    console.log('Réponse suppression:', response.data)
    
    showNotification('Professeur supprimé avec succès', 'success')
    await loadProfessors()
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    console.error('Status:', error.response?.status)
    console.error('Data:', error.response?.data)
    
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        'Erreur lors de la suppression'
    showNotification(errorMessage, 'error')
  } finally {
    loading.value = false
  }
}

// Save professor (add or update) - maintenant avec API
const saveProfessor = async () => {
  if (!form.value.nom || !form.value.prenom || !form.value.email) {
    showNotification('Veuillez remplir tous les champs obligatoires', 'error')
    return
  }

  loading.value = true

  try {
    if (showEditModal.value) {
      // Mise à jour d'un professeur existant
      console.log('Modification du professeur ID:', form.value.id_utilisateur)
      console.log('Données envoyées:', {
        nom: form.value.nom,
        prenom: form.value.prenom,
        email: form.value.email,
        role: 'enseignant',
        date_inscription: form.value.date_inscription,
        specialite: form.value.specialite,
        departement: form.value.departement,
        poste: form.value.poste
      })

      const response = await api.patch(`/api/utilisateurs/modifier/${form.value.id_utilisateur}`, {
        nom: form.value.nom,
        prenom: form.value.prenom,
        email: form.value.email,
        role: 'enseignant',
        date_inscription: form.value.date_inscription,
        promotion: null,
        filiere: null,
        cycle: null,
        specialite: form.value.specialite,
        departement: form.value.departement,
        poste: form.value.poste,
        niveau_access: null
      })
      
      console.log('Réponse modification:', response.data)
      showNotification('Professeur mis à jour avec succès', 'success')

    } else {
      // Création d'un nouveau professeur
      const response = await api.post('/api/utilisateurs/ajouter', {
        nom: form.value.nom,
        prenom: form.value.prenom,
        email: form.value.email,
        role: 'enseignant',
        date_inscription: form.value.date_inscription,
        promotion: null,
        filiere: null,
        cycle: null,
        specialite: form.value.specialite,
        departement: form.value.departement,
        poste: form.value.poste,
        niveau_access: null
      })
      
      console.log('Réponse ajout:', response.data)
      showNotification(`Professeur ajouté avec succès. Mot de passe: ${response.data.motDePasseGenere}`, 'success')
    }

    await loadProfessors()
    closeModal()

  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    console.error('Status:', error.response?.status)
    console.error('Data:', error.response?.data)
    
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        'Erreur lors de la sauvegarde'
    showNotification(errorMessage, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style>
/* Notification animation */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
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

/* Additional transitions */
.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
}
.duration-150 {
  transition-duration: 150ms;
}

/* Table hover effect */
.hover\:bg-blue-50:hover {
  background-color: #eff6ff;
}
</style>