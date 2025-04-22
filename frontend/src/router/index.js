import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";
import LoginView from "../views/LoginView.vue";
import StudentDashboard from "../views/DashboardStudent.vue";

const routes = [
  { path: "/", component: LoginView },
  {
    path: "/dashboard",
    component: StudentDashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ path: "/", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
