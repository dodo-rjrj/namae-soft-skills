<template>
    <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input v-model="email" class="input" type="email" required />
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input v-model="password" class="input" type="password" required />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button type="submit" class="button is-primary" :disabled="loading">
                        {{ loading ? "Logging in..." : "Login" }}
                    </button>
                </div>
            </div>
        </form>
        <p class="register-link">
            Don't have an account? <router-link to="/register">Register here</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'
import axios from '../services/axios'

const email = ref('')
const password = ref('')
const loading = ref(false)

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const login = async () => {
    loading.value = true
    try {
        const { data } = await axios.post('/login', {
            email: email.value,
            password: password.value,
        })

        authStore.login(data.user, data.token, data.refreshToken)

        const redirect = route.query.redirect || '/dashboard'
        router.push(redirect)
    } catch (err) {
        let errorMessage = 'An error occurred during login'
        
        if (err.response) {
            switch (err.response.status) {
                case 401:
                    errorMessage = 'Invalid email or password'
                    break
                case 429:
                    errorMessage = 'Too many login attempts. Please try again later'
                    break
                case 500:
                    errorMessage = 'Server error. Please try again later'
                    break
                default:
                    errorMessage = err.response.data?.message || 'Login failed'
            }
        } else if (err.request) {
            errorMessage = 'Network error. Please check your connection'
        }
        
        alert('Login failed: ' + errorMessage)
    } finally {
        loading.value = false
    }
}
</script>