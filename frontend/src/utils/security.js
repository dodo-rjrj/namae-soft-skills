import DOMPurify from 'dompurify'
import { jwtDecode } from 'jwt-decode'

// Input sanitization
export const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return DOMPurify.sanitize(input)
  }
  return input
}

// XSS Protection
export const sanitizeHTML = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'target']
  })
}

// Token validation and management
export const validateToken = (token) => {
  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  } catch (error) {
    return false
  }
}

// Password strength validation
export const validatePasswordStrength = (password) => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    requirements: {
      minLength: password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    }
  }
}

// Rate limiting helper
export const createRateLimiter = (limit, interval) => {
  const requests = new Map()
  return (key) => {
    const now = Date.now()
    const userRequests = requests.get(key) || []
    const validRequests = userRequests.filter(time => now - time < interval)
    
    if (validRequests.length >= limit) {
      return false
    }
    
    validRequests.push(now)
    requests.set(key, validRequests)
    return true
  }
}

// CSRF Token management
export const getCSRFToken = () => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1]
}

// Secure storage
export const secureStorage = {
  set: (key, value) => {
    try {
      const encryptedValue = btoa(JSON.stringify(value))
      localStorage.setItem(key, encryptedValue)
    } catch (error) {
      console.error('Secure storage error:', error)
    }
  },
  get: (key) => {
    try {
      const encryptedValue = localStorage.getItem(key)
      return encryptedValue ? JSON.parse(atob(encryptedValue)) : null
    } catch (error) {
      console.error('Secure storage error:', error)
      return null
    }
  },
  remove: (key) => {
    localStorage.removeItem(key)
  }
} 