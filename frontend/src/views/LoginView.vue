<template>
    <div class="auth-container">
        <div class="auth-card">
            <h1>Login</h1>
            <form @submit.prevent="handleLogin" class="auth-form">
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
                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        v-model="password" 
                        required 
                        placeholder="Enter your password"
                    >
                </div>
                <button type="submit" class="submit-btn" :disabled="loading">
                    {{ loading ? 'Logging in...' : 'Login' }}
                </button>
                <p class="auth-link">
                    Don't have an account? <router-link to="/register">Register</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const handleLogin = async () => {
    loading.value = true
    try {
        await authStore.login(email.value, password.value)
        const redirectPath = route.query.redirect || '/dashboard'
        router.push(redirectPath)
    } catch (error) {
        console.error('Login failed:', error)
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