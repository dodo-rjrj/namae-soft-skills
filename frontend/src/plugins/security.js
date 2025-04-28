import { sanitizeInput, sanitizeHTML, validatePasswordStrength } from '../utils/security'

export default {
  install(app) {
    // Global security methods
    app.config.globalProperties.$security = {
      sanitizeInput,
      sanitizeHTML,
      validatePasswordStrength
    }

    // Global error handler
    app.config.errorHandler = (err, vm, info) => {
      console.error('Global error:', err)
      // Don't expose sensitive error information to users
      vm.$toast?.error('An unexpected error occurred. Please try again.')
    }

    // Global security directives
    app.directive('sanitize', {
      mounted(el, binding) {
        if (binding.value) {
          el.innerHTML = sanitizeHTML(binding.value)
        }
      },
      updated(el, binding) {
        if (binding.value) {
          el.innerHTML = sanitizeHTML(binding.value)
        }
      }
    })

    // Prevent XSS through v-html
    // app.config.compilerOptions.delimiters = ['{{', '}}']
    // app.config.compilerOptions.whitespace = 'preserve'
  }
} 