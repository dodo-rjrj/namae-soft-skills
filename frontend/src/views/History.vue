<script setup>
import Sidebar from '../components/sidebare.vue'
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'
import HistoryTable from '../components/HistoryTable.vue'
</script>

<template>
  <div class="app-container">
    <div class="navbar-container"><Navbar /></div>
    <div class="content-container">
      <div class="sidebar-container"><Sidebar /></div>
      <div class="main-content">
        <HistoryTable />
        <Footer />
      </div>
    </div>
  </div>
</template>

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