<template>
    <div class="auth-container">
        <div class="auth-card">
            <h1>Register</h1>
            <form @submit.prevent="handleRegister" class="auth-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        v-model="email" 
                        required 
                        placeholder="Enter your email"
                    >
                </div>
                <button type="submit" class="submit-btn" :disabled="loading">
                    {{ loading ? 'Sending link...' : 'Send Password Link' }}
                </button>
                <p class="auth-link">
                    Already have an account? <router-link to="/login">Login</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const email = ref('')
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const handleRegister = async () => {
    loading.value = true
    try {
        // First check if email exists
        const emailExists = await authStore.checkEmail(email.value)
        
        if (emailExists) {
            // If email exists, send password reset link
            await authStore.sendPasswordReset(email.value)
            alert('Password reset link has been sent to your email')
            router.push('/login')
        } else {
            // If email doesn't exist, show a message
            alert('This email does not exist.')
        }
    } catch (error) {
        console.error('Registration failed:', error)
        alert('Failed to process your request. Please try again.')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    padding: 1rem;
}

.auth-card {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.auth-card h1 {
    margin: 0 0 1.5rem 0;
    color: #333;
    text-align: center;
    font-size: 1.8rem;
}

.auth-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    color: #666;
    font-size: 0.9rem;
}

.form-group input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
}

.form-group input:focus {
    outline: none;
    border-color: #4CAF50;
}

.submit-btn {
    padding: 0.75rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.submit-btn:hover {
    background-color: #45a049;
}

.submit-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.auth-link {
    text-align: center;
    color: #666;
    margin: 0;
}

.auth-link a {
    color: #4CAF50;
    text-decoration: none;
}

.auth-link a:hover {
    text-decoration: underline;
}

@media (max-width: 480px) {
    .auth-card {
        padding: 1.5rem;
    }
}
</style> 