import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/auth";
import securityPlugin from "./plugins/security";
import "./style.css";

const app = createApp(App);

// Initialize Pinia store
const pinia = createPinia();
app.use(pinia);

// Initialize auth store
const authStore = useAuthStore();
authStore.initializeAuth();

// Use router
app.use(router);

// Use security plugin
app.use(securityPlugin);

// Security headers
document.addEventListener("DOMContentLoaded", () => {
  // Content Security Policy
  const cspMeta = document.createElement("meta");
  cspMeta.httpEquiv = "Content-Security-Policy";
  cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' http://localhost:3000;";
  document.head.appendChild(cspMeta);

  // X-Frame-Options
  const xfoMeta = document.createElement("meta");
  xfoMeta.httpEquiv = "X-Frame-Options";
  xfoMeta.content = "DENY";
  document.head.appendChild(xfoMeta);

  // X-Content-Type-Options
  const xctoMeta = document.createElement("meta");
  xctoMeta.httpEquiv = "X-Content-Type-Options";
  xctoMeta.content = "nosniff";
  document.head.appendChild(xctoMeta);
});

// Mount the app
app.mount("#app");
