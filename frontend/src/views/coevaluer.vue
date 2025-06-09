<script setup>
import Sidebar from '../components/sidebare.vue'
import Navbar from '../components/navbar.vue'
import analyse from '../components/coevaluer.vue'

</script>

<template>
  <div class="app-container">
    <div class="content-container">
      <div class="sidebar-container"><Sidebar /></div>
      <div class="main-content">    <div class="navbar-container"><Navbar /></div>

        <analyse />
       
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;  
  background-color:hsla(0, 0%, 92%, 0.217);

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