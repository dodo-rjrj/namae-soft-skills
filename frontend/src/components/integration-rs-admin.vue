chuuf hahuwa code dyl dak page dyal connexion exeterne diro ka component ila bghiti sf 


<template>
  <div class="p-4">
    <!-- En-tête -->
    <div class="mb-4">
      <h1 class="text-xl font-bold">Connexions Externes</h1>
      <p class="text-sm text-gray-500">Gérez les intégrations avec des services externes</p>
    </div>

    <!-- Cartes des connexions -->
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
      <!-- LinkedIn -->
      <div class="border rounded-lg overflow-hidden bg-white">
        <div class="p-4 border-b flex items-center justify-between">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 mr-3"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            <div>
              <h2 class="font-medium">LinkedIn</h2>
              <p class="text-xs text-gray-500">Intégration avec LinkedIn</p>
            </div>
          </div>
          <div class="flex items-center">
            <span class="text-xs mr-2" :class="linkedinActive ? 'text-green-600' : 'text-gray-400'">
              {{ linkedinActive ? 'Activé' : 'Désactivé' }}
            </span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="linkedinActive" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
        <div class="p-4">
          <p class="mb-4 text-sm">
            Cette intégration permet de connecter votre application à LinkedIn pour :
          </p>
          <ul class="list-disc pl-5 mb-4 text-sm">
            <li>Authentifier les utilisateurs via LinkedIn</li>
            <li>Récupérer des informations de profil</li>
            <li>Publier automatiquement du contenu</li>
          </ul>
          
          <div v-if="linkedinActive" class="mt-4">
            <div class="mb-3">
              <label class="block text-sm font-medium mb-1">Clé API LinkedIn</label>
              <input 
                type="password" 
                v-model="linkedinKey" 
                class="w-full border rounded p-2 text-sm"
                placeholder="Entrez votre clé API LinkedIn"
              />
            </div>
            <button 
              class="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
              @click="saveLinkedInSettings"
            >
              Enregistrer
            </button>
          </div>
          
          <div v-else class="mt-4 text-sm text-gray-500 italic">
            Activez l'intégration pour configurer les paramètres
          </div>
        </div>
      </div>

      <!-- IA -->
      <div class="border rounded-lg overflow-hidden bg-white">
        <div class="p-4 border-b flex items-center justify-between">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600 mr-3"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L13 10h3.8a2 2 0 0 1 1.98 1.67l.14.83h1.33a2 2 0 0 1 1.95 2.31l-1.33 6a2 2 0 0 1-1.95 1.69H4.12a2 2 0 0 1-1.95-1.69l-1.33-6a2 2 0 0 1 1.95-2.31h1.33l.14-.83A2 2 0 0 1 6.2 10H10l.25-.07C8.4 9.58 7 7.95 7 6a4 4 0 0 1 4-4z"/></svg>
            <div>
              <h2 class="font-medium">Module IA</h2>
              <p class="text-xs text-gray-500">Analyse automatique des commentaires</p>
            </div>
          </div>
          <div class="flex items-center">
            <span class="text-xs mr-2" :class="aiActive ? 'text-green-600' : 'text-gray-400'">
              {{ aiActive ? 'Activé' : 'Désactivé' }}
            </span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="aiActive" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
        <div class="p-4">
          <p class="mb-4 text-sm">
            Ce module utilise l'intelligence artificielle pour analyser automatiquement les commentaires et détecter :
          </p>
          <ul class="list-disc pl-5 mb-4 text-sm">
            <li>Le sentiment (positif, négatif, neutre)</li>
            <li>Les problèmes potentiels</li>
            <li>Les sujets récurrents</li>
          </ul>
          
          <div v-if="aiActive" class="mt-4">
            <div class="mb-3">
              <label class="block text-sm font-medium mb-1">Modèle d'IA</label>
              <select v-model="aiModel" class="w-full border rounded p-2 text-sm">
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5">GPT-3.5</option>
                <option value="claude">Claude</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="block text-sm font-medium mb-1">Clé API</label>
              <input 
                type="password" 
                v-model="aiKey" 
                class="w-full border rounded p-2 text-sm"
                placeholder="Entrez votre clé API"
              />
            </div>
            <button 
              class="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
              @click="saveAISettings"
            >
              Enregistrer
            </button>
          </div>
          
          <div v-else class="mt-4 text-sm text-gray-500 italic">
            Activez l'intégration pour configurer les paramètres
          </div>
        </div>
      </div>
    </div>

    <!-- Message de succès -->
    <div v-if="showSuccess" class="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>Paramètres enregistrés avec succès</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// État des intégrations
const linkedinActive = ref(false)
const aiActive = ref(false)

// Paramètres
const linkedinKey = ref('')
const aiModel = ref('gpt-3.5')
const aiKey = ref('')

// Notification
const showSuccess = ref(false)

// Méthodes
const saveLinkedInSettings = () => {
  // Ici, vous implémenteriez la logique pour sauvegarder les paramètres
  showNotification()
}

const saveAISettings = () => {
  // Ici, vous implémenteriez la logique pour sauvegarder les paramètres
  showNotification()
}

const showNotification = () => {
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}
</script>