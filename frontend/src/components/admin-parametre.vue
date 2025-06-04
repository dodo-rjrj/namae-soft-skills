<template>
  <div class="weights-tab bg-white min-h-screen p-8">
<h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 bg-clip-text text-transparent">Définition des Pondérations</h1>

    <div class="bg-white shadow rounded-lg p-6">
      <p class="text-sm text-gray-500 mb-6">
        Attribue le poids de chaque type d’évaluateur. Le total doit être <strong>100 %</strong>.
      </p>

      <!-- sliders + inputs -->
      <div class="space-y-5">
        <div
          v-for="weight in weights"
          :key="weight.id"
          class="flex items-center"
        >
          <label
            class="w-40 text-sm font-medium text-gray-700"
            :for="`weight-${weight.id}`"
          >
            {{ weight.name }}
          </label>

          <input
            class="flex-1 h-2 bg-gray-200 rounded-lg cursor-pointer accent-blue-600"
            type="range"
            :id="`weight-${weight.id}`"
            v-model.number="weight.value"
            min="0"
            max="100"
          />

          <input
            class="w-20 ml-4 px-2 py-1 text-sm border border-gray-300 rounded-lg text-center"
            type="number"
            v-model.number="weight.value"
            min="0"
            max="100"
          />
          <span class="ml-1 text-sm text-gray-500">%</span>
        </div>
      </div>

      <!-- total + CTA -->
      <div class="mt-8 flex items-center">
        <span class="text-sm font-medium text-gray-700">Total :</span>
        <span
          class="ml-2 text-sm font-semibold"
          :class="totalWeight === 100 ? 'text-green-600' : 'text-red-600'"
        >
          {{ totalWeight }} %
        </span>
        <span
          v-if="totalWeight !== 100"
          class="ml-2 text-sm text-red-600"
        >
          (le total doit être 100 %)
        </span>
      </div>

      <button
        class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
        :disabled="totalWeight !== 100"
        @click="saveWeights"
      >
        Enregistrer les pondérations
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api.js' // Assurez-vous d'avoir votre service API

// États
const weights = ref([
  { id: 1, name: 'Professeurs',      value: 30 },
  { id: 2, name: 'Pairs',            value: 40 },
  { id: 3, name: 'Auto-évaluation',  value: 10 },
  { id: 4, name: 'Professionnels',   value: 20 }
])

const loading = ref(false)
const notification = ref({
  show: false,
  message: '',
  type: 'info' // 'success', 'error', 'warning', 'info'
})

// Computed - somme en temps réel
const totalWeight = computed(() =>
  weights.value.reduce((sum, w) => sum + w.value, 0)
)

// Validation de la somme
const isValidTotal = computed(() => totalWeight.value === 100)

// Utilitaires
function showNotification(message, type = 'info') {
  notification.value = {
    show: true,
    message,
    type
  }
  
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

// Chargement des pondérations depuis l'API
async function loadWeights() {
  console.log('=== CHARGEMENT DES PONDÉRATIONS ===')
  loading.value = true
  
  try {
    const response = await api.get('/api/ponderation')
    console.log('✅ Pondérations reçues:', response.data)
    
    if (response.data && Array.isArray(response.data)) {
      // Si l'API retourne un tableau de pondérations
      weights.value = response.data.map(pond => ({
        id: pond.id,
        name: pond.name || pond.nom || pond.type,
        value: pond.value || pond.valeur || pond.poids || 0
      }))
    } else if (response.data && typeof response.data === 'object') {
      // Si l'API retourne un objet avec les pondérations
      const ponderationData = response.data
      
      // Adaptation selon la structure de votre API
      weights.value = [
        { 
          id: 1, 
          name: 'Professeurs', 
          value: ponderationData.professeurs || ponderationData.teachers || 30 
        },
        { 
          id: 2, 
          name: 'Pairs', 
          value: ponderationData.pairs || ponderationData.peers || 40 
        },
        { 
          id: 3, 
          name: 'Auto-évaluation', 
          value: ponderationData.auto_evaluation || ponderationData.self_assessment || 10 
        },
        { 
          id: 4, 
          name: 'Professionnels', 
          value: ponderationData.professionnels || ponderationData.professionals || 20 
        }
      ]
    }
    
    console.log('✅ Pondérations chargées:', weights.value)
    showNotification('Pondérations chargées avec succès', 'success')
    
  } catch (error) {
    console.error('❌ Erreur lors du chargement:', error)
    
    let errorMessage = 'Erreur lors du chargement des pondérations'
    
    if (error.response?.status === 404) {
      errorMessage = 'Aucune pondération trouvée, utilisation des valeurs par défaut'
      console.log('Utilisation des valeurs par défaut')
    } else if (error.response?.status === 401) {
      errorMessage = 'Non autorisé - Veuillez vous reconnecter'
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error
    }
    
    showNotification(errorMessage, error.response?.status === 404 ? 'warning' : 'error')
    
  } finally {
    loading.value = false
    console.log('=== FIN CHARGEMENT ===')
  }
}

// Sauvegarde des pondérations
async function saveWeights() {
  console.log('=== SAUVEGARDE DES PONDÉRATIONS ===')
  
  // Validation
  if (!isValidTotal.value) {
    showNotification(`La somme doit être égale à 100% (actuellement: ${totalWeight.value}%)`, 'warning')
    return
  }

  loading.value = true
  
  try {
    // Préparation des données selon votre structure API
    const payload = {
      professeurs: weights.value.find(w => w.id === 1)?.value || 0,
      pairs: weights.value.find(w => w.id === 2)?.value || 0,
      auto_evaluation: weights.value.find(w => w.id === 3)?.value || 0,
      professionnels: weights.value.find(w => w.id === 4)?.value || 0,
      total: totalWeight.value
    }
    
    // Alternative: envoyer directement le tableau
    // const payload = weights.value
    
    console.log('Payload envoyé:', payload)
    
    const response = await api.post('/api/ponderation', payload)
    console.log('✅ Pondérations sauvegardées:', response.data)
    
    showNotification('Pondérations enregistrées avec succès ✔️', 'success')
    
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error)
    
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
    
    showNotification(errorMessage, 'error')
    
  } finally {
    loading.value = false
    console.log('=== FIN SAUVEGARDE ===')
  }
}

