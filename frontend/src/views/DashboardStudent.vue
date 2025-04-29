<template>
  <div class="app-container">
    <div class="content-container">
      <div class="sidebar-container"><Sidebare /></div>   
      <div class="main-content"> <div class="navbar-container"><Navbar /></div> <div class="content">
      <div class="header2 top-header flex items-center gap-4">
        <Welcome name="MANAR" />
          <Total />
        </div>
        <SoftSkillCards />
        <CommentCount />
        
      </div>
    </div>
  </div></div>
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
  background-color: hsla(0, 0%, 92%, 0.217);
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
  overflow-y: auto;
  overflow-x: hidden;
 
}

.header2 {
  display: flex;
  align-items: center;
  gap: 1rem; /* or gap: 16px */
}


.top-header {
  width: 100%;
}

.header h1 {
  margin: 0;
}
.content {
  flex: 1;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto; /* Only this area will scroll */
 
}

</style>