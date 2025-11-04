import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSidebar, toggleVisibility, SIDEBAR } from '../useSidebar.js'
import { useDeviceStore } from '@/stores/device.js'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
global.localStorage = mockLocalStorage

describe('useSidebar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)
    window.innerWidth = 1024 // Desktop by default
  })

  it('should export SIDEBAR constant', () => {
    expect(SIDEBAR).toBe('SIDEBAR')
  })

  it('should initialize with correct desktop state', () => {
    window.innerWidth = 1024
    const { isOpen, isExpanded, isMobile } = useSidebar()
    
    expect(isOpen.value).toBe(true) // Desktop: open by default
    expect(isExpanded.value).toBe(false) // Minimized by default
    expect(isMobile.value).toBe(false)
  })

  it('should initialize with correct mobile state', () => {
    window.innerWidth = 600
    const { isOpen, isExpanded, isMobile } = useSidebar()
    
    expect(isOpen.value).toBe(false) // Mobile: closed by default
    expect(isExpanded.value).toBe(false)
    expect(isMobile.value).toBe(true)
  })

  it('should load expanded state from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('true')
    window.innerWidth = 1024
    
    const { isExpanded } = useSidebar()
    expect(isExpanded.value).toBe(true)
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('sidebar-expanded')
  })

  it('should handle localStorage errors gracefully', () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('localStorage error')
    })
    
    const { isExpanded } = useSidebar()
    expect(isExpanded.value).toBe(false) // Should fallback to false
  })

  describe('toggleVisibility', () => {
    it('should toggle visibility on mobile', () => {
      window.innerWidth = 600
      const { isOpen, sidebarState } = useSidebar()
      
      expect(isOpen.value).toBe(false)
      
      toggleVisibility()
      expect(sidebarState.isOpen).toBe(true)
      
      toggleVisibility()
      expect(sidebarState.isOpen).toBe(false)
    })

    it('should toggle expansion on desktop', () => {
      window.innerWidth = 1024
      const { isOpen, isExpanded, sidebarState } = useSidebar()
      
      expect(isOpen.value).toBe(true)
      expect(isExpanded.value).toBe(false)
      
      toggleVisibility()
      expect(sidebarState.isOpen).toBe(true) // Should remain open
      expect(sidebarState.isExpanded).toBe(true) // Should expand
      
      toggleVisibility()
      expect(sidebarState.isExpanded).toBe(false) // Should minimize
    })

    it('should save expansion state to localStorage on desktop', () => {
      window.innerWidth = 1024
      useSidebar()
      
      toggleVisibility()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('sidebar-expanded', 'true')
      
      toggleVisibility()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('sidebar-expanded', 'false')
    })
  })

  describe('toggleExpansion', () => {
    it('should toggle expansion on desktop', () => {
      window.innerWidth = 1024
      const { isExpanded, sidebarState, toggleExpansion } = useSidebar()
      
      expect(isExpanded.value).toBe(false)
      
      toggleExpansion()
      expect(sidebarState.isExpanded).toBe(true)
      
      toggleExpansion()
      expect(sidebarState.isExpanded).toBe(false)
    })

    it('should not affect expansion on mobile', () => {
      window.innerWidth = 600
      const { isExpanded, sidebarState, toggleExpansion } = useSidebar()
      
      const initialExpanded = sidebarState.isExpanded
      toggleExpansion()
      expect(sidebarState.isExpanded).toBe(initialExpanded)
    })

    it('should save expansion state to localStorage', () => {
      window.innerWidth = 1024
      const { toggleExpansion } = useSidebar()
      
      toggleExpansion()
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('sidebar-expanded', 'true')
    })
  })

  describe('device type changes', () => {
    it('should adapt when switching from desktop to mobile', () => {
      window.innerWidth = 1024
      const { sidebarState } = useSidebar()
      const deviceStore = useDeviceStore()
      
      // Initially desktop
      expect(sidebarState.isOpen).toBe(true)
      
      // Switch to mobile
      window.innerWidth = 600
      deviceStore.checkDevice()
      
      // Should close on mobile
      expect(sidebarState.isOpen).toBe(false)
      expect(sidebarState.isExpanded).toBe(false)
    })

    it('should adapt when switching from mobile to desktop', () => {
      window.innerWidth = 600
      const { sidebarState } = useSidebar()
      const deviceStore = useDeviceStore()
      
      // Initially mobile
      expect(sidebarState.isOpen).toBe(false)
      
      // Switch to desktop
      window.innerWidth = 1024
      deviceStore.checkDevice()
      
      // Should open on desktop
      expect(sidebarState.isOpen).toBe(true)
    })
  })
})