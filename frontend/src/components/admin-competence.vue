<template>
  <div class="admin-panel min-h-screen bg-white-100 ">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Compétences Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 bg-clip-text text-transparent">Gestion des Compétences</h1>
          <p class="mt-1 text-sm text-gray-600">Gérez les compétences et leurs critères d'évaluation</p>
        </div>
        <button 
          @click="openCompetenceModal(null)" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Ajouter une compétence
        </button>
      </div>
      
      <!-- Compétences Filter -->
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
                v-model="competenceFilter.search" 
                placeholder="Nom ou description..."
                class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
          </div>
          
          <div class="flex items-end">
            <button 
              @click="resetCompetenceFilters"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              Réinitialiser
            </button>
          </div>
          
          <div class="flex items-center justify-end">
            <div class="bg-blue-100 px-4 py-2.5 rounded-lg flex items-center">
              <span class="text-sm font-medium text-blue-800">{{ competences.length }} compétence(s)</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Compétences Table -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-blue-50">
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Nom</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Description</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Critères</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="competence in filteredCompetences" :key="competence.id" class="hover:bg-blue-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ competence.name }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-700 line-clamp-2">{{ competence.description }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="bg-blue-100 text-blue-800 py-1 px-2.5 rounded-full text-xs font-semibold">
                      {{ competence.criteres.length }} critère(s)
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button 
                      @click="openCompetenceModal(competence)" 
                      class="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors duration-200"
                      title="Modifier"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>

                    
                    <button 
                      @click="deleteCompetence(competence.id)" 
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
              <tr v-if="filteredCompetences.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-sm text-gray-500 bg-gray-50">
                  <div class="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-lg font-medium text-gray-600">Aucune compétence trouvée</p>
                    <button 
                      @click="resetCompetenceFilters" 
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
    
    <!-- Compétence Modal -->
    <div v-if="showCompetenceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="p-6 border-b border-gray-200 bg-blue-50">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-900">
              {{ editingCompetence ? 'Modifier' : 'Ajouter' }} une compétence
            </h3>
            <button 
              @click="showCompetenceModal = false" 
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
            <label for="competence-name" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input 
              type="text" 
              id="competence-name" 
              v-model="competenceForm.name" 
              class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Nom de la compétence"
            >
          </div>
          
          <div>
            <label for="competence-description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              id="competence-description" 
              v-model="competenceForm.description" 
              rows="3"
              class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Description détaillée de la compétence"
            ></textarea>
          </div>
          
          <div>
            <div class="flex justify-between items-center mb-3">
              <label class="block text-sm font-medium text-gray-700">Critères d'évaluation</label>
              <button 
                @click="addCritere" 
                type="button"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Ajouter un critère
              </button>
            </div>
            
            <div v-if="competenceForm.criteres.length === 0" class="bg-gray-50 rounded-lg p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p class="text-sm text-gray-500">Aucun critère défini</p>
              <p class="text-xs text-gray-400 mt-1">Cliquez sur "Ajouter un critère" pour commencer</p>
            </div>
            
            <div v-else class="space-y-3">
              <div 
                v-for="(critere, index) in competenceForm.criteres" 
                :key="index" 
                class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div class="flex-grow">
                  <input 
                    type="text" 
                    v-model="critere.titre" 
                    placeholder="Titre du critère"
                    class="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                </div>
                <button 
                  @click="removeCritere(index)" 
                  type="button"
                  class="inline-flex items-center p-2 border border-transparent rounded-full text-red-600 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  title="Supprimer ce critère"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            @click="showCompetenceModal = false" 
            class="bg-white py-2.5 px-5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Annuler
          </button>
          <button 
            @click="saveCompetence" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {{ editingCompetence ? 'Mettre à jour' : 'Ajouter' }}
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

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api.js'

// États
const competences = ref([])
const loading = ref(false)
const notification = ref({
  show: false,
  title: '',
  message: '',
  type: 'info' // Ajout du type pour différents styles
})
const showCompetenceModal = ref(false)
const editingCompetence = ref(null)
const competenceFilter = ref({ search: '' })
const competenceForm = ref({ 
  name: '', 
  description: '', 
  criteres: [] 
})

// Computed
const filteredCompetences = computed(() => {
  if (!competenceFilter.value.search) return competences.value
  
  const searchTerm = competenceFilter.value.search.toLowerCase().trim()
  return competences.value.filter(competence => {
    return (
      competence.nom?.toLowerCase().includes(searchTerm) ||
      competence.description?.toLowerCase().includes(searchTerm)
    )
  })
})

// Méthodes utilitaires
function showNotif(title, msg, type = 'info') {
  notification.value = { 
    show: true, 
    title, 
    message: msg, 
    type 
  }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

function resetFilters() {
  competenceFilter.value = { search: '' }
}

function resetForm() {
  competenceForm.value = { 
    name: '', 
    description: '', 
    criteres: [] 
  }
  editingCompetence.value = null
}

// Méthodes API
async function fetchCompetences() {
  console.log('=== CHARGEMENT DES COMPÉTENCES ===')
  loading.value = true
  
  try {
    const response = await api.get('/api/competences/rechercher')
    console.log('✅ Réponse API:', response.data)
    
    if (Array.isArray(response.data)) {
      competences.value = response.data.map(c => ({
        ...c,
        // Normalisation des propriétés
        name: c.nom || c.name,
        id: c.id_competence || c.id,
        description: c.description || '',
        criteres: c.criteres || []
      }))
      console.log(`✅ ${competences.value.length} compétences chargées`)
    } else {
      console.warn('⚠️ Format de données inattendu:', response.data)
      competences.value = []
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du chargement:', error)
    console.error('Status:', error.response?.status)
    console.error('Data:', error.response?.data)
    
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        'Erreur lors du chargement des compétences'
    showNotif('Erreur', errorMessage, 'error')
    competences.value = []
    
  } finally {
    loading.value = false
    console.log('=== FIN CHARGEMENT ===')
  }
}

function openCompetenceModal(competence = null) {
  console.log('Ouverture modal pour:', competence)
  
  editingCompetence.value = competence
  
  if (competence) {
    // Mode édition
    competenceForm.value = { 
      name: competence.nom || competence.name || '', 
      description: competence.description || '', 
      criteres: Array.isArray(competence.criteres) ? [...competence.criteres] : []
    }
  } else {
    // Mode création
    resetForm()
  }
  
  showCompetenceModal.value = true
}

function closeCompetenceModal() {
  showCompetenceModal.value = false
  resetForm()
}

async function saveCompetence() {
  console.log('=== SAUVEGARDE COMPÉTENCE ===')
  console.log('Données du formulaire:', competenceForm.value)
  
  // Validation
  if (!competenceForm.value.name?.trim()) {
    showNotif('Attention', 'Le nom de la compétence est obligatoire', 'warning')
    return
  }

  loading.value = true
  
  try {
    const payload = {
      nom: competenceForm.value.name.trim(),
      description: competenceForm.value.description?.trim() || '',
      criteres: competenceForm.value.criteres || []
    }
    
    console.log('Payload envoyé:', payload)

    let response
    if (editingCompetence.value) {
      // Mise à jour
      const id = editingCompetence.value.id_competence || editingCompetence.value.id
      console.log('Mise à jour compétence ID:', id)
      
      response = await api.put(`/api/competences/${id}`, payload)
      showNotif('Succès', 'Compétence mise à jour avec succès', 'success')
      
    } else {
      // Création
      console.log('Création nouvelle compétence')
      response = await api.post('/api/competences/ajouter', payload)
      showNotif('Succès', 'Compétence créée avec succès', 'success')
    }
    
    console.log('✅ Réponse serveur:', response.data)
    
    // Fermer le modal et recharger
    closeCompetenceModal()
    await fetchCompetences()
    
  } catch (error) {
    console.error('❌ Erreur sauvegarde:', error)
    console.error('Status:', error.response?.status)
    console.error('Data:', error.response?.data)
    
    let errorMessage = 'Erreur lors de la sauvegarde'
    
    if (error.response?.status === 400) {
      errorMessage = error.response.data?.error || 'Données invalides'
    } else if (error.response?.status === 401) {
      errorMessage = 'Non autorisé - Veuillez vous reconnecter'
    } else if (error.response?.status === 403) {
      errorMessage = 'Permissions insuffisantes'
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error
    }
    
    showNotif('Erreur', errorMessage, 'error')
    
  } finally {
    loading.value = false
    console.log('=== FIN SAUVEGARDE ===')
  }
}

function confirmDeleteCompetence(competence) {
  const name = competence.nom || competence.name || 'cette compétence'
  if (confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?\n\nCette action est irréversible.`)) {
    deleteCompetence(competence.id_competence || competence.id)
  }
}

async function deleteCompetence(id) {
  console.log('=== SUPPRESSION COMPÉTENCE ===')
  console.log('ID à supprimer:', id)
  
  if (!id) {
    showNotif('Erreur', 'Aucune compétence sélectionnée', 'error')
    return
  }

  loading.value = true
  
  // Endpoints possibles à tester
  const endpoints = [
    `/competences/${id}`,
    `/competences/supprimer/${id}`,
    `/api/competences/${id}`,
    `/api/competences/supprimer/${id}`
  ]
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Tentative suppression avec: ${endpoint}`)
      
      const response = await api.delete(endpoint)
      console.log('✅ Suppression réussie:', response.data)
      
      showNotif('Succès', 'Compétence supprimée avec succès', 'success')
      
      // Suppression optimiste côté frontend
      competences.value = competences.value.filter(c => 
        (c.id_competence || c.id) !== id
      )
      
      // Puis rechargement pour synchroniser
      await fetchCompetences()
      loading.value = false
      return
      
    } catch (error) {
      console.log(`❌ Échec avec ${endpoint}:`, error.response?.status)
      
      // Si c'est le dernier endpoint et qu'il échoue
      if (endpoint === endpoints[endpoints.length - 1]) {
        console.error('❌ Toutes les tentatives ont échoué:', error)
        
        let errorMessage = 'Erreur lors de la suppression'
        
        if (error.response?.status === 404) {
          errorMessage = 'Compétence non trouvée'
        } else if (error.response?.status === 401) {
          errorMessage = 'Non autorisé - Veuillez vous reconnecter'
        } else if (error.response?.status === 403) {
          errorMessage = 'Permissions insuffisantes'
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error
        }
        
        showNotif('Erreur', errorMessage, 'error')
      }
    }
  }
  
  loading.value = false
  console.log('=== FIN SUPPRESSION ===')
}


function addCritere() {
  competenceForm.value.criteres.push({ 
    id: Date.now(),
    titre: '',
    description: ''
  })
  console.log('Critère ajouté, total:', competenceForm.value.criteres.length)
}

function removeCritere(index) {
  if (index >= 0 && index < competenceForm.value.criteres.length) {
    competenceForm.value.criteres.splice(index, 1)
    console.log(`Critère ${index} supprimé, restant:`, competenceForm.value.criteres.length)
  }
}

// Méthodes d'export (optionnel)
function exportCompetences() {
  try {
    const dataStr = JSON.stringify(competences.value, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `competences_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    
    URL.revokeObjectURL(url)
    showNotif('Succès', 'Compétences exportées', 'success')
  } catch (error) {
    console.error('Erreur export:', error)
    showNotif('Erreur', 'Erreur lors de l\'export', 'error')
  }
}

// Initialisation
onMounted(() => {
  console.log('🚀 Composant monté, chargement des compétences...')
  fetchCompetences()
})

// Exposition des méthodes pour le template
defineExpose({
  fetchCompetences,
  openCompetenceModal,
  closeCompetenceModal,
  saveCompetence,
  confirmDeleteCompetence,
  deleteCompetence,
  addCritere,
  removeCritere,
  exportCompetences,
  resetFilters
})
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