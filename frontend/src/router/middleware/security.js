import { useAuthStore } from '../../store/auth'
import { handleApiError } from '../../services/errorHandler' // Uncomment when backend is ready

export const authGuard = async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth === false) {
    return next()
  }

  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  // Mock implementation for testing - Comment out when backend is ready
  next()

  // Backend implementation - Uncomment when backend is ready

  try {
    // Verify token validity
    await authStore.refreshAccessToken()
    next()
  } catch (error) {
    const handledError = handleApiError(error)
    if (handledError.status === 401) {
      authStore.logout()
      next({ name: 'login', query: { redirect: to.fullPath, error: 'session_expired' } })
    } else {
      next(false)
    }
  }

}

export const guestGuard = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (authStore.isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
}

export const roleGuard = (requiredRoles) => {
  return (to, from, next) => {
    const authStore = useAuthStore()
    
    if (!authStore.user || !authStore.userRole) {
      return next('/unauthorized')
    }
    
    if (!requiredRoles.includes(authStore.userRole)) {
      return next('/unauthorized')
    }
    
    next()
  }
}

export const sessionTimeoutGuard = (to, from, next) => {
  const authStore = useAuthStore()
  const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes
  
  if (!authStore.lastActivity) {
    authStore.updateLastActivity()
    return next()
  }
  
  if (Date.now() - authStore.lastActivity > SESSION_TIMEOUT) {
    authStore.logout()
    return next({ name: 'login', query: { error: 'session_timeout' } })
  }
  
  authStore.updateLastActivity()
  next()
}

export const activityTracker = (to, from, next) => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    authStore.updateLastActivity()
  }
  next()
}

export const secureHeaders = (to, from, next) => {
  // Add security headers
  document.documentElement.setAttribute('data-theme', 'light')
  document.documentElement.setAttribute('data-safe-mode', 'true')
  
  // Set cache control headers based on route meta
  if (to.meta.security?.noCache) {
    document.documentElement.setAttribute('data-cache-control', 'no-cache, no-store, must-revalidate')
  } else if (to.meta.security?.cacheControl) {
    document.documentElement.setAttribute('data-cache-control', to.meta.security.cacheControl)
  }

  // Add security headers
  const headers = {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  }

  // Apply headers
  Object.entries(headers).forEach(([key, value]) => {
    document.documentElement.setAttribute(`data-${key.toLowerCase()}`, value)
  })
  
  next()
} 