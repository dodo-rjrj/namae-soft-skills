<template>
  <!-- Step 1: Email Input -->
  <div v-if="currentStep === 1" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 class="text-2xl font-bold">Mot de passe oublié</h1>
          <p class="mt-2 text-blue-100">Entrez votre email pour réinitialiser votre mot de passe</p>
        </div>
        
        <div class="p-16">
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
          
          <div v-if="isSuccess" class="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            Un email avec un code de vérification a été envoyé à votre adresse email.
          </div>
          
          <div class="mt-4 text-center">
            <router-link to="/login" class="text-blue-600 hover:text-purple-600 text-sm">Retour à la page de connexion</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Step 2: Verification Code -->
  <div v-else-if="currentStep === 2" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-12">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 class="text-2xl font-bold">Vérification du code</h1>
          <p class="mt-2 text-blue-100">Entrez le code reçu par email</p>
        </div>
        
        <div class="p-16">
          <form @submit.prevent="verifyCode">
            <div class="mb-6">
              <label for="verificationCode" class="block text-sm font-medium text-gray-700 mb-1">Code de vérification</label>
              <input 
                type="text" 
                id="verificationCode" 
                v-model="verificationCode" 
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="123456"
                required
              />
              <p v-if="codeError" class="mt-1 text-sm text-red-600">{{ codeError }}</p>
            </div>
            
            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              :disabled="isVerifying"
            >
              <span v-if="isVerifying">Vérification en cours...</span>
              <span v-else>Vérifier le code</span>
            </button>
          </form>
          
          <div v-if="verificationSuccess" class="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            Code vérifié avec succès. Veuillez définir votre nouveau mot de passe.
          </div>
          
          <div class="mt-4 text-center">
            <button @click="currentStep = 1" class="text-blue-600 hover:text-purple-600 text-sm">Retour</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Step 3: New Password -->
  <div v-else-if="currentStep === 3" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 class="text-2xl font-bold">Nouveau mot de passe</h1>
          <p class="mt-2 text-blue-100">Entrez votre nouveau mot de passe</p>
        </div>
        
        <div class="p-16">
          <form @submit.prevent="updatePassword">
            <div class="mb-4">
              <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
              <input 
                type="password" 
                id="newPassword" 
                v-model="newPassword" 
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
              <p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
            </div>
            
            <div class="mb-6">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
              <input 
                type="password" 
                id="confirmPassword" 
                v-model="confirmPassword" 
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
              <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-600">{{ confirmPasswordError }}</p>
            </div>
            
            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              :disabled="isUpdating"
            >
              <span v-if="isUpdating">Mise à jour en cours...</span>
              <span v-else>Mettre à jour le mot de passe</span>
            </button>
          </form>
          
          <div v-if="updateSuccess" class="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            Mot de passe mis à jour avec succès. Vous allez être redirigé vers la page de connexion.
          </div>
          
          <div class="mt-4 text-center">
            <button @click="currentStep = 2" class="text-blue-600 hover:text-purple-600 text-sm">Retour</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Step management
const currentStep = ref(1);

// Step 1: Email Input
const email = ref('');
const emailError = ref('');
const isSubmitting = ref(false);
const isSuccess = ref(false);

// Step 2: Verification Code
const verificationCode = ref('');
const codeError = ref('');
const isVerifying = ref(false);
const verificationSuccess = ref(false);

// Step 3: New Password
const newPassword = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const isUpdating = ref(false);
const updateSuccess = ref(false);

// Step 1: Form validation
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

// Step 1: Form submission
const handleSubmit = async () => {
  if (!validateEmail()) return;
  
  isSubmitting.value = true;
  
  try {
    // Simulate API call to send verification code
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message and move to next step
    isSuccess.value = true;
    setTimeout(() => {
      currentStep.value = 2;
      isSuccess.value = false;
    }, 2000);
    
    // In a real application:
    // await api.sendPasswordResetCode(email.value);
    
  } catch (error) {
    console.error('Error:', error);
    emailError.value = 'Une erreur est survenue. Veuillez réessayer.';
  } finally {
    isSubmitting.value = false;
  }
};

// Step 2: Verify code
const verifyCode = async () => {
  if (!verificationCode.value) {
    codeError.value = 'Le code est requis';
    return;
  }
  
  isVerifying.value = true;
  
  try {
    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would verify the code with your backend
    // const isValid = await api.verifyResetCode(email.value, verificationCode.value);
    // if (!isValid) throw new Error('Invalid code');
    
    // For demo purposes, we'll accept any 6-digit code
    if (/^\d{6}$/.test(verificationCode.value)) {
      verificationSuccess.value = true;
      setTimeout(() => {
        currentStep.value = 3;
        verificationSuccess.value = false;
      }, 1500);
    } else {
      throw new Error('Code invalide');
    }
    
  } catch (error) {
    codeError.value = error.message || 'Code incorrect. Veuillez réessayer.';
  } finally {
    isVerifying.value = false;
  }
};

// Step 3: Validate password
const validatePassword = () => {
  let isValid = true;
  
  if (!newPassword.value) {
    passwordError.value = 'Le mot de passe est requis';
    isValid = false;
  } else if (newPassword.value.length < 8) {
    passwordError.value = 'Le mot de passe doit contenir au moins 8 caractères';
    isValid = false;
  } else {
    passwordError.value = '';
  }
  
  if (!confirmPassword.value) {
    confirmPasswordError.value = 'Veuillez confirmer votre mot de passe';
    isValid = false;
  } else if (newPassword.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Les mots de passe ne correspondent pas';
    isValid = false;
  } else {
    confirmPasswordError.value = '';
  }
  
  return isValid;
};

// Step 3: Update password
const updatePassword = async () => {
  if (!validatePassword()) return;
  
  isUpdating.value = true;
  
  try {
    // Simulate API call to update password
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real application:
    // await api.resetPassword(email.value, verificationCode.value, newPassword.value);
    
    updateSuccess.value = true;
    setTimeout(() => {
      router.push('/login');
    }, 2000);
    
  } catch (error) {
    console.error('Error:', error);
    passwordError.value = 'Une erreur est survenue. Veuillez réessayer.';
  } finally {
    isUpdating.value = false;
  }
};
</script>