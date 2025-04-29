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
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/HomePage.vue'),
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
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardStudent.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['student', 'admin'],
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
        requiresAuth: false,
        roles: ['student', 'admin'],
        security: {
          noCache: true        }
      }
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/History.vue'),
      meta: { 
        requiresAuth: false,
        roles: ['student', 'admin'],
        security: {
          noCache: true        }
      }
    },
    
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
          if (authStore.isAuthenticated && (to.name === 'login' || to.name === 'register')) {
            return next({ name: 'dashboard' })
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
