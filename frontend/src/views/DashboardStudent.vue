<template>
  <div class="app-container">
    <div class="navbar-container"><Navbar /></div>
    <div class="content-container">
      <div class="sidebar-container"><Sidebare role="student" /></div>
      <div class="main-content">
        <div class="header2 top-header">
          <Welcome name="MANAR" />
          <Total />
        </div>
        <SoftSkillCards />
        <CommentCount />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import Sidebare from '../components/sidebare.vue'
import Welcome from '../components/welcome.vue'
import CommentCount from '../components/comment.vue'
import Total from '../components/scorecard.vue'
import Navbar from '../components/navbar.vue'
import SoftSkillCards from '../components/SoftSkillCards.vue'
import Footer from '../components/footer.vue'

const authStore = useAuthStore()
const router = useRouter()
const user = authStore.user

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.navbar-container {
  width: 100%;
}

.content-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

.sidebar-container {
  height: 100%;
}

.main-content {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
  margin-left: 20px;
}

.header2 {
  display: flex;
  align-items: center;
  margin: 1rem;
}

.top-header {
  width: 100%;
}

.header h1 {
  margin: 0;
}
</style>