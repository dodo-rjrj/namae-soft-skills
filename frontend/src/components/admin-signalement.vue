<template>
  <div class="admin-panel min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-red-700 bg-clip-text text-transparent">
            Gestion des Signalements
          </h1>
          <p class="mt-1 text-sm text-gray-600">
            Suivi et accompagnement des comportements problématiques
          </p>
        </div>
        <button 
          @click="openSignalementModal()" 
          class="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          Nouveau signalement
        </button>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-lg border border-red-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-red-100 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total signalements</p>
              <p class="text-2xl font-bold text-gray-900">{{ signalements.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg border border-orange-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-orange-100 text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">En cours</p>
              <p class="text-2xl font-bold text-gray-900">{{ signalements.filter(s => s.statut === 'en_cours').length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg border border-green-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Résolus</p>
              <p class="text-2xl font-bold text-gray-900">{{ signalements.filter(s => s.statut === 'resolu').length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Étudiants concernés</p>
              <p class="text-2xl font-bold text-gray-900">{{ new Set(signalements.map(s => s.etudiant)).size }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtres -->
      <div class="bg-white p-6 rounded-xl shadow-lg mb-8 border border-red-100">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input 
                v-model="filters.search" 
                placeholder="Étudiant, signaleur..."
                class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Type de comportement</label>
            <select 
              v-model="filters.type" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Tous les types</option>
              <option value="desengagement">Désengagement</option>
              <option value="conflit">Conflit entre pairs</option>
              <option value="agressivite">Agressivité</option>
              <option value="isolement">Isolement</option>
              <option value="participation">Manque de participation</option>
              <option value="retard">Retards récurrents</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select 
              v-model="filters.statut" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Tous les statuts</option>
              <option value="nouveau">Nouveau</option>
              <option value="en_cours">En cours</option>
              <option value="resolu">Résolu</option>
              <option value="archive">Archivé</option>
            </select>
          </div>

          <div class="flex items-end">
            <button 
              @click="resetFilters"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      <!-- Liste des signalements -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-red-100">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-red-50">
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Étudiant</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Type</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Signaleur</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Date</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Statut</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Priorité</th>
                <th scope="col" class="px-6 py-3.5 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="signalement in filteredSignalements" :key="signalement.id" class="hover:bg-red-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span class="text-sm font-medium text-gray-700">{{ getInitials(signalement.etudiant) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ signalement.etudiant }}</div>
                      <div class="text-sm text-gray-500">{{ signalement.classe }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="getTypeClass(signalement.type)">
                    {{ getTypeLabel(signalement.type) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ signalement.signaleur }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(signalement.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="getStatutClass(signalement.statut)">
                    {{ getStatutLabel(signalement.statut) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="getPrioriteClass(signalement.priorite)">
                    {{ signalement.priorite }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button 
                      @click="openDetailModal(signalement)" 
                      class="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors duration-200"
                      title="Voir détails"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    
                    <button 
                      @click="openSolutionModal(signalement)" 
                      class="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors duration-200"
                      title="Proposer solution"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredSignalements.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-sm text-gray-500 bg-gray-50">
                  <div class="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-lg font-medium text-gray-600">Aucun signalement trouvé</p>
                    <button 
                      @click="resetFilters" 
                      class="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
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

    <!-- Modal Nouveau Signalement -->
    <div v-if="showSignalementModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="p-6 border-b border-gray-200 bg-red-50">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-900">Nouveau signalement</h3>
            <button 
              @click="showSignalementModal = false" 
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Étudiant concerné *</label>
              <input 
                type="text" 
                v-model="signalementForm.etudiant" 
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Nom de l'étudiant"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Classe</label>
              <input 
                type="text" 
                v-model="signalementForm.classe" 
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Classe de l'étudiant"
              >
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type de comportement *</label>
              <select 
                v-model="signalementForm.type" 
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option value="">Sélectionner un type</option>
                <option value="desengagement">Désengagement</option>
                <option value="conflit">Conflit entre pairs</option>
                <option value="agressivite">Agressivité</option>
                <option value="isolement">Isolement</option>
                <option value="participation">Manque de participation</option>
                <option value="retard">Retards récurrents</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
              <select 
                v-model="signalementForm.priorite" 
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option value="Faible">Faible</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Élevée">Élevée</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description de la situation *</label>
            <textarea 
              v-model="signalementForm.description" 
              rows="4"
              class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Décrivez de manière claire et objective la situation observée..."
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contexte et circonstances</label>
            <textarea 
              v-model="signalementForm.contexte" 
              rows="3"
              class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Contexte dans lequel le comportement a été observé..."
            ></textarea>
          </div>

          <div class="flex items-center">
            <input 
              type="checkbox" 
              id="confidentiel" 
              v-model="signalementForm.confidentiel" 
              class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            >
            <label for="confidentiel" class="ml-2 block text-sm text-gray-900">
              Signalement confidentiel (accès restreint aux encadrants habilités)
            </label>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            @click="showSignalementModal = false" 
            class="bg-white py-2.5 px-5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            Annuler
          </button>
          <button 
            @click="saveSignalement" 
            class="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            Créer le signalement
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Détail Signalement -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="p-6 border-b border-gray-200 bg-red-50">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-900">Détail du signalement</h3>
            <button 
              @click="showDetailModal = false" 
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="p-6" v-if="selectedSignalement">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Informations principales -->
            <div class="space-y-6">
              <div>
                <h4 class="text-lg font-medium text-gray-900 mb-4">Informations principales</h4>
                <div class="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Étudiant :</span>
                    <span class="text-sm text-gray-900">{{ selectedSignalement.etudiant }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Classe :</span>
                    <span class="text-sm text-gray-900">{{ selectedSignalement.classe }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Type :</span>
                    <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getTypeClass(selectedSignalement.type)">
                      {{ getTypeLabel(selectedSignalement.type) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Priorité :</span>
                    <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getPrioriteClass(selectedSignalement.priorite)">
                      {{ selectedSignalement.priorite }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Statut :</span>
                    <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getStatutClass(selectedSignalement.statut)">
                      {{ getStatutLabel(selectedSignalement.statut) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Signalé par :</span>
                    <span class="text-sm text-gray-900">{{ selectedSignalement.signaleur }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Date :</span>
                    <span class="text-sm text-gray-900">{{ formatDate(selectedSignalement.date) }}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-lg font-medium text-gray-900 mb-4">Description</h4>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <p class="text-sm text-gray-700">{{ selectedSignalement.description }}</p>
                </div>
              </div>

              <div v-if="selectedSignalement.contexte">
                <h4 class="text-lg font-medium text-gray-900 mb-4">Contexte</h4>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <p class="text-sm text-gray-700">{{ selectedSignalement.contexte }}</p>
                </div>
              </div>
            </div>

            <!-- Actions et suivi -->
            <div class="space-y-6">
              <div>
                <h4 class="text-lg font-medium text-gray-900 mb-4">Actions entreprises</h4>
                <div class="space-y-3">
                  <div v-for="action in selectedSignalement.actions" :key="action.id" class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <div class="flex justify-between items-start mb-2">
                      <span class="text-sm font-medium text-blue-900">{{ action.type }}</span>
                      <span class="text-xs text-blue-600">{{ formatDate(action.date) }}</span>
                    </div>
                    <p class="text-sm text-blue-800">{{ action.description }}</p>
                    <div class="mt-2">
                      <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getActionStatutClass(action.statut)">
                        {{ action.statut }}
                      </span>
                    </div>
                  </div>
                  <div v-if="selectedSignalement.actions.length === 0" class="text-center py-8 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p class="text-sm">Aucune action entreprise</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-lg font-medium text-gray-900 mb-4">Mettre à jour le statut</h4>
                <div class="space-y-3">
                  <select 
                    v-model="selectedSignalement.statut" 
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="en_cours">En cours</option>
                    <option value="resolu">Résolu</option>
                    <option value="archive">Archivé</option>
                  </select>
                  <button 
                    @click="updateStatut" 
                    class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Mettre à jour le statut
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Solutions -->
    <div v-if="showSolutionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="p-6 border-b border-gray-200 bg-blue-50">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-900">Proposer une solution</h3>
            <button 
              @click="showSolutionModal = false" 
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
            <h4 class="text-lg font-medium text-gray-900 mb-4">Solutions recommandées</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="solution in solutionsRecommandees" :key="solution.id" 
                   class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors duration-200"
                   :class="{ 'border-blue-500 bg-blue-50': solutionForm.type === solution.id }"
                   @click="solutionForm.type = solution.id">
                <div class="flex items-start">
                  <input type="radio" :value="solution.id" v-model="solutionForm.type" class="mt-1 mr-3">
                  <div>
                    <h5 class="font-medium text-gray-900">{{ solution.titre }}</h5>
                    <p class="text-sm text-gray-600 mt-1">{{ solution.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description de l'action</label>
            <textarea 
              v-model="solutionForm.description" 
              rows="4"
              class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Décrivez l'action à entreprendre..."
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date prévue</label>
              <input 
                type="date" 
                v-model="solutionForm.datePrevue" 
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
              <input 
                type="text" 
                v-model="solutionForm.responsable" 
                class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nom du responsable"
              >
            </div>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            @click="showSolutionModal = false" 
            class="bg-white py-2.5 px-5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Annuler
          </button>
          <button 
            @click="saveSolution" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Proposer la solution
          </button>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <transition name="notification">
      <div v-if="notification.show" class="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-xl z-50 flex items-center max-w-md">
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

<script setup lang="ts">
import { ref, computed } from 'vue'

// Types
interface Signalement {
  id: number;
  etudiant: string;
  classe: string;
  type: string;
  description: string;
  contexte?: string;
  signaleur: string;
  date: string;
  statut: string;
  priorite: string;
  confidentiel: boolean;
  actions: Action[];
}

interface Action {
  id: number;
  type: string;
  description: string;
  date: string;
  statut: string;
  responsable: string;
}

interface Filters {
  search: string;
  type: string;
  statut: string;
}

interface NotificationType {
  show: boolean;
  title: string;
  message: string;
}

// Data
const signalements = ref<Signalement[]>([
  {
    id: 1,
    etudiant: "Marie Dubois",
    classe: "Ging2",
    type: "retard",
    description: "Étudiant régulièrement en retard, semble peu investi et se replie sur lui-même lors des cours.",
    contexte: "Observé pendant les cours de programmation et de mathématiques sur les 3 dernières semaines.",
    signaleur: "Prof. Martin",
    date: "2024-01-15",
    statut: "en_cours",
    priorite: "Moyenne",
    confidentiel: false,
    actions: [
      {
        id: 1,
        type: "Entretien individuel",
        description: "Entretien avec l'étudiant pour comprendre les causes des retards",
        date: "2024-01-18",
        statut: "Planifié",
        responsable: "Conseiller pédagogique"
      }
    ]
  },
  {
    id: 2,
    etudiant: "Ahmed Ben Ali",
    classe: "GIL1",
    type: "conflit",
    description: "Tensions récurrentes avec ses camarades lors des travaux de groupe.",
    signaleur: "Prof. Leroy",
    date: "2024-01-12",
    statut: "nouveau",
    priorite: "Élevée",
    confidentiel: true,
    actions: []
  },
  {
    id: 3,
    etudiant: "Sophie Martin",
    classe: "Master",
    type: "isolement",
    description: "Étudiant très isolé, ne participe pas aux activités de groupe.",
    signaleur: "Dr. Rousseau",
    date: "2024-01-10",
    statut: "resolu",
    priorite: "Moyenne",
    confidentiel: false,
    actions: [
      {
        id: 2,
        type: "Atelier développement personnel",
        description: "Participation à un atelier sur la confiance en soi",
        date: "2024-01-20",
        statut: "Terminé",
        responsable: "Psychologue scolaire"
      }
    ]
  }
])

const filters = ref<Filters>({
  search: '',
  type: '',
  statut: ''
})

const filteredSignalements = computed(() => {
  return signalements.value.filter(signalement => {
    const matchesSearch = !filters.value.search || 
      signalement.etudiant.toLowerCase().includes(filters.value.search.toLowerCase()) || 
      signalement.signaleur.toLowerCase().includes(filters.value.search.toLowerCase())
    
    const matchesType = !filters.value.type || signalement.type === filters.value.type
    const matchesStatut = !filters.value.statut || signalement.statut === filters.value.statut
    
    return matchesSearch && matchesType && matchesStatut
  })
})

// Modals
const showSignalementModal = ref(false)
const showDetailModal = ref(false)
const showSolutionModal = ref(false)
const selectedSignalement = ref<Signalement | null>(null)

// Forms
const signalementForm = ref({
  etudiant: '',
  classe: '',
  type: '',
  description: '',
  contexte: '',
  priorite: 'Moyenne',
  confidentiel: false
})

const solutionForm = ref({
  type: '',
  description: '',
  datePrevue: '',
  responsable: ''
})

// Solutions recommandées
const solutionsRecommandees = ref([
  {
    id: 'tutorat',
    titre: 'Séances de tutorat',
    description: 'Accompagnement personnalisé par un tuteur'
  },
  {
    id: 'atelier_dev_perso',
    titre: 'Atelier développement personnel',
    description: 'Gestion des émotions, confiance en soi'
  },
  {
    id: 'mediation',
    titre: 'Entretien de médiation',
    description: 'Résolution de conflits avec médiation'
  },
  {
    id: 'accompagnement_psycho',
    titre: 'Accompagnement psychopédagogique',
    description: 'Suivi par un professionnel'
  },
  {
    id: 'atelier_communication',
    titre: 'Atelier communication',
    description: 'Communication non violente, travail en équipe'
  },
  {
    id: 'plan_personnalise',
    titre: 'Plan d\'action personnalisé',
    description: 'Suivi individualisé avec objectifs'
  }
])

// Notification
const notification = ref<NotificationType>({
  show: false,
  title: '',
  message: ''
})

// Methods
function resetFilters() {
  filters.value = {
    search: '',
    type: '',
    statut: ''
  }
}

function openSignalementModal() {
  signalementForm.value = {
    etudiant: '',
    classe: '',
    type: '',
    description: '',
    contexte: '',
    priorite: 'Moyenne',
    confidentiel: false
  }
  showSignalementModal.value = true
}

function openDetailModal(signalement: Signalement) {
  selectedSignalement.value = { ...signalement }
  showDetailModal.value = true
}

function openSolutionModal(signalement: Signalement) {
  selectedSignalement.value = signalement
  solutionForm.value = {
    type: '',
    description: '',
    datePrevue: '',
    responsable: ''
  }
  showSolutionModal.value = true
}

function saveSignalement() {
  if (!signalementForm.value.etudiant || !signalementForm.value.type || !signalementForm.value.description) {
    showNotification('Attention', 'Veuillez remplir tous les champs obligatoires')
    return
  }
  
  const newId = Math.max(0, ...signalements.value.map(s => s.id)) + 1
  const newSignalement: Signalement = {
    id: newId,
    etudiant: signalementForm.value.etudiant,
    classe: signalementForm.value.classe,
    type: signalementForm.value.type,
    description: signalementForm.value.description,
    contexte: signalementForm.value.contexte,
    signaleur: "Utilisateur actuel", // À remplacer par l'utilisateur connecté
    date: new Date().toISOString().split('T')[0],
    statut: 'nouveau',
    priorite: signalementForm.value.priorite,
    confidentiel: signalementForm.value.confidentiel,
    actions: []
  }
  
  signalements.value.push(newSignalement)
  showSignalementModal.value = false
  showNotification('Succès', 'Le signalement a été créé avec succès')
}

function saveSolution() {
  if (!solutionForm.value.type || !solutionForm.value.description) {
    showNotification('Attention', 'Veuillez remplir tous les champs obligatoires')
    return
  }
  
  if (selectedSignalement.value) {
    const newAction: Action = {
      id: Date.now(),
      type: getSolutionLabel(solutionForm.value.type),
      description: solutionForm.value.description,
      date: solutionForm.value.datePrevue || new Date().toISOString().split('T')[0],
      statut: 'Planifié',
      responsable: solutionForm.value.responsable || 'Non assigné'
    }
    
    const signalementIndex = signalements.value.findIndex(s => s.id === selectedSignalement.value!.id)
    if (signalementIndex !== -1) {
      signalements.value[signalementIndex].actions.push(newAction)
      signalements.value[signalementIndex].statut = 'en_cours'
    }
  }
  
  showSolutionModal.value = false
  showNotification('Succès', 'La solution a été proposée avec succès')
}

function updateStatut() {
  if (selectedSignalement.value) {
    const signalementIndex = signalements.value.findIndex(s => s.id === selectedSignalement.value!.id)
    if (signalementIndex !== -1) {
      signalements.value[signalementIndex].statut = selectedSignalement.value.statut
    }
  }
  showNotification('Succès', 'Le statut a été mis à jour')
}

function showNotification(title: string, message: string) {
  notification.value = {
    show: true,
    title,
    message
  }
  
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

// Helper functions
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'desengagement': 'Désengagement',
    'conflit': 'Conflit',
    'agressivite': 'Agressivité',
    'isolement': 'Isolement',
    'participation': 'Participation',
    'retard': 'Retards',
    'autre': 'Autre'
  }
  return labels[type] || type
}

function getTypeClass(type: string): string {
  const classes: Record<string, string> = {
    'desengagement': 'bg-yellow-100 text-yellow-800',
    'conflit': 'bg-red-100 text-red-800',
    'agressivite': 'bg-red-100 text-red-800',
    'isolement': 'bg-blue-100 text-blue-800',
    'participation': 'bg-orange-100 text-orange-800',
    'retard': 'bg-purple-100 text-purple-800',
    'autre': 'bg-gray-100 text-gray-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

function getStatutLabel(statut: string): string {
  const labels: Record<string, string> = {
    'nouveau': 'Nouveau',
    'en_cours': 'En cours',
    'resolu': 'Résolu',
    'archive': 'Archivé'
  }
  return labels[statut] || statut
}

function getStatutClass(statut: string): string {
  const classes: Record<string, string> = {
    'nouveau': 'bg-red-100 text-red-800',
    'en_cours': 'bg-orange-100 text-orange-800',
    'resolu': 'bg-green-100 text-green-800',
    'archive': 'bg-gray-100 text-gray-800'
  }
  return classes[statut] || 'bg-gray-100 text-gray-800'
}

function getPrioriteClass(priorite: string): string {
  const classes: Record<string, string> = {
    'Faible': 'bg-green-100 text-green-800',
    'Moyenne': 'bg-yellow-100 text-yellow-800',
    'Élevée': 'bg-orange-100 text-orange-800',
    'Urgente': 'bg-red-100 text-red-800'
  }
  return classes[priorite] || 'bg-gray-100 text-gray-800'
}

function getActionStatutClass(statut: string): string {
  const classes: Record<string, string> = {
    'Planifié': 'bg-blue-100 text-blue-800',
    'En cours': 'bg-orange-100 text-orange-800',
    'Terminé': 'bg-green-100 text-green-800',
    'Annulé': 'bg-red-100 text-red-800'
  }
  return classes[statut] || 'bg-gray-100 text-gray-800'
}

function getSolutionLabel(type: string): string {
  const solution = solutionsRecommandees.value.find(s => s.id === type)
  return solution ? solution.titre : type
}
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