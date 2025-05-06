<template>
  <div class="admin-panel bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Tabs -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
      
      <!-- Users Tab -->
      <div v-if="activeTab === 'users'" class="users-tab">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-blue-800 mb-3 sm:mb-0">Gestion des Utilisateurs</h1>
          <button 
            @click="openUserModal(null)" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Ajouter un utilisateur
          </button>
        </div>
        
        <!-- Users Filter -->
        <div class="bg-white p-4 rounded-md shadow mb-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
              <input 
                v-model="userFilter.search" 
                placeholder="Nom ou email..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select 
                v-model="userFilter.type" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tous les types</option>
                <option value="student">Étudiant</option>
                <option value="teacher">Professeur</option>
                <option value="professional">Professionnel</option>
              </select>
            </div>
            <div class="flex items-end">
              <button 
                @click="resetUserFilters"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
        
        <!-- Users Table -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-blue-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Nom</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in filteredUsers" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="{
                      'bg-blue-100 text-blue-800': user.type === 'student',
                      'bg-purple-100 text-purple-800': user.type === 'teacher',
                      'bg-green-100 text-green-800': user.type === 'professional'
                    }" 
                    class="px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ userTypeLabels[user.type] }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="openUserModal(user)" class="text-blue-600 hover:text-blue-900 mr-4">Modifier</button>
                  <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Skills Tab -->
      <div v-if="activeTab === 'skills'" class="skills-tab">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-blue-800 mb-3 sm:mb-0">Gestion des Compétences</h1>
          <button 
            @click="openSkillModal(null)" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Ajouter une compétence
          </button>
        </div>
        
        <!-- Skills Filter -->
        <div class="bg-white p-4 rounded-md shadow mb-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
              <input 
                v-model="skillFilter.search" 
                placeholder="Nom ou description..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select 
                v-model="skillFilter.category" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Toutes les catégories</option>
                <option value="communication">Communication</option>
                <option value="leadership">Leadership</option>
                <option value="teamwork">Travail d'équipe</option>
                <option value="problem-solving">Résolution de problèmes</option>
                <option value="adaptability">Adaptabilité</option>
              </select>
            </div>
            <div class="flex items-end">
              <button 
                @click="resetSkillFilters"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
        
        <!-- Skills Table -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-blue-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Nom</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Description</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Catégorie</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="skill in filteredSkills" :key="skill.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ skill.name }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ skill.description }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="{
                      'bg-blue-100 text-blue-800': skill.category === 'communication',
                      'bg-purple-100 text-purple-800': skill.category === 'leadership',
                      'bg-green-100 text-green-800': skill.category === 'teamwork',
                      'bg-yellow-100 text-yellow-800': skill.category === 'problem-solving',
                      'bg-indigo-100 text-indigo-800': skill.category === 'adaptability'
                    }" 
                    class="px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ skillCategoryLabels[skill.category] }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="openSkillModal(skill)" class="text-blue-600 hover:text-blue-900 mr-4">Modifier</button>
                  <button @click="deleteSkill(skill.id)" class="text-red-600 hover:text-red-900">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Roles Tab -->
      <div v-if="activeTab === 'roles'" class="roles-tab">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">Définition des Rôles et Permissions</h2>
        
        <div class="bg-white shadow overflow-hidden sm:rounded-md p-6">
          <div v-for="role in roles" :key="role.id" class="mb-6 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">{{ role.name }}</h3>
              <div class="flex items-center">
                <label class="inline-flex items-center mr-4">
                  <input type="checkbox" v-model="role.isAnonymous" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <span class="ml-2 text-sm text-gray-700">Anonymat</span>
                </label>
                <button @click="saveRoleSettings(role)" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium">
                  Enregistrer
                </button>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="permission in permissions" :key="permission.id" class="flex items-center">
                <input 
                  type="checkbox" 
                  :id="`${role.id}-${permission.id}`" 
                  v-model="role.permissions[permission.id]"
                  class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                <label :for="`${role.id}-${permission.id}`" class="ml-2 text-sm text-gray-700">
                  {{ permission.name }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Weights Tab -->
      <div v-if="activeTab === 'weights'" class="weights-tab">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">Définition des Pondérations</h2>
        
        <div class="bg-white shadow overflow-hidden sm:rounded-md p-6">
          <div class="mb-6">
            <p class="text-sm text-gray-500 mb-4">Définissez le poids relatif de chaque type d'évaluateur. Le total doit être égal à 100%.</p>
            
            <div class="space-y-4">
              <div v-for="weight in weights" :key="weight.id" class="flex items-center">
                <label :for="`weight-${weight.id}`" class="w-32 text-sm font-medium text-gray-700">{{ weight.name }}</label>
                <div class="flex-1 flex items-center">
                  <input 
                    type="range" 
                    :id="`weight-${weight.id}`" 
                    v-model.number="weight.value" 
                    min="0" 
                    max="100" 
                    class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  >
                  <div class="w-16 ml-4">
                    <input 
                      type="number" 
                      v-model.number="weight.value" 
                      min="0" 
                      max="100" 
                      class="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                    >
                  </div>
                  <span class="ml-1 text-sm text-gray-500">%</span>
                </div>
              </div>
            </div>
            
            <div class="mt-6 flex items-center">
              <div class="text-sm font-medium text-gray-700">Total:</div>
              <div class="ml-2 text-sm" :class="totalWeight === 100 ? 'text-green-600' : 'text-red-600'">
                {{ totalWeight }}%
              </div>
              <div v-if="totalWeight !== 100" class="ml-2 text-sm text-red-600">
                (Le total doit être égal à 100%)
              </div>
            </div>
            
            <div class="mt-6">
              <button 
                @click="saveWeights" 
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                :disabled="totalWeight !== 100"
              >
                Enregistrer les pondérations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- User Modal -->
    <div v-if="showUserModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingUser ? 'Modifier' : 'Ajouter' }} un utilisateur
        </h3>
        
        <div class="space-y-4">
          <div>
            <label for="user-name" class="block text-sm font-medium text-gray-700">Nom</label>
            <input 
              type="text" 
              id="user-name" 
              v-model="userForm.name" 
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
          </div>
          
          <div>
            <label for="user-email" class="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="user-email" 
              v-model="userForm.email" 
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
          </div>
          
          <div>
            <label for="user-type" class="block text-sm font-medium text-gray-700">Type</label>
            <select 
              id="user-type" 
              v-model="userForm.type" 
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="student">Étudiant</option>
              <option value="teacher">Professeur</option>
              <option value="professional">Professionnel</option>
            </select>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="showUserModal = false" 
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button 
            @click="saveUser" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            {{ editingUser ? 'Mettre à jour' : 'Ajouter' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Skill Modal -->
    <div v-if="showSkillModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingSkill ? 'Modifier' : 'Ajouter' }} une compétence
        </h3>
        
        <div class="space-y-4">
          <div>
            <label for="skill-name" class="block text-sm font-medium text-gray-700">Nom</label>
            <input 
              type="text" 
              id="skill-name" 
              v-model="skillForm.name" 
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
          </div>
          
          <div>
            <label for="skill-description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              id="skill-description" 
              v-model="skillForm.description" 
              rows="3"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          
          <div>
            <label for="skill-category" class="block text-sm font-medium text-gray-700">Catégorie</label>
            <select 
              id="skill-category" 
              v-model="skillForm.category" 
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="communication">Communication</option>
              <option value="leadership">Leadership</option>
              <option value="teamwork">Travail d'équipe</option>
              <option value="problem-solving">Résolution de problèmes</option>
              <option value="adaptability">Adaptabilité</option>
            </select>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="showSkillModal = false" 
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button 
            @click="saveSkill" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            {{ editingSkill ? 'Mettre à jour' : 'Ajouter' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Tabs
const tabs = [
  { id: 'users', name: '⚙️ Utilisateurs' },
  { id: 'skills', name: '🧠 Compétences' },
  { id: 'roles', name: '🔒 Rôles & Permissions' },
  { id: 'weights', name: '⚖️ Pondérations' }
]
const activeTab = ref('users')

// Users
const users = ref([
  { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com', type: 'student' },
  { id: 2, name: 'Marie Martin', email: 'marie.martin@example.com', type: 'teacher' },
  { id: 3, name: 'Pierre Durand', email: 'pierre.durand@example.com', type: 'professional' },
  { id: 4, name: 'Sophie Lambert', email: 'sophie.lambert@example.com', type: 'student' },
  { id: 5, name: 'Thomas Moreau', email: 'thomas.moreau@example.com', type: 'teacher' }
])

const userTypeLabels = {
  student: 'Étudiant',
  teacher: 'Professeur',
  professional: 'Professionnel'
}

const userFilter = ref({
  search: '',
  type: ''
})

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = !userFilter.value.search || 
      user.name.toLowerCase().includes(userFilter.value.search.toLowerCase()) || 
      user.email.toLowerCase().includes(userFilter.value.search.toLowerCase())
    
    const matchesType = !userFilter.value.type || user.type === userFilter.value.type
    
    return matchesSearch && matchesType
  })
})

function resetUserFilters() {
  userFilter.value = {
    search: '',
    type: ''
  }
}

// Skills
const skills = ref([
  { id: 1, name: 'Communication orale', description: 'Capacité à s\'exprimer clairement à l\'oral', category: 'communication' },
  { id: 2, name: 'Travail en équipe', description: 'Capacité à collaborer efficacement avec d\'autres personnes', category: 'teamwork' },
  { id: 3, name: 'Résolution de problèmes', description: 'Capacité à analyser et résoudre des problèmes complexes', category: 'problem-solving' },
  { id: 4, name: 'Prise de décision', description: 'Capacité à prendre des décisions éclairées', category: 'leadership' },
  { id: 5, name: 'Adaptation au changement', description: 'Capacité à s\'adapter à de nouvelles situations', category: 'adaptability' }
])

const skillCategoryLabels = {
  communication: 'Communication',
  leadership: 'Leadership',
  teamwork: 'Travail d\'équipe',
  'problem-solving': 'Résolution problèmes',
  adaptability: 'Adaptabilité'
}

const skillFilter = ref({
  search: '',
  category: ''
})

const filteredSkills = computed(() => {
  return skills.value.filter(skill => {
    const matchesSearch = !skillFilter.value.search || 
      skill.name.toLowerCase().includes(skillFilter.value.search.toLowerCase()) || 
      skill.description.toLowerCase().includes(skillFilter.value.search.toLowerCase())
    
    const matchesCategory = !skillFilter.value.category || skill.category === skillFilter.value.category
    
    return matchesSearch && matchesCategory
  })
})

function resetSkillFilters() {
  skillFilter.value = {
    search: '',
    category: ''
  }
}

// User Methods
function openUserModal(user) {
  if (user) {
    editingUser.value = user
    userForm.value = { ...user }
  } else {
    editingUser.value = null
    userForm.value = { name: '', email: '', type: 'student' }
  }
  showUserModal.value = true
}

function saveUser() {
  if (editingUser.value) {
    const index = users.value.findIndex(u => u.id === editingUser.value.id)
    if (index !== -1) {
      users.value[index] = { ...userForm.value, id: editingUser.value.id }
    }
  } else {
    const newId = Math.max(0, ...users.value.map(u => u.id)) + 1
    users.value.push({ ...userForm.value, id: newId })
  }
  showUserModal.value = false
}

function deleteUser(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    users.value = users.value.filter(u => u.id !== id)
  }
}

// Skill Methods
function openSkillModal(skill) {
  if (skill) {
    editingSkill.value = skill
    skillForm.value = { ...skill }
  } else {
    editingSkill.value = null
    skillForm.value = { name: '', description: '', category: 'communication' }
  }
  showSkillModal.value = true
}

function saveSkill() {
  if (editingSkill.value) {
    const index = skills.value.findIndex(s => s.id === editingSkill.value.id)
    if (index !== -1) {
      skills.value[index] = { ...skillForm.value, id: editingSkill.value.id }
    }
  } else {
    const newId = Math.max(0, ...skills.value.map(s => s.id)) + 1
    skills.value.push({ ...skillForm.value, id: newId })
  }
  showSkillModal.value = false
}

function deleteSkill(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
    skills.value = skills.value.filter(s => s.id !== id)
  }
}

