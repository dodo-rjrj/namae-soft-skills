<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Créer un Nouveau Projet</h1>
        
        <form @submit.prevent="createProject" class="space-y-6">
          <!-- Informations du projet -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nom du Projet *
              </label>
              <input
                v-model="projectForm.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Application de gestion de tâches"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Niveau de Difficulté *
              </label>
              <select
                v-model="projectForm.difficulty"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un niveau</option>
                <option value="Débutant">🟢 Débutant</option>
                <option value="Intermédiaire">🟡 Intermédiaire</option>
                <option value="Avancé">🟠 Avancé</option>
                <option value="Expert">🔴 Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Description du Projet *
            </label>
            <textarea
              v-model="projectForm.description"
              required
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Décrivez les objectifs et les fonctionnalités du projet..."
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Niveau de Compétence Requis (%)
              </label>
              <input
                v-model.number="projectForm.requiredLevel"
                type="number"
                min="0"
                max="100"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 75"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Date Limite
              </label>
              <input
                v-model="projectForm.deadline"
                type="date"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Compétences requises -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Compétences Requises
            </label>
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="skill in projectForm.skills"
                :key="skill"
                class="inline-flex items-center px-3 py-2 rounded-full text-sm bg-blue-100 text-blue-800 border"
              >
                {{ skill }}
                <button
                  type="button"
                  @click="removeSkill(skill)"
                  class="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                >
                  ×
                </button>
              </span>
            </div>
            <div class="flex gap-2">
              <input
                v-model="newSkill"
                type="text"
                @keyup.enter="addSkill"
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ajouter une compétence (Ex: Vue.js, JavaScript...)"
              />
              <button
                type="button"
                @click="addSkill"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                +
              </button>
            </div>
          </div>

          <!-- Sélection des élèves -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-4">
              Assigner aux Élèves
            </label>
            
            <!-- Filtres -->
            <div class="mb-4 flex gap-4">
              <div class="flex-1">
                <input
                  v-model="studentFilter"
                  type="text"
                  placeholder="🔍 Rechercher un élève..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                v-model="competenceFilter"
                class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tous les niveaux</option>
                <option value="0-50">🔴 0-50% de compétence</option>
                <option value="51-75">🟡 51-75% de compétence</option>
                <option value="76-100">🟢 76-100% de compétence</option>
              </select>
            </div>

            <!-- Liste des élèves -->
            <div class="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
              <div class="p-4 border-b bg-gray-50">
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    :checked="allStudentsSelected"
                    @change="toggleAllStudents"
                    class="mr-3 w-4 h-4"
                  />
                  <span class="font-medium">Sélectionner tous les élèves visibles</span>
                </label>
              </div>
              
              <div
                v-for="student in filteredStudents"
                :key="student.id"
                class="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <label class="flex items-center justify-between cursor-pointer">
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      :value="student.id"
                      v-model="projectForm.assignedStudents"
                      class="mr-4 w-4 h-4"
                    />
                    <div>
                      <div class="font-medium text-gray-900">{{ student.name }}</div>
                      <div class="text-sm text-gray-500">
                        {{ student.currentCompetence }}% de compétence
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="w-20 bg-gray-200 rounded-full h-3 mr-3">
                      <div
                        class="bg-blue-500 h-3 rounded-full transition-all"
                        :style="{ width: student.currentCompetence + '%' }"
                      ></div>
                    </div>
                    <span
                      class="px-3 py-1 rounded-full text-xs font-medium"
                      :class="getCompetenceColor(student.currentCompetence)"
                    >
                      {{ getCompetenceLevel(student.currentCompetence) }}
                    </span>
                  </div>
                </label>
              </div>
            </div>
            
            <div class="mt-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              📊 {{ projectForm.assignedStudents.length }} élève(s) sélectionné(s)
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <span v-if="isSubmitting">⏳ Création en cours...</span>
              <span v-else>Créer le Projet</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Aperçu du projet -->
      <div v-if="projectForm.name" class="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 class="text-xl font-semibold mb-4">👀 Aperçu du Projet</h2>
        <div class="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-gray-50">
          <div class="flex items-start justify-between mb-3">
            <h3 class="font-bold text-gray-900 text-lg">{{ projectForm.name }}</h3>
            <span
              v-if="projectForm.difficulty"
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="getDifficultyColor(projectForm.difficulty)"
            >
              {{ projectForm.difficulty }}
            </span>
          </div>
          <p v-if="projectForm.description" class="text-gray-600 mb-4 leading-relaxed">
            {{ projectForm.description }}
          </p>
          <div class="flex items-center justify-between">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in projectForm.skills"
                :key="skill"
                class="px-3 py-1 bg-white border border-blue-200 text-blue-800 text-sm rounded-full"
              >
                {{ skill }}
              </span>
            </div>
            <div v-if="projectForm.requiredLevel" class="text-sm text-gray-500 font-medium">
              📈 Niveau requis: {{ projectForm.requiredLevel }}%
            </div>
          </div>
          <div v-if="projectForm.deadline" class="mt-3 text-sm text-gray-500">
            📅 Date limite: {{ formatDate(projectForm.deadline) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// État du formulaire
const projectForm = ref({
  name: '',
  description: '',
  difficulty: '',
  requiredLevel: 70,
  deadline: '',
  skills: [],
  assignedStudents: []
})

const newSkill = ref('')
const studentFilter = ref('')
const competenceFilter = ref('')
const isSubmitting = ref(false)

// Données des élèves (à remplacer par un appel API)
const students = ref([
  { 
    id: 1, 
    name: 'Alice Martin', 
    currentCompetence: 85
  },
  { 
    id: 2, 
    name: 'Bob Dupont', 
    currentCompetence: 78
  },
  { 
    id: 3, 
    name: 'Claire Moreau', 
    currentCompetence: 92
  },
  { 
    id: 4, 
    name: 'David Leroy', 
    currentCompetence: 71
  },
  { 
    id: 5, 
    name: 'Emma Rousseau', 
    currentCompetence: 88
  },
  { 
    id: 6, 
    name: 'François Dubois', 
    currentCompetence: 45
  },
  { 
    id: 7, 
    name: 'Gabrielle Petit', 
    currentCompetence: 63
  }
])

// Élèves filtrés
const filteredStudents = computed(() => {
  let filtered = students.value

  // Filtre par nom
  if (studentFilter.value) {
    filtered = filtered.filter(student =>
      student.name.toLowerCase().includes(studentFilter.value.toLowerCase())
    )
  }

  // Filtre par niveau de compétence
  if (competenceFilter.value) {
    const [min, max] = competenceFilter.value.split('-').map(Number)
    filtered = filtered.filter(student =>
      student.currentCompetence >= min && student.currentCompetence <= max
    )
  }

  return filtered
})

// Vérifier si tous les élèves visibles sont sélectionnés
const allStudentsSelected = computed(() => {
  return filteredStudents.value.length > 0 &&
    filteredStudents.value.every(student =>
      projectForm.value.assignedStudents.includes(student.id)
    )
})

// Méthodes
const addSkill = () => {
  if (newSkill.value.trim() && !projectForm.value.skills.includes(newSkill.value.trim())) {
    projectForm.value.skills.push(newSkill.value.trim())
    newSkill.value = ''
  }
}

const removeSkill = (skill) => {
  projectForm.value.skills = projectForm.value.skills.filter(s => s !== skill)
}

const toggleAllStudents = () => {
  if (allStudentsSelected.value) {
    // Désélectionner tous les élèves visibles
    projectForm.value.assignedStudents = projectForm.value.assignedStudents.filter(
      id => !filteredStudents.value.some(student => student.id === id)
    )
  } else {
    // Sélectionner tous les élèves visibles
    const visibleIds = filteredStudents.value.map(student => student.id)
    projectForm.value.assignedStudents = [
      ...new Set([...projectForm.value.assignedStudents, ...visibleIds])
    ]
  }
}

const getCompetenceLevel = (competence) => {
  if (competence >= 90) return 'Expert'
  if (competence >= 75) return 'Avancé'
  if (competence >= 50) return 'Intermédiaire'
  return 'Débutant'
}

const getCompetenceColor = (competence) => {
  if (competence >= 90) return 'bg-purple-100 text-purple-800'
  if (competence >= 75) return 'bg-green-100 text-green-800'
  if (competence >= 50) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

const getDifficultyColor = (difficulty) => {
  const colors = {
    'Débutant': 'bg-green-100 text-green-800',
    'Intermédiaire': 'bg-yellow-100 text-yellow-800',
    'Avancé': 'bg-orange-100 text-orange-800',
    'Expert': 'bg-red-100 text-red-800'
  }
  return colors[difficulty] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const createProject = async () => {
  isSubmitting.value = true
  
  try {
    // Ici vous pouvez appeler votre API pour créer le projet
    // const response = await fetch('/api/projects', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(projectForm.value)
    // })
    
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    resetForm()
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  projectForm.value = {
    name: '',
    description: '',
    difficulty: '',
    requiredLevel: 70,
    deadline: '',
    skills: [],
    assignedStudents: []
  }
  newSkill.value = ''
  studentFilter.value = ''
  competenceFilter.value = ''
}

// Charger les élèves au montage du composant
onMounted(async () => {
  // Ici vous pouvez appeler votre API pour récupérer les élèves
  // const response = await fetch('/api/students')
  // students.value = await response.json()
})
</script>

<style scoped>
.transition-colors {
  transition: background-color 0.2s ease;
}

.transition-all {
  transition: all 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>