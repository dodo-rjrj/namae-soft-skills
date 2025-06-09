<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-50 to-purple-50 p-6">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h1 class="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
          Évaluation Étudiant
        </h1>

        <form @submit.prevent="submitEvaluation" class="space-y-6">
          <!-- Informations Étudiant -->
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nom de l'étudiant</label>
              <input 
                v-model="student.name" 
                type="text" 
                required
                class="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Nom complet"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Code de l'étudiant</label>
              <input 
                v-model="student.code" 
                type="text" 
                required
                class="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Code étudiant"
              >
            </div>
          </div>

          <!-- Critères d'Évaluation -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800">Critères d'évaluation</h3>
            
            <div 
              v-for="criteria in evaluationCriteria" 
              :key="criteria.id"
              class="bg-gradient-to-r from-sky-50 to-purple-50 p-4 rounded-lg"
            >
              <div class="flex justify-between items-center mb-3">
                <label class="font-medium text-gray-700">{{ criteria.name }}</label>
                <span class="text-2xl font-bold text-sky-600">{{ criteria.score }}/5</span>
              </div>
              
              <div class="flex space-x-2">
                <button
                  v-for="score in 5"
                  :key="score"
                  type="button"
                  @click="criteria.score = score"
                  :class="[
                    'w-10 h-10 rounded-full font-bold transition-all',
                    score <= criteria.score 
                      ? 'bg-gradient-to-r from-sky-500 to-purple-500 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  ]"
                >
                  {{ score }}
                </button>
              </div>
            </div>
          </div>

          <!-- Commentaires -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Commentaires</label>
            <textarea 
              v-model="comments" 
              rows="4"
              class="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="Observations et recommandations..."
            ></textarea>
          </div>

          <!-- Note Globale -->
          <div class="bg-gradient-to-r from-sky-100 to-purple-100 p-6 rounded-lg text-center">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Note Globale</h3>
            <div class="text-4xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
              {{ globalScore.toFixed(1) }}/5
            </div>
            <div class="text-sm text-gray-600 mt-2">{{ getGradeText(globalScore) }}</div>
          </div>

          <!-- Boutons -->
          <div class="flex space-x-4">
            <button
              type="button"
              @click="resetForm"
              class="flex-1 py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Réinitialiser
            </button>
            <button
              type="submit"
              class="flex-1 py-3 px-6 bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-lg hover:from-sky-600 hover:to-purple-600 transition-all shadow-lg"
            >
              Soumettre l'évaluation
            </button>
          </div>
        </form>

        <!-- Message de confirmation -->
        <div 
          v-if="showSuccess" 
          class="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700 text-center"
        >
          ✅ Évaluation soumise avec succès !
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const student = ref({
  name: '',
  code: ''
})

const evaluationCriteria = ref([
  { id: 1, name: 'Compréhension', score: 0 },
  { id: 2, name: 'Participation', score: 0 },
  { id: 3, name: 'Travail personnel', score: 0 },
  { id: 4, name: 'Progression', score: 0 },
  { id: 5, name: 'Attitude', score: 0 }
])

const comments = ref('')
const showSuccess = ref(false)

const globalScore = computed(() => {
  const total = evaluationCriteria.value.reduce((sum, criteria) => sum + criteria.score, 0)
  return total / evaluationCriteria.value.length
})

const getGradeText = (score) => {
  if (score >= 4.5) return 'Excellent'
  if (score >= 3.5) return 'Très bien'
  if (score >= 2.5) return 'Bien'
  if (score >= 1.5) return 'Passable'
  return 'À améliorer'
}

const submitEvaluation = () => {
  // Simulation de soumission
  console.log('Évaluation soumise:', {
    student: student.value,
    criteria: evaluationCriteria.value,
    comments: comments.value,
    globalScore: globalScore.value
  })
  
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

const resetForm = () => {
  student.value = { name: '', code: '' }
  evaluationCriteria.value.forEach(criteria => criteria.score = 0)
  comments.value = ''
  showSuccess.value = false
}
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>