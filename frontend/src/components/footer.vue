<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img src="../assets/vue.svg" alt="SoftSync Logo" class="logo" />
        <p class="tagline">Always in beta. Forever evolving.</p>
      </div>
      
      <div class="footer-links">
        <div class="footer-section">
          <h3>Need Help</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Community</h3>
          <ul>
            <li><a href="#">X</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2024 SoftSync. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
.footer {
  background-color: #EFF6FF;
  padding: 2rem;
  margin-top: 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-logo {
  flex: 0 0 200px;
}

.logo {
  width: 80px;
  height: auto;
  margin-bottom: 1rem;
}

.tagline {
  color: #6B7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.footer-links {
  display: flex;
  gap: 4rem;
}

.footer-section h3 {
  color: #1F2937;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #6B7280;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.footer-section a:hover {
  color: #1E40AF;
}

.footer-bottom {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
  text-align: center;
}

.footer-bottom p {
  color: #6B7280;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
  
  .footer-section {
    text-align: center;
  }
}
</style>