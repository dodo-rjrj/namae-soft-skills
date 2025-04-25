<template>
    <div class="dashboard-student">
        <h1>Welcome to your Student Dashboard</h1>
        <p v-if="user">Hello, {{ user.name }}!</p>
        <button @click="logout">Logout</button>
    </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const user = authStore.user

const logout = () => {
    authStore.logout()
    router.push('/')
}
</script>

<style scoped></style>