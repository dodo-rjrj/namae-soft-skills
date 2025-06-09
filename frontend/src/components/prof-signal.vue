<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">
            Signalement d'accompagnement élève
          </h1>
          <p class="text-gray-600 text-sm">
            Outil de prévention et d'accompagnement pour identifier les situations nécessitant une attention particulière
          </p>
        </div>

        <form @submit.prevent="submitSignalement" class="space-y-6">
          <!-- Informations de base -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="eleve" class="block text-sm font-medium text-gray-700 mb-2">
                Élève concerné *
              </label>
              <select 
                id="eleve" 
                v-model="signalement.eleve" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un élève</option>
                <option value="martin-jean">Martin Jean</option>
                <option value="dupont-marie">Dupont Marie</option>
                <option value="bernard-paul">Bernard Paul</option>
                <option value="moreau-sophie">Moreau Sophie</option>
              </select>
            </div>

            <div>
              <label for="classe" class="block text-sm font-medium text-gray-700 mb-2">
                Classe
              </label>
              <input 
                type="text" 
                id="classe"
                v-model="signalement.classe"
                placeholder="Ex: 3ème A"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>

          <!-- Type de comportement -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Type de comportement observé *
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label v-for="type in typesComportement" :key="type.value" class="flex items-center">
                <input 
                  type="checkbox" 
                  :value="type.value"
                  v-model="signalement.typesComportement"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <span class="ml-2 text-sm text-gray-700">{{ type.label }}</span>
              </label>
            </div>
          </div>

          <!-- Contexte -->
          <div>
            <label for="contexte" class="block text-sm font-medium text-gray-700 mb-2">
              Contexte de l'observation
            </label>
            <select 
              id="contexte" 
              v-model="signalement.contexte"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner un contexte</option>
              <option value="cours">En cours</option>
              <option value="recreation">Récréation</option>
              <option value="cantine">Cantine</option>
              <option value="projet-groupe">Travail de groupe</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Description objective de la situation *
            </label>
            <textarea 
              id="description"
              v-model="signalement.description"
              required
              rows="4"
              placeholder="Décrivez de manière factuelle et objective la situation observée..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Niveau de priorité -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Niveau de priorité
            </label>
            <div class="flex space-x-4">
              <label v-for="niveau in niveauxPriorite" :key="niveau.value" class="flex items-center">
                <input 
                  type="radio" 
                  :value="niveau.value"
                  v-model="signalement.priorite"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                >
                <span class="ml-2 text-sm" :class="niveau.color">{{ niveau.label }}</span>
              </label>
            </div>
          </div>

          <!-- Actions déjà entreprises -->
          <div>
            <label for="actions" class="block text-sm font-medium text-gray-700 mb-2">
              Actions déjà entreprises (optionnel)
            </label>
            <textarea 
              id="actions"
              v-model="signalement.actionsEntreprises"
              rows="2"
              placeholder="Décrivez les éventuelles actions déjà mises en place..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Options de confidentialité -->
          <div class="bg-blue-50 p-4 rounded-md">
            <h3 class="text-sm font-medium text-blue-900 mb-3">Options de confidentialité</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input 
                  type="checkbox"
                  v-model="signalement.partageEquipe"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <span class="ml-2 text-sm text-blue-800">Partager avec l'équipe pédagogique</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="checkbox"
                  v-model="signalement.notifierDirection"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <span class="ml-2 text-sm text-blue-800">Notifier la direction</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="checkbox"
                  v-model="signalement.anonyme"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <span class="ml-2 text-sm text-blue-800">Signalement anonyme</span>
              </label>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              type="button"
              @click="resetForm"
              class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Annuler
            </button>
            <button 
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Envoyer le signalement
            </button>
          </div>
        </form>

        <!-- Message de confirmation -->
        <div v-if="showConfirmation" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <p class="text-green-800 text-sm">
              Signalement envoyé avec succès. L'équipe d'accompagnement sera notifiée.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignalementEleve',
  data() {
    return {
      showConfirmation: false,
      signalement: {
        eleve: '',
        classe: '',
        typesComportement: [],
        contexte: '',
        description: '',
        priorite: 'normale',
        actionsEntreprises: '',
        partageEquipe: true,
        notifierDirection: false,
        anonyme: false
      },
      typesComportement: [
        { value: 'desengagement', label: 'Désengagement scolaire' },
        { value: 'conflits', label: 'Conflits entre pairs' },
        { value: 'agressivite', label: 'Comportement agressif' },
        { value: 'isolement', label: 'Isolement social' },
        { value: 'participation', label: 'Manque de participation' },
        { value: 'absenteisme', label: 'Absentéisme récurrent' },
        { value: 'perturbation', label: 'Perturbation en classe' },
        { value: 'autre', label: 'Autre comportement' }
      ],
      niveauxPriorite: [
        { value: 'faible', label: 'Faible', color: 'text-green-600' },
        { value: 'normale', label: 'Normale', color: 'text-yellow-600' },
        { value: 'elevee', label: 'Élevée', color: 'text-red-600' }
      ]
    }
  },
  methods: {
    submitSignalement() {
      // Validation basique
      if (!this.signalement.eleve || !this.signalement.description || this.signalement.typesComportement.length === 0) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }

      // Simulation de l'envoi
      console.log('Signalement envoyé:', this.signalement);
      
      // Afficher la confirmation
      this.showConfirmation = true;
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        this.resetForm();
        this.showConfirmation = false;
      }, 3000);
    },
    resetForm() {
      this.signalement = {
        eleve: '',
        classe: '',
        typesComportement: [],
        contexte: '',
        description: '',
        priorite: 'normale',
        actionsEntreprises: '',
        partageEquipe: true,
        notifierDirection: false,
        anonyme: false
      };
    }
  }
}
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>