// Roles and Permissions
const roles = ref([
  { 
    id: 1, 
    name: 'Administrateur', 
    isAnonymous: false,
    permissions: { 
      createUser: true, 
      editUser: true, 
      deleteUser: true,
      createSkill: true,
      editSkill: true,
      deleteSkill: true,
      viewReports: true,
      exportData: true
    } 
  },
  { 
    id: 2, 
    name: 'Professeur', 
    isAnonymous: false,
    permissions: { 
      createUser: false, 
      editUser: false, 
      deleteUser: false,
      createSkill: false,
      editSkill: false,
      deleteSkill: false,
      viewReports: true,
      exportData: true
    } 
  },
  { 
    id: 3, 
    name: 'Étudiant', 
    isAnonymous: true,
    permissions: { 
      createUser: false, 
      editUser: false, 
      deleteUser: false,
      createSkill: false,
      editSkill: false,
      deleteSkill: false,
      viewReports: false,
      exportData: false
    } 
  }
])

const permissions = [
  { id: 'createUser', name: 'Créer des utilisateurs' },
  { id: 'editUser', name: 'Modifier des utilisateurs' },
  { id: 'deleteUser', name: 'Supprimer des utilisateurs' },
  { id: 'createSkill', name: 'Créer des compétences' },
  { id: 'editSkill', name: 'Modifier des compétences' },
  { id: 'deleteSkill', name: 'Supprimer des compétences' },
  { id: 'viewReports', name: 'Voir les rapports' },
  { id: 'exportData', name: 'Exporter les données' }
]