// Mise à jour d'une pondération spécifique
async function updateWeight(weightId, newValue) {
  console.log(`=== MISE À JOUR PONDÉRATION ${weightId} ===`)
  
  loading.value = true
  
  try {
    const payload = {
      value: newValue,
      // Ajoutez d'autres champs si nécessaire
    }
    
    const response = await api.put(`/api/ponderation/${weightId}`, payload)
    console.log('✅ Pondération mise à jour:', response.data)
    
    // Mise à jour locale
    const weight = weights.value.find(w => w.id === weightId)
    if (weight) {
      weight.value = newValue
    }
    
    showNotification('Pondération mise à jour avec succès', 'success')
    
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error)
    
    let errorMessage = 'Erreur lors de la mise à jour'
    
    if (error.response?.status === 404) {
      errorMessage = 'Pondération non trouvée'
    } else if (error.response?.status === 400) {
      errorMessage = error.response.data?.error || 'Valeur invalide'
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error
    }
    
    showNotification(errorMessage, 'error')
    
    // Recharger les données en cas d'erreur
    await loadWeights()
    
  } finally {
    loading.value = false
    console.log('=== FIN MISE À JOUR ===')
  }
}

// Réinitialisation aux valeurs par défaut
function resetToDefaults() {
  weights.value = [
    { id: 1, name: 'Professeurs',      value: 30 },
    { id: 2, name: 'Pairs',            value: 40 },
    { id: 3, name: 'Auto-évaluation',  value: 10 },
    { id: 4, name: 'Professionnels',   value: 20 }
  ]
  showNotification('Valeurs par défaut restaurées', 'info')
}

// Répartition équitable
function distributeEqually() {
  const equalValue = Math.floor(100 / weights.value.length)
  const remainder = 100 % weights.value.length
  
  weights.value.forEach((weight, index) => {
    weight.value = equalValue + (index < remainder ? 1 : 0)
  })
  
  showNotification('Répartition équitable appliquée', 'info')
}

// Validation en temps réel lors de la saisie
function validateInput(weightId, newValue) {
  const numValue = parseInt(newValue) || 0
  
  if (numValue < 0) {
    showNotification('La valeur ne peut pas être négative', 'warning')
    return false
  }
  
  if (numValue > 100) {
    showNotification('La valeur ne peut pas dépasser 100%', 'warning')
    return false
  }
  
  return true
}

// Gestion des changements de valeur
function handleWeightChange(weightId, newValue) {
  if (!validateInput(weightId, newValue)) return
  
  const weight = weights.value.find(w => w.id === weightId)
  if (weight) {
    weight.value = parseInt(newValue) || 0
  }
}

// Initialisation
onMounted(async () => {
  console.log('🚀 Composant monté, chargement des pondérations...')
  await loadWeights()
})

// Exposition des méthodes pour le template
defineExpose({
  // Données
  weights,
  totalWeight,
  isValidTotal,
  loading,
  notification,
  
  // Méthodes principales
  loadWeights,
  saveWeights,
  updateWeight,
  
  // Méthodes utilitaires
  resetToDefaults,
  distributeEqually,
  handleWeightChange,
  validateInput,
  showNotification
})
</script>



<style>
/* Palette bleue sobre */
.text-blue-800 { color:#1e40af }
.bg-blue-600   { background:#1fa65a }
.bg-blue-700   { background:#1d4ed8 }
</style>
