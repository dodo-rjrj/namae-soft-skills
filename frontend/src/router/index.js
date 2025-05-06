import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { 
  authGuard, 
  guestGuard,
  roleGuard, 
  sessionTimeoutGuard,
  activityTracker,
  secureHeaders
} from './middleware/security'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
      meta: { 
        requiresAuth: false,
        security: {
          noCache: true,
          noStore: true
        }
      }
    },
    // Authentication routes
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginpage.vue'),
      meta: { 
        requiresAuth: false,
        security: {
          noCache: true,
          noStore: true
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { 
        requiresAuth: false,
        security: {
          noCache: true,
          noStore: true
        }
      }
    },
    // Student routes
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardStudent.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['student'],
        security: {
          cacheControl: 'private, max-age=0, must-revalidate'
        }
      }
    },
    {
      path: '/auto-evaluation',
      name: 'auto-evaluation',
      component: () => import('../views/auto-evaluate.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['student'],
        security: {
          noCache: true
        }
      }
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/History.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['student'],
        security: {
          noCache: true
        }
      }
    },
    {
      path: '/analyse',
      name: 'analyse',
      component: () => import('../views/analyse.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['student'],
        security: {
          noCache: true
        }
      }
    },
    
    // Professor routes
    {
      path: '/prof-dashboard',
      name: 'prof-dashboard',
      component: () => import('../views/prof-dashboard.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['professor', 'admin'],
        security: {
          noCache: true
        }
      }
    },
    {
      path: '/prof-analyse',
      name: 'prof-analyse',
      component: () => import('../views/prof-analyse.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['professor', 'admin'],
        security: {
          noCache: true
        }
      }
    },
    {
      path: '/prof-evaluation',
      name: 'prof-evaluation',
      component: () => import('../views/prof-evaluation.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['professor', 'admin'],
        security: {
          noCache: true
        }
      }
    },
    {
      path: '/prof-gestion',
      name: 'prof-gestion',
      component: () => import('../views/prof-gestion.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['professor', 'admin'],
        security: {
          noCache: true
        }
      }
    },
    {
      path: '/prof-student-dossier',
      name: 'prof-student-dossier',
      component: () => import('../views/prof-student-dossier.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['professor', 'admin'],
        security: {
          noCache: true
        }
      }
    },
    
    // Admin routes
    {
      path: '/admin-gestionsignal',
      name: 'admin-gestionsignal',
      component: () => import('../views/admin-gestionsignal.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['admin'],
        security: {
          noCache: true
        }
      }
    },
    {
      path: '/admin-parametre',
      name: 'admin-parametre',
      component: () => import('../views/admin-parametre.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['admin'],
        security: {
          noCache: true
        }
      }
    },
    {
      path: '/admin-static',
      name: 'admin-static',
      component: () => import('../views/admin-static.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['admin'],
        security: {
          noCache: true
        }
      }
    },//settings:
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/setting.vue'),
      meta: { 
        requiresAuth: true,
        security: {
          noCache: true
        }
      }
    },
    
    // Error and utility routes
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/UnauthorizedView.vue'),
      meta: { 
        requiresAuth: false,
        security: {
          noCache: true
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { 
        requiresAuth: false,
        security: {
          noCache: true
        }
      }
    }
  ]
})

// Apply all security middleware in order
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Apply security headers
  secureHeaders(to, from, () => {
    // Track user activity
    activityTracker(to, from, () => {
      // Check session timeout
      sessionTimeoutGuard(to, from, () => {
        // Handle non-protected routes
        if (to.meta.requiresAuth === false) {
          // If user is authenticated and tries to access login/register, redirect to dashboard
          if (authStore.isAuthenticated && (to.name === 'login' || to.name === 'register' || to.name === 'home')) {
            // Redirect to appropriate dashboard based on role
            if (authStore.userRole === 'student') {
              return next({ name: 'dashboard' })
            } else if (authStore.userRole === 'professor' || authStore.userRole === 'admin') {
              return next({ name: 'prof-dashboard' })
            }
          }
          return next()
        }

        // Handle protected routes
        if (!authStore.isAuthenticated) {
          return next({ name: 'login', query: { redirect: to.fullPath } })
        }

        // Check roles if required
        if (to.meta.roles) {
          if (!authStore.userRole || !to.meta.roles.includes(authStore.userRole)) {
            return next('/unauthorized')
          }
        }

        return next()
      })
    })
  })
})

export default router