import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

// Create a test router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

describe('LoginView', () => {
  // Setup Pinia before each test
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.text()).toContain('Login')
  })

  it('has email and password inputs', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('has a submit button', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })
}) 