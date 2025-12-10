<template>
  <div class="settings-page bg-gray-50 min-h-screen p-9 m-10 w-full">
      <div class="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <!-- Header -->
          <div class="bg-blue-600 px-6 py-4">
            <h1 class="text-2xl font-bold text-white">Paramètres</h1>
          </div>
  
          <!-- Profile Card -->
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="h-16 w-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img 
                    v-if="settings.profile.avatar" 
                    :src="settings.profile.avatar" 
                    alt="Photo de profil"
                    class="h-full w-full object-cover"
                  />
                  <div v-else class="h-full w-full flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h2 class="text-lg font-medium text-gray-900">{{ settings.account.name }}</h2>
                  <p class="text-sm text-gray-500">{{ settings.account.email }}</p>
                </div>
              </div>
              <button 
                @click="activeTab = 'profile'"
                class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Modifier
              </button>
            </div>
          </div>
    
          <!-- Tabs Navigation -->
          <div class="border-b border-gray-200">
            <nav class="flex -mb-px">
              <button 
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'px-4 py-3 text-sm font-medium',
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>
    
          <!-- Tab Content -->
          <div class="p-6">
            <!-- Profile Settings -->
            <div v-if="activeTab === 'profile'" class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Profil</h3>
                
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Photo de profil</label>
                  <div class="flex items-center">
                    <div class="h-20 w-20 rounded-full bg-gray-200 overflow-hidden mr-4">
                      <img 
                        v-if="settings.profile.avatar" 
                        :src="settings.profile.avatar" 
                        alt="Photo de profil" 
                        class="h-full w-full object-cover"
                      />
                      <div v-else class="h-full w-full flex items-center justify-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <button 
                        type="button" 
                        class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Télécharger une photo
                      </button>
                      <p class="mt-1 text-xs text-gray-500">PNG, JPG jusqu'à 2MB</p>
                    </div>
                  </div>
                </div>
  
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    v-model="settings.account.name"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                </div>
                
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    v-model="settings.account.email"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                </div>
  
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    v-model="settings.profile.bio"
                    rows="3"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Quelques mots à propos de vous..."
                  ></textarea>
                </div>
              </div>
            </div>
  
            <!-- Notification Settings -->
            <div v-if="activeTab === 'notification'" class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
              <div class="space-y-3">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="email-notifications"
                    v-model="settings.notifications.email"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="email-notifications" class="ml-2 block text-sm text-gray-700">
                    Notifications par email
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="push-notifications"
                    v-model="settings.notifications.push"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="push-notifications" class="ml-2 block text-sm text-gray-700">
                    Notifications push
                  </label>
                </div>
              </div>
            </div>
    
            <!-- Account Settings -->
            <div v-if="activeTab === 'mot de passe'" class="space-y-6">

                <h3 class="text-lg font-medium text-gray-900 mb-4">Changer le mot de passe</h3>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                    <input
                      type="password"
                      v-model="password.current"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                    <input
                      type="password"
                      v-model="password.new"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      v-model="password.confirm"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                  </div>
                </div>
              </div>
            </div>
    
            <!-- Privacy Settings -->
            <div v-if="activeTab === 'privacy'" class="space-y-4 p-9">
              <div class="border-b border-gray-200 pb-4">
                <h3 class="text-lg font-medium text-gray-900 mb-6">Confidentialité</h3>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="profile-visible"
                      v-model="settings.privacy.profileVisible"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    >
                    <label for="profile-visible" class="ml-2 block text-sm text-gray-700">
                      Rendre mon profil visible
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="data-sharing"
                      v-model="settings.privacy.dataSharing"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    >
                    <label for="data-sharing" class="ml-2 block text-sm text-gray-700">
                      Partager des données avec des tiers
                    </label>
                  </div>
                </div>
              </div>
    
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Supprimer le compte</h3>
                <p class="text-sm text-gray-500 mb-4">Cette action est irréversible. Toutes vos données seront supprimées.</p>
                <button
                  @click="confirmAccountDeletion = true"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Supprimer mon compte
                </button>
              </div>
            </div>
    
            <!-- Save Button -->
            <div class="mt-8 flex justify-end">
              <button
                @click="saveSettings"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
    
        <!-- Delete Account Confirmation Modal -->
        <div v-if="confirmAccountDeletion" class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Supprimer le compte</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Êtes-vous sûr de vouloir supprimer votre compte ? Cette action ne peut pas être annulée.</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  @click="deleteAccount"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                >
                  Supprimer
                </button>
                <button
                  type="button"
                  @click="confirmAccountDeletion = false"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
      
      </div>
    </template>
    
    <script setup>
    import { ref } from 'vue'
    
    const tabs = [
      { id: 'profile', name: 'Profil' },
      { id: 'notification', name: 'Notification' },
      { id: 'mot de passe', name: 'Changer le Mot de Passe' },
      { id: 'privacy', name: 'Confidentialité' }
    ]
    
    const activeTab = ref('')
    const confirmAccountDeletion = ref(false)
    
    const settings = ref({
      language: 'fr',
      theme: 'light',
      notifications: {
        email: true,
        push: false
      },
      account: {
        name: 'rajei douae',
        email: 'rajei.douae@etu.uae.acma'
      },
      profile: {
        avatar: null,
        bio: "Développeur web passionné par les nouvelles technologies."
      },
      privacy: {
        profileVisible: true,
        dataSharing: false
      }
    })
    
    const password = ref({
      current: '',
      new: '',
      confirm: ''
    })
    
    function saveSettings() {
      alert('Paramètres enregistrés avec succès!')
      // Ici vous pourriez envoyer les données à votre API
    }
    
    function deleteAccount() {
      alert('Compte supprimé (simulation)')
      confirmAccountDeletion.value = false
      // Ici vous pourriez appeler votre API pour supprimer le compte
    }
    </script>
    
    <style scoped>
    /* Vous pouvez ajouter des styles personnalisés ici si nécessaire */
    </style>