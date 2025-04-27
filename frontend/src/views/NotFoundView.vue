<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>404 - Page Not Found</h1>
      <p class="error-message">The page you are looking for does not exist.</p>
      <router-link to="/" class="submit-btn">Go to Dashboard</router-link>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this view
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
  text-align: center;
}

.auth-card h1 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.8rem;
}

.error-message {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.submit-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #45a049;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
  }
}
</style> 