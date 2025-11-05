// Simple tests without external dependencies
import { createPinia, setActivePinia } from 'pinia'
import { useDeviceStore } from '../stores/device.js'
import { useSidebar, toggleVisibility, SIDEBAR } from '../composables/useSidebar.js'

// Mock localStorage
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {}
}

// Mock window properties
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
})

window.addEventListener = () => {}
window.removeEventListener = () => {}

// Mock getComputedStyle for breakpoint system
window.getComputedStyle = () => ({
  getPropertyValue: (prop) => {
    const breakpoints = {
      '--breakpoint-xs': '375',
      '--breakpoint-sm': '576', 
      '--breakpoint-md': '768',
      '--breakpoint-lg': '1024',
      '--breakpoint-xl': '1280',
      '--breakpoint-xxl': '1440'
    }
    return breakpoints[prop] || '0'
  }
})

// Mock document.documentElement
global.document = {
  documentElement: {}
}

// Simple test runner
function test(name, fn) {
  try {
    fn()
    console.log(`✅ ${name}`)
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`)
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}`)
      }
    },
    toBeTrue() {
      if (actual !== true) {
        throw new Error(`Expected true, got ${actual}`)
      }
    },
    toBeFalse() {
      if (actual !== false) {
        throw new Error(`Expected false, got ${actual}`)
      }
    }
  }
}

// Run tests
console.log('Running sidebar tests...\n')

// Setup
setActivePinia(createPinia())

// Test SIDEBAR constant
test('SIDEBAR constant should be defined', () => {
  expect(SIDEBAR).toBe('SIDEBAR')
})

// Test device store
test('Device store should initialize correctly', () => {
  const store = useDeviceStore()
  expect(store.screenWidth).toBe(1024)
  expect(store.isMobile.value).toBeFalse()
})

test('Device store should detect mobile correctly (< 768px)', () => {
  window.innerWidth = 600
  const store = useDeviceStore()
  store.checkDevice()
  expect(store.isMobile.value).toBeTrue()
})

test('Device store should detect mobile at 767px', () => {
  window.innerWidth = 767
  const store = useDeviceStore()
  store.checkDevice()
  expect(store.isMobile.value).toBeTrue()
})

test('Device store should detect desktop at 768px', () => {
  window.innerWidth = 768
  const store = useDeviceStore()
  store.checkDevice()
  expect(store.isMobile.value).toBeFalse()
})

test('Device store should detect desktop correctly (>= 768px)', () => {
  window.innerWidth = 1024
  const store = useDeviceStore()
  store.checkDevice()
  expect(store.isMobile.value).toBeFalse()
})

// Test sidebar composable
test('Sidebar should initialize with correct desktop state', () => {
  window.innerWidth = 1024
  const { isOpen, isExpanded, isMobile } = useSidebar()
  
  expect(isOpen.value).toBeTrue() // Desktop: open by default
  expect(isExpanded.value).toBeFalse() // Minimized by default
  expect(isMobile.value).toBeFalse()
})

test('Sidebar should initialize with correct mobile state', () => {
  window.innerWidth = 600
  // Reset pinia to get fresh state
  setActivePinia(createPinia())
  
  const { isOpen, isExpanded, isMobile } = useSidebar()
  
  expect(isOpen.value).toBeFalse() // Mobile: closed by default
  expect(isExpanded.value).toBeFalse()
  expect(isMobile.value).toBeTrue()
})

test('toggleVisibility should work on mobile', () => {
  window.innerWidth = 600
  setActivePinia(createPinia())
  
  const { isOpen, sidebarState } = useSidebar()
  
  expect(isOpen.value).toBeFalse()
  
  toggleVisibility()
  expect(sidebarState.isOpen).toBeTrue()
  
  toggleVisibility()
  expect(sidebarState.isOpen).toBeFalse()
})

test('toggleVisibility should work on desktop', () => {
  window.innerWidth = 1024
  setActivePinia(createPinia())
  
  const { isOpen, isExpanded, sidebarState } = useSidebar()
  
  expect(isOpen.value).toBeTrue()
  expect(isExpanded.value).toBeFalse()
  
  toggleVisibility()
  expect(sidebarState.isOpen).toBeTrue() // Should remain open
  expect(sidebarState.isExpanded).toBeTrue() // Should expand
  
  toggleVisibility()
  expect(sidebarState.isExpanded).toBeFalse() // Should minimize
})

test('toggleExpansion should work on desktop', () => {
  window.innerWidth = 1024
  setActivePinia(createPinia())
  
  const { isExpanded, sidebarState, toggleExpansion } = useSidebar()
  
  expect(isExpanded.value).toBeFalse()
  
  toggleExpansion()
  expect(sidebarState.isExpanded).toBeTrue()
  
  toggleExpansion()
  expect(sidebarState.isExpanded).toBeFalse()
})

test('toggleExpansion should not work on mobile', () => {
  window.innerWidth = 600
  setActivePinia(createPinia())
  
  const { sidebarState, toggleExpansion } = useSidebar()
  
  const initialExpanded = sidebarState.isExpanded
  toggleExpansion()
  expect(sidebarState.isExpanded).toBe(initialExpanded)
})

console.log('\nTests completed!')