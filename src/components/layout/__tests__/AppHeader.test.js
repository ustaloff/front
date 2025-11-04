import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import AppHeader from '../AppHeader.vue'
import { useSidebar } from '@/composables/useSidebar.js'

// Mock the auth store
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    user: null,
    logout: vi.fn()
  })
}))

// Mock localStorage
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
}

describe('AppHeader', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    window.innerWidth = 1024
  })

  it('should render toggle button', () => {
    const wrapper = mount(AppHeader)
    const toggleButton = wrapper.find('.toggle-button')
    expect(toggleButton.exists()).toBe(true)
  })

  it('should render toggle icon with correct structure', () => {
    const wrapper = mount(AppHeader)
    const toggleIcon = wrapper.find('.toggle-icon')
    const spans = toggleIcon.findAll('span')
    
    expect(toggleIcon.exists()).toBe(true)
    expect(spans).toHaveLength(3) // Three lines for hamburger menu
  })

  it('should call toggleVisibility when toggle button is clicked', async () => {
    const wrapper = mount(AppHeader)
    const toggleButton = wrapper.find('.toggle-button')
    
    await toggleButton.trigger('click')
    
    // We can't easily test the function call directly, but we can test the state change
    const { isExpanded } = useSidebar()
    // On desktop, clicking toggle should change expansion state
    expect(isExpanded.value).toBe(true)
  })

  it('should show correct aria-label for desktop', () => {
    window.innerWidth = 1024
    const wrapper = mount(AppHeader)
    const toggleButton = wrapper.find('.toggle-button')
    
    expect(toggleButton.attributes('aria-label')).toBe('Развернуть меню')
  })

  it('should show correct aria-label for mobile', () => {
    window.innerWidth = 600
    const wrapper = mount(AppHeader)
    const toggleButton = wrapper.find('.toggle-button')
    
    expect(toggleButton.attributes('aria-label')).toBe('Открыть меню')
  })

  it('should apply is-open class when sidebar is active', async () => {
    window.innerWidth = 1024
    const wrapper = mount(AppHeader)
    const toggleButton = wrapper.find('.toggle-button')
    
    // Click to expand (on desktop this means expand)
    await toggleButton.trigger('click')
    
    const toggleIcon = wrapper.find('.toggle-icon')
    expect(toggleIcon.classes()).toContain('is-open')
  })

  it('should render logo with correct link', () => {
    const wrapper = mount(AppHeader)
    const logo = wrapper.find('.logo a')
    
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('to')).toBe('/')
    expect(logo.text()).toBe('Noname')
  })

  it('should render auth section', () => {
    const wrapper = mount(AppHeader)
    const authSection = wrapper.find('.auth-section')
    
    expect(authSection.exists()).toBe(true)
  })
})