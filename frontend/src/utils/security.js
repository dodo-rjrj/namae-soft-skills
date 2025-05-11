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

/**
 * Generates a random CSRF token
 * @returns {string} A random CSRF token
 */
export function generateCSRFToken() {
  const array = new Uint32Array(8);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

/**
 * Validates email format
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
export function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Rate limiter for API calls
 * @param {Function} fn - The function to rate limit
 * @param {number} limit - The number of calls allowed
 * @param {number} interval - The time interval in milliseconds
 * @returns {Function} The rate-limited function
 */
export function rateLimiter(fn, limit, interval) {
  let calls = [];
  
  return function(...args) {
    const now = Date.now();
    calls = calls.filter(time => now - time < interval);
    
    if (calls.length >= limit) {
      throw new Error('Rate limit exceeded');
    }
    
    calls.push(now);
    return fn.apply(this, args);
  };
}

/**
 * Encrypts sensitive data before storing
 * @param {string} data - The data to encrypt
 * @returns {string} The encrypted data
 */
export function encryptData(data) {
  // This is a placeholder. In a real implementation, use a proper encryption library
  return btoa(data);
}

/**
 * Decrypts sensitive data after retrieving
 * @param {string} encryptedData - The encrypted data
 * @returns {string} The decrypted data
 */
export function decryptData(encryptedData) {
  // This is a placeholder. In a real implementation, use a proper encryption library
  return atob(encryptedData);
}

/**
 * Checks if the current session is secure
 * @returns {boolean} Whether the session is secure
 */
export function isSecureSession() {
  return window.location.protocol === 'https:' && 
         !document.cookie.includes('insecure') &&
         window.location.hostname !== 'localhost';
}

/**
 * Validates file uploads for security
 * @param {File} file - The file to validate
 * @param {string[]} allowedTypes - Array of allowed MIME types
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {boolean} Whether the file is valid
 */
export function validateFileUpload(file, allowedTypes, maxSize) {
  if (!file) return false;
  if (file.size > maxSize) return false;
  if (!allowedTypes.includes(file.type)) return false;
  return true;
} 