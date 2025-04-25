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

        authStore.login(data.user, data.token)

        const redirect = route.query.redirect || '/dashboard'
        router.push(redirect)
    } catch (err) {
        const message = err.response?.data?.message || 'Invalid credentials or server error'
        alert('Login failed: ' + message)
    } finally {
        loading.value = false
    }
}
</script>