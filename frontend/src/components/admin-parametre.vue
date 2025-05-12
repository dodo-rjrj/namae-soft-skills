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
import { ref, computed } from 'vue'

// pondérations par défaut
const weights = ref([
  { id: 1, name: 'Professeurs',      value: 30 },
  { id: 2, name: 'Pairs',            value: 40 },
  { id: 3, name: 'Auto-évaluation',  value: 10 },
  { id: 4, name: 'Professionnels',   value: 20 }
])

// somme en temps réel
const totalWeight = computed(() =>
  weights.value.reduce((sum, w) => sum + w.value, 0)
)

// validation + persistance (placeholder)
function saveWeights () {
  if (totalWeight.value !== 100) return
  // 👉 remplace ceci par ton appel API / store
  alert('Pondérations enregistrées ✔️')
}
</script>

<style>
/* Palette bleue sobre */
.text-blue-800 { color:#1e40af }
.bg-blue-600   { background:#1fa65a }
.bg-blue-700   { background:#1d4ed8 }
</style>
