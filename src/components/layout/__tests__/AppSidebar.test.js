import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import AppSidebar from '../AppSidebar.vue'

// Mock PrimeVue Drawer component
const MockDrawer = {
  name: 'Drawer',
  props: ['visible', 'modal', 'showCloseIcon', 'blockScroll', 'position'],
  emits: ['update:visible', 'hide'],
  template: `
    <div 
      v-if="visible" 
      class="p-drawer"
      :class="$attrs.class"
    >
      <slot name="container">
        <slot />
      </slot>
    </div>
  `
}

// Mock the auth store
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    user: {
      email: 'test@example.com'
    }
  })
}))

// Mock localStorage
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
}

describe('AppSidebar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    window.innerWidth = 1024
  })

  it('should render drawer component', () => {
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          Drawer: MockDrawer
        }
      }
    })
    
    const drawer = wrapper.findComponent(MockDrawer)
    expect(drawer.exists()).toBe(true)
  })

  it('should pass correct props to drawer on desktop', () => {
    window.innerWidth = 1024
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          Drawer: MockDrawer
        }
      }
    })
    
    const drawer = wrapper.findComponent(MockDrawer)
    expect(drawer.props('modal')).toBe(false) // Desktop: not modal
    expect(drawer.props('showCloseIcon')).toBe(false) // Desktop: no close icon
    expect(drawer.props('position')).toBe('left')
  })

  it('should pass correct props to drawer on mobile', () => {
    window.innerWidth = 600
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          Drawer: MockDrawer
        }
      }
    })
    
    const drawer = wrapper.findComponent(MockDrawer)
    expect(drawer.props('modal')).toBe(true) // Mobile: modal
    expect(drawer.props('showCloseIcon')).toBe(true) // Mobile: show close icon
  })

  it('should apply correct CSS classes on desktop expanded', () => {
    window.innerWidth = 1024
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          Drawer: MockDrawer
        }
      }
    })
    
    // Trigger expansion
    const { sidebarState } = wrapper.vm
    sidebarState.isExpanded = true
    await wrapper.vm.$nextTick()
    
    const drawer = wrapper.findComponent(MockDrawer)
    expect(drawer.classes()).toContain('sidebar--expanded')
  })

  it('should apply correct CSS classes on desktop minimized', () => {
    window.innerWidth = 1024
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          Drawer: MockDrawer
        }
      }
    })
    
    const drawer = wrapper.findComponent(MockDrawer)
    expect(drawer.classes()).toContain('sidebar--minimized')
  })

  it('should apply correct CSS classes on mobile', () => {
    window.innerWidth = 600
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          Drawer: MockDrawer
        }
      }
    })
    
    const drawer = wrapper.findComponent(MockDrawer)
    expect(drawer.classes()).toContain('sidebar--mobile')
  })

  it('should render sidebar header with logo', () => {
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          Drawer: MockDrawer
        }
      }
    })
    
    const header = wrapper.find('.sidebar__header')
    const logo = wrapper.find('.sidebar__logo')
    
    expect(header.exists()).toBe(true)
    expect(logo.exists()).toBe(true)
    expect(logo.text()).toBe('Noname')
  })

  it('should render navigation menu', () => {
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          Drawer: MockDrawer
        }
      }
    })
    
    const nav = wrapper.find('.sidebar__nav')
    const menu = wrapper.find('.sidebar-menu')
    
    expect(nav.exists()).toBe(true)
    expect(menu.exists()).toBe(true)
  })

  it('should render navigation links', () => {
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          Drawer: MockDrawer
        }
      }
    })
    
    const links = wrapper.findAll('.sidebar-menu router-link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('should render user section when user is authenticated', () => {
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          Drawer: MockDrawer
        }
      }
    })
    
    const userSection = wrapper.find('.sidebar__user')
    expect(userSection.exists()).toBe(true)
  })

  it('should handle logo click for expansion toggle', async () => {
    window.innerWidth = 1024
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          Drawer: MockDrawer
        }
      }
    })
    
    const logo = wrapper.find('.sidebar__logo')
    const { sidebarState } = wrapper.vm
    const initialExpanded = sidebarState.isExpanded
    
    await logo.trigger('click')
    expect(sidebarState.isExpanded).toBe(!initialExpanded)
  })

  it('should handle drawer hide event on mobile', async () => {
    window.innerWidth = 600
    const wrapper = mount(AppSidebar, {
      global: {
        components: {
          Drawer: MockDrawer
        }
      }
    })
    
    const drawer = wrapper.findComponent(MockDrawer)
    const { sidebarState } = wrapper.vm
    
    sidebarState.isOpen = true
    await drawer.vm.$emit('hide')
    
    expect(sidebarState.isOpen).toBe(false)
  })
})