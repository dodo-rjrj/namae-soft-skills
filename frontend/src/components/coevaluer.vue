<template>
  <div class="min-h-screen p-6">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Évaluation de Soft Skills
          </h1>
          <p class="text-gray-600 mt-2">Évaluez les compétences de votre collègue</p>
        </div>

        <form @submit.prevent="submitEvaluation" class="space-y-8">
          <!-- Informations de base -->
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Informations de base</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom du collègue à évaluer</label>
                <input 
                  v-model="colleague.name" 
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Nom complet du collègue"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Code du collègue</label>
                <input 
                  v-model="colleague.code" 
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Code étudiant"
                >
              </div>
            </div>
          </div>

          <!-- Sélection de la compétence -->
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
            <label class="block text-lg font-semibold text-gray-800 mb-4">Compétence à évaluer</label>
            <select 
              v-model="selectedSkill" 
              @change="loadQuestions"
              required
              class="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
            >
              <option value="">Choisissez une compétence...</option>
              <option v-for="skill in softSkills" :key="skill.id" :value="skill.id">
                {{ skill.name }}
              </option>
            </select>
          </div>

          <!-- Questions d'évaluation -->
          <div v-if="currentQuestions.length > 0" class="space-y-6">
            <h3 class="text-xl font-bold text-gray-800 text-center">
              Questions pour : {{ getCurrentSkillName() }}
            </h3>
            
            <div 
              v-for="(question, index) in currentQuestions" 
              :key="question.id"
              class="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 shadow-sm"
            >
              <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-800 mb-2">Question {{ index + 1 }}</h4>
                  <p class="text-gray-700 text-lg">{{ question.text }}</p>
                </div>
                <div class="ml-4 text-center">
                  <div class="text-3xl font-bold text-purple-600">{{ question.score }}/5</div>
                  <div class="text-sm text-gray-500">Note</div>
                </div>
              </div>
              
              <div class="flex justify-center space-x-3">
                <button
                  v-for="score in 5"
                  :key="score"
                  type="button"
                  @click="question.score = score"
                  :class="[
                    'w-12 h-12 rounded-full font-bold transition-all transform hover:scale-110',
                    score <= question.score 
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  ]"
                >
                  {{ score }}
                </button>
              </div>
            </div>
          </div>

          <!-- Commentaires -->
          <div v-if="selectedSkill" class="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl">
            <label class="block text-lg font-semibold text-gray-800 mb-3">Commentaires et observations</label>
            <textarea 
              v-model="comments" 
              rows="4"
              class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              placeholder="Partagez vos observations sur cette compétence..."
            ></textarea>
          </div>

          <!-- Score final -->
          <div v-if="currentQuestions.length > 0" class="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-8 rounded-2xl text-center border-2 border-purple-200">
            <h3 class="text-2xl font-bold text-gray-800 mb-3">Score Final</h3>
            <div class="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {{ finalScore.toFixed(1) }}/5
            </div>
            <div class="text-lg font-semibold text-gray-700">{{ getScoreLabel(finalScore) }}</div>
            <div class="text-sm text-gray-600 mt-2">{{ getCurrentSkillName() }}</div>
          </div>

          <!-- Boutons -->
          <div v-if="selectedSkill" class="flex space-x-4">
            <button
              type="button"
              @click="resetEvaluation"
              class="flex-1 py-4 px-6 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-semibold"
            >
              Réinitialiser
            </button>
            <button
              type="submit"
              :disabled="!canSubmit"
              :class="[
                'flex-1 py-4 px-6 rounded-xl font-semibold transition-all shadow-lg transform hover:scale-105',
                canSubmit 
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              Soumettre l'évaluation
            </button>
          </div>
        </form>

        <!-- Message de confirmation -->
        <div 
          v-if="showSuccess" 
          class="mt-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-2xl text-green-800 text-center shadow-lg"
        >
          <div class="text-2xl mb-2">🎉</div>
          <div class="font-semibold">Évaluation soumise avec succès !</div>
          <div class="text-sm mt-1">Merci pour votre contribution</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const colleague = ref({
  name: '',
  code: ''
})

const selectedSkill = ref('')
const currentQuestions = ref([])
const comments = ref('')
const showSuccess = ref(false)