// Role Methods
function saveRoleSettings(role) {
  alert(`Paramètres du rôle "${role.name}" enregistrés avec succès.`)
}

// Weights
const weights = ref([
  { id: 1, name: 'Professeurs', value: 30 },
  { id: 2, name: 'Pairs', value: 40 },
  { id: 3, name: 'Auto-évaluation', value: 10 },
  { id: 4, name: 'Professionnels', value: 20 }
])

const totalWeight = computed(() => {
  return weights.value.reduce((sum, weight) => sum + weight.value, 0)
})

// Weight Methods
function saveWeights() {
  if (totalWeight.value !== 100) {
    alert('Le total des pondérations doit être égal à 100%.')
    return
  }
  
  alert('Pondérations enregistrées avec succès.')
}

const showUserModal = ref(false)
const editingUser = ref(null)
const userForm = ref({ name: '', email: '', type: 'student' })

const showSkillModal = ref(false)
const editingSkill = ref(null)
const skillForm = ref({ name: '', description: '', category: 'communication' })
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

/* Badge colors */
.bg-blue-100 {
  background-color: #dbeafe;
}
.text-blue-800 {
  color: #1e40af;
}
.bg-purple-100 {
  background-color: #f3e8ff;
}
.text-purple-800 {
  color: #6b21a8;
}
.bg-green-100 {
  background-color: #dcfce7;
}
.text-green-800 {
  color: #166534;
}
.bg-yellow-100 {
  background-color: #fef9c3;
}
.text-yellow-800 {
  color: #854d0e;
}
.bg-indigo-100 {
  background-color: #e0e7ff;
}
.text-indigo-800 {
  color: #3730a3;
}
</style>