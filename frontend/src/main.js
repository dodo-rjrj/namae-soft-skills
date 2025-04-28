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

// Mount the app
app.mount("#app");