// Définition des soft skills et leurs questions
const softSkills = ref([
  {
    id: 'communication',
    name: 'Communication',
    questions: [
      { id: 1, text: "S'exprime clairement et de manière structurée lors des présentations", score: 0 },
      { id: 2, text: "Écoute activement les autres et pose des questions pertinentes", score: 0 },
      { id: 3, text: "Adapte son style de communication selon l'audience", score: 0 },
      { id: 4, text: "Utilise efficacement les outils de communication digitale", score: 0 },
      { id: 5, text: "Donne des feedbacks constructifs et les reçoit positivement", score: 0 }
    ]
  },
  {
    id: 'teamwork',
    name: 'Travail d\'équipe',
    questions: [
      { id: 1, text: "Collabore efficacement avec ses coéquipiers", score: 0 },
      { id: 2, text: "Partage ses connaissances et aide les autres", score: 0 },
      { id: 3, text: "Respecte les opinions et idées des autres membres", score: 0 },
      { id: 4, text: "Contribue activement aux discussions de groupe", score: 0 },
      { id: 5, text: "Gère bien les conflits et trouve des compromis", score: 0 }
    ]
  },
  {
    id: 'leadership',
    name: 'Leadership',
    questions: [
      { id: 1, text: "Prend des initiatives et propose des solutions", score: 0 },
      { id: 2, text: "Motive et inspire les autres membres du groupe", score: 0 },
      { id: 3, text: "Délègue efficacement les tâches selon les compétences", score: 0 },
      { id: 4, text: "Prend des décisions réfléchies sous pression", score: 0 },
      { id: 5, text: "Assume la responsabilité des résultats du groupe", score: 0 }
    ]
  },
  {
    id: 'creativity',
    name: 'Créativité et Innovation',
    questions: [
      { id: 1, text: "Propose des idées originales et innovantes", score: 0 },
      { id: 2, text: "Aborde les problèmes sous différents angles", score: 0 },
      { id: 3, text: "Expérimente de nouvelles approches sans crainte", score: 0 },
      { id: 4, text: "Inspire la créativité chez les autres", score: 0 },
      { id: 5, text: "Transforme les idées en solutions pratiques", score: 0 }
    ]
  },
  {
    id: 'adaptability',
    name: 'Adaptabilité',
    questions: [
      { id: 1, text: "S'adapte rapidement aux changements de situation", score: 0 },
      { id: 2, text: "Reste calme et efficace face aux imprévus", score: 0 },
      { id: 3, text: "Apprend rapidement de nouvelles compétences", score: 0 },
      { id: 4, text: "Modifie son approche selon les feedbacks reçus", score: 0 },
      { id: 5, text: "Voit les changements comme des opportunités", score: 0 }
    ]
  },
  {
    id: 'problem_solving',
    name: 'Résolution de problèmes',
    questions: [
      { id: 1, text: "Identifie rapidement les problèmes et leurs causes", score: 0 },
      { id: 2, text: "Analyse les situations de manière logique et méthodique", score: 0 },
      { id: 3, text: "Génère plusieurs solutions alternatives", score: 0 },
      { id: 4, text: "Évalue les risques et bénéfices des différentes options", score: 0 },
      { id: 5, text: "Implémente des solutions efficaces et durables", score: 0 }
    ]
  },
  {
    id: 'time_management',
    name: 'Gestion du temps',
    questions: [
      { id: 1, text: "Respecte les délais fixés pour les projets", score: 0 },
      { id: 2, text: "Priorise efficacement ses tâches selon leur importance", score: 0 },
      { id: 3, text: "Planifie son travail de manière réaliste", score: 0 },
      { id: 4, text: "Évite la procrastination et reste concentré", score: 0 },
      { id: 5, text: "Aide l'équipe à respecter les échéances", score: 0 }
    ]
  }
])

const finalScore = computed(() => {
  if (currentQuestions.value.length === 0) return 0
  const total = currentQuestions.value.reduce((sum, question) => sum + question.score, 0)
  return total / currentQuestions.value.length
})

const canSubmit = computed(() => {
  return colleague.value.name && 
         colleague.value.code && 
         selectedSkill.value && 
         currentQuestions.value.every(q => q.score > 0)
})

const loadQuestions = () => {
  const skill = softSkills.value.find(s => s.id === selectedSkill.value)
  if (skill) {
    currentQuestions.value = skill.questions.map(q => ({ ...q, score: 0 }))
  }
}

const getCurrentSkillName = () => {
  const skill = softSkills.value.find(s => s.id === selectedSkill.value)
  return skill ? skill.name : ''
}

const getScoreLabel = (score) => {
  if (score >= 4.5) return 'Excellent - Maîtrise exceptionnelle'
  if (score >= 4.0) return 'Très bien - Compétence solide'
  if (score >= 3.5) return 'Bien - Niveau satisfaisant'
  if (score >= 3.0) return 'Correct - Compétence développée'
  if (score >= 2.5) return 'Moyen - Peut s\'améliorer'
  if (score >= 2.0) return 'Faible - Nécessite du travail'
  return 'Très faible - Besoins importants'
}

const submitEvaluation = () => {
  const evaluation = {
    colleague: colleague.value,
    skill: selectedSkill.value,
    skillName: getCurrentSkillName(),
    questions: currentQuestions.value,
    comments: comments.value,
    finalScore: finalScore.value,
    timestamp: new Date().toISOString()
  }
  
  console.log('Évaluation soumise:', evaluation)
  
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
    resetEvaluation()
  }, 4000)
}

const resetEvaluation = () => {
  colleague.value = { name: '', code: '' }
  selectedSkill.value = ''
  currentQuestions.value = []
  comments.value = ''
  showSuccess.value = false
}
</script>

<style scoped>
/* Animations personnalisées */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>