<template>
  <div class="sidebar-container transition-all duration-300" 
       :class="{ 'w-20': collapsed, 'w-64': !collapsed }">
    <div class="flex flex-col h-full bg-white text-blue-600 shadow-lg rounded-[15px]">
      <!-- Collapse button -->
      <button @click="toggleSidebar" class="inline-flex items-center justify-center 
         max-w-min whitespace-nowrap overflow-hidden 
         px-3 py-3 rounded-full 
         hover:bg-blue-50 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" :class="{ 'transform rotate-180': collapsed }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      
      </button>  
      <div class="flex-1 overflow-y-auto py-3">
        <!-- Student Menu Items -->
        <template v-if="role === 'student'">
          <!-- Dashboard -->
          <router-link
            to="/student-dashboard"
            class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
            :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }">
               <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z"></path>
            </svg>
            <span v-if="!collapsed" class="text-blue-600">Dashboard</span>
          </router-link>
          
          <!-- Evaluate Yourself -->
          <router-link
            to="/auto-evaluation"
            class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
            :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }">
               <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            <span v-if="!collapsed" class="text-blue-600">Evaluate Yourself</span>
          </router-link>
          
          <!-- Analysis -->
          <router-link
            to="/analyse"
            class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
            :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }">
               <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.6 5h2.8v14h-2.8V5ZM5 9.2h3V19H5V9.2ZM19 13h-2.8v6H19v-6Z" clip-rule="evenodd"></path>
              </svg>
            <span v-if="!collapsed" class="text-blue-600">Analysis</span>
          </router-link>
          
          <!-- History -->
          <router-link
            to="/history"
            class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
            :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }"
          >
          <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M4 12a9 9 0 1 1 9 9c-2.49 0-4.73-1.01-6.36-2.64l1.42-1.42A6.944 6.944 0 0 0 13 19c3.87 0 7-3.13 7-7s-3.13-7-7-7-7 3.13-7 7h3l-4 3.99L1 12h3Zm8 1V8h1.5v4.15l3.52 2.09-.77 1.28L12 13Z" clip-rule="evenodd"></path></svg>
          <span v-if="!collapsed" class="text-blue-600">History</span>
          </router-link>
        </template>
        
        <!-- Professor Menu Items -->
        <template v-else-if="role === 'professor'">
          <!-- Dashboard -->
          <router-link
            to="/prof-dashboard"
            class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
            :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
            </svg>
            <span v-if="!collapsed" class="text-blue-600">Dashboard</span>
          </router-link>
          
          <!-- Student Management -->
          <router-link
            to="/prof-gestion"
            class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
            :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
            </svg>
            <span v-if="!collapsed" class="text-blue-600">Student Management</span>
          </router-link>
          
          <!-- Analysis -->
          <router-link
            to="/prof-analyse"
            class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
            :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.6 5h2.8v14h-2.8V5ZM5 9.2h3V19H5V9.2ZM19 13h-2.8v6H19v-6Z" clip-rule="evenodd"></path>
            </svg>
            <span v-if="!collapsed" class="text-blue-600">Analysis</span>
          </router-link>
        </template>
        
        <!-- Admin Menu Items -->
        <template v-else-if="role === 'admin'">
          <!-- Dashboard -->
          <router-link
            to="/admin-dashboard"
            class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
            :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
            </svg>
            <span v-if="!collapsed" class="text-blue-600">Dashboard</span>
          </router-link>

            <!-- Parameters -->
            <router-link
            to="/admin-parametre"
            class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
            :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
            </svg>
            <span v-if="!collapsed" class="text-blue-600">Centre de Gestion</span>
          </router-link>

          <!-- Signal Management -->
          <router-link
            to="/admin-gestionsignal"
            class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
            :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"></path>
            </svg>
            <span v-if="!collapsed" class="text-blue-600">Signal Management</span>
          </router-link>
        </template>
      </div>
  
      <!-- Common Menu Items for All Roles -->
      <div class="mt-auto">
        <!-- Ask AI -->
        <router-link
          to="/ask-ai"
          class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
          :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path>
          </svg>
          <span v-if="!collapsed" class="text-blue-600"> IA</span>
        </router-link>
        
        <!-- Settings -->
        <router-link
          to="/settings"
          class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
          :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
          </svg>
          <span v-if="!collapsed" class="text-blue-600">Paramétres</span>
        </router-link>
        
        <!-- Logout -->
        <div @click="handleLogout" 
          class="flex items-center px-4 py-5 cursor-pointer transition-all duration-200 rounded-[15px] hover:bg-blue-50"
          :class="{ 'justify-center': collapsed, 'space-x-3': !collapsed }">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path>
          </svg>
          <span v-if="!collapsed" class="text-blue-600">Déconnection</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

import { computed } from 'vue'

const role = computed(() => authStore.userRole)
const emit = defineEmits(['sidebar-toggle', 'logout', 'navigate'])
const router = useRouter()
const authStore = useAuthStore()
const collapsed = ref(false)

// Set role from auth store if available
if (authStore && authStore.userRole) {
  role.value = authStore.userRole
}

const toggleSidebar = () => {
  collapsed.value = !collapsed.value
  emit('sidebar-toggle', collapsed.value)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  emit('logout')
}

const navigateTo = (route) => {
  router.push(`/${route}`)
  emit('navigate', route)
}
</script>

<style scoped>
.sidebar-container {
  height: 90vh;
  position: relative;
  padding: 7px;
  transition: width 0.3s ease-in-out;
  border-radius: 20px;
}

.sidebar-container * {
  transition: all 0.3s ease-in-out;
}

.sidebar-container.w-20 div:hover {
  position: relative;
  overflow-x: hidden;
}

.sidebar-container.w-20 div:hover::after {
  content: attr(data-title);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #e6f0ff;
  color: #3b82f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 10;
  margin-left: 0.5rem;
  opacity: 1;
  pointer-events: none;
}

.logo-container {
  min-height: 60px;
}

svg {
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}

span {
  transition: opacity 0.3s ease, width 0.3s ease;
  white-space: nowrap;
}
.logo{
  width:150px;
}
</style>