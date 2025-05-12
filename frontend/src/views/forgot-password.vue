<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
    <div class="w-full max-w-md">
      <!-- Card container -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 class="text-2xl font-bold">Mot de passe oublié</h1>
          <p class="mt-2 text-blue-100">Entrez votre email pour réinitialiser votre mot de passe</p>
        </div>
        
        <!-- Form -->
        <div class="p-6">
          <form @submit.prevent="handleSubmit">
            <div class="mb-6">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="votre@email.com"
                required
              />
              <p v-if="emailError" class="mt-1 text-sm text-red-600">{{ emailError }}</p>
            </div>
            
            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Envoi en cours...</span>
              <span v-else>Réinitialiser le mot de passe</span>
            </button>
          </form>
          
          <!-- Success message -->
          <div v-if="isSuccess" class="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            Un email de réinitialisation a été envoyé à votre adresse email.
          </div>
          
          <!-- Back to login link -->
          <div class="mt-4 text-center">
            <router-link to="/login" class="text-blue-600 hover:text-purple-600 text-sm">Retour à la page de connexion</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Form state
const email = ref('');
const emailError = ref('');
const isSubmitting = ref(false);
const isSuccess = ref(false);

// Form validation
const validateEmail = () => {
  if (!email.value) {
    emailError.value = 'L\'email est requis';
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Veuillez entrer une adresse email valide';
    return false;
  }
  
  emailError.value = '';
  return true;
};

// Form submission
const handleSubmit = async () => {
  if (!validateEmail()) return;
  
  isSubmitting.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    isSuccess.value = true;
    email.value = '';
    
    // In a real application, you would call your API here:
    // await api.sendPasswordResetEmail(email.value);
    
  } catch (error) {
    console.error('Error:', error);
    emailError.value = 'Une erreur est survenue. Veuillez réessayer.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>