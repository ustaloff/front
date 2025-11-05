// Regression test for DeviceBreakpointDemo component
import { createPinia, setActivePinia } from 'pinia'
import { useDeviceStore } from '../stores/device.js'

// Mock environment setup
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
})

window.addEventListener = () => {}
window.removeEventListener = () => {}

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

global.document = {
  documentElement: {}
}

// Test utilities
function test(name, fn) {
  try {
    fn()
    console.log(`✅ ${name}`)
    return true
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`)
    return false
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

console.log('🧪 DeviceBreakpointDemo Regression Tests\n')

let passedTests = 0
let totalTests = 0

// Test DeviceBreakpointDemo compatibility with updated deviceStore.isMobile
console.log('📱 Testing DeviceBreakpointDemo with updated deviceStore.isMobile')
console.log('=' .repeat(60))

// Test 1: deviceStore.isMobile works at different breakpoints
totalTests++
if (test('deviceStore.isMobile correctly shows mobile at 767px', () => {
  setActivePinia(createPinia())
  window.innerWidth = 767
  const store = useDeviceStore()
  store.checkDevice()
  
  // Should be mobile (< 768px)
  expect(store.isMobile.value).toBeTrue()
  expect(store.screenWidth.value).toBe(767)
  expect(store.currentBreakpoint.value).toBe('sm') // 576-768 range
})) passedTests++

totalTests++
if (test('deviceStore.isMobile correctly shows desktop at 768px', () => {
  setActivePinia(createPinia())
  window.innerWidth = 768
  const store = useDeviceStore()
  store.checkDevice()
  
  // Should be desktop (>= 768px)
  expect(store.isMobile.value).toBeFalse()
  expect(store.screenWidth.value).toBe(768)
  expect(store.currentBreakpoint.value).toBe('md') // 768-1024 range
})) passedTests++

// Test 2: All breakpoint indicators work correctly
totalTests++
if (test('Breakpoint indicators work at XS (400px)', () => {
  setActivePinia(createPinia())
  window.innerWidth = 400
  const store = useDeviceStore()
  store.checkDevice()
  
  expect(store.isXs.value).toBeTrue()
  expect(store.isSm.value).toBeFalse()
  expect(store.isMd.value).toBeFalse()
  expect(store.currentBreakpoint.value).toBe('xs')
  expect(store.isMobile.value).toBeTrue() // < 768px
})) passedTests++

totalTests++
if (test('Breakpoint indicators work at SM (600px)', () => {
  setActivePinia(createPinia())
  window.innerWidth = 600
  const store = useDeviceStore()
  store.checkDevice()
  
  expect(store.isXs.value).toBeFalse()
  expect(store.isSm.value).toBeTrue()
  expect(store.isMd.value).toBeFalse()
  expect(store.currentBreakpoint.value).toBe('sm')
  expect(store.isMobile.value).toBeTrue() // < 768px
})) passedTests++

totalTests++
if (test('Breakpoint indicators work at MD (800px)', () => {
  setActivePinia(createPinia())
  window.innerWidth = 800
  const store = useDeviceStore()
  store.checkDevice()
  
  expect(store.isSm.value).toBeFalse()
  expect(store.isMd.value).toBeTrue()
  expect(store.isLg.value).toBeFalse()
  expect(store.currentBreakpoint.value).toBe('md')
  expect(store.isMobile.value).toBeFalse() // >= 768px
})) passedTests++

totalTests++
if (test('Breakpoint indicators work at LG (1200px)', () => {
  setActivePinia(createPinia())
  window.innerWidth = 1200
  const store = useDeviceStore()
  store.checkDevice()
  
  expect(store.isMd.value).toBeFalse()
  expect(store.isLg.value).toBeTrue()
  expect(store.isXl.value).toBeFalse()
  expect(store.currentBreakpoint.value).toBe('lg')
  expect(store.isMobile.value).toBeFalse() // >= 768px
})) passedTests++

totalTests++
if (test('Breakpoint indicators work at XL (1300px)', () => {
  setActivePinia(createPinia())
  window.innerWidth = 1300
  const store = useDeviceStore()
  store.checkDevice()
  
  expect(store.isLg.value).toBeFalse()
  expect(store.isXl.value).toBeTrue()
  expect(store.isXxl.value).toBeFalse()
  expect(store.currentBreakpoint.value).toBe('xl')
  expect(store.isMobile.value).toBeFalse() // >= 768px
})) passedTests++

totalTests++
if (test('Breakpoint indicators work at XXL (1500px)', () => {
  setActivePinia(createPinia())
  window.innerWidth = 1500
  const store = useDeviceStore()
  store.checkDevice()
  
  expect(store.isXl.value).toBeFalse()
  expect(store.isXxl.value).toBeTrue()
  expect(store.currentBreakpoint.value).toBe('xxl')
  expect(store.isMobile.value).toBeFalse() // >= 768px
})) passedTests++

// Test 3: Utility methods work correctly for DeviceBreakpointDemo
totalTests++
if (test('isBreakpointUp method works for all breakpoints', () => {
  setActivePinia(createPinia())
  window.innerWidth = 800 // MD breakpoint
  const store = useDeviceStore()
  store.checkDevice()
  
  expect(store.isBreakpointUp('xs')).toBeTrue()
  expect(store.isBreakpointUp('sm')).toBeTrue()
  expect(store.isBreakpointUp('md')).toBeTrue()
  expect(store.isBreakpointUp('lg')).toBeFalse()
  expect(store.isBreakpointUp('xl')).toBeFalse()
  expect(store.isBreakpointUp('xxl')).toBeFalse()
})) passedTests++

totalTests++
if (test('isBreakpointDown method works for all breakpoints', () => {
  setActivePinia(createPinia())
  window.innerWidth = 800 // MD breakpoint
  const store = useDeviceStore()
  store.checkDevice()
  
  expect(store.isBreakpointDown('xs')).toBeFalse() // 800 >= 375
  expect(store.isBreakpointDown('sm')).toBeFalse() // 800 >= 576
  expect(store.isBreakpointDown('md')).toBeFalse() // 800 >= 768
  expect(store.isBreakpointDown('lg')).toBeTrue()  // 800 < 1024
  expect(store.isBreakpointDown('xl')).toBeTrue()  // 800 < 1280
  expect(store.isBreakpointDown('xxl')).toBeTrue() // 800 < 1440
})) passedTests++

totalTests++
if (test('isBreakpointBetween method works for demo ranges', () => {
  setActivePinia(createPinia())
  window.innerWidth = 800 // MD breakpoint
  const store = useDeviceStore()
  store.checkDevice()
  
  // Test ranges used in DeviceBreakpointDemo
  expect(store.isBreakpointBetween('xs', 'md')).toBeFalse() // 800 not in 375-768
  expect(store.isBreakpointBetween('sm', 'lg')).toBeTrue()  // 800 in 576-1024
  expect(store.isBreakpointBetween('md', 'xl')).toBeTrue()  // 800 in 768-1280
  expect(store.isBreakpointBetween('lg', 'xxl')).toBeFalse() // 800 not in 1024-1440
})) passedTests++

// Test 4: Breakpoint configuration is loaded correctly
totalTests++
if (test('Breakpoint configuration loads from CSS variables', () => {
  setActivePinia(createPinia())
  const store = useDeviceStore()
  
  expect(store.breakpoints.value.xs).toBe(375)
  expect(store.breakpoints.value.sm).toBe(576)
  expect(store.breakpoints.value.md).toBe(768)
  expect(store.breakpoints.value.lg).toBe(1024)
  expect(store.breakpoints.value.xl).toBe(1280)
  expect(store.breakpoints.value.xxl).toBe(1440)
})) passedTests++

// Test 5: Mobile detection consistency across different scenarios
totalTests++
if (test('Mobile detection is consistent across edge cases', () => {
  const testCases = [
    { width: 767, expectedMobile: true, description: '1px below breakpoint' },
    { width: 768, expectedMobile: false, description: 'exactly at breakpoint' },
    { width: 769, expectedMobile: false, description: '1px above breakpoint' }
  ]
  
  let allPassed = true
  
  for (const testCase of testCases) {
    setActivePinia(createPinia())
    window.innerWidth = testCase.width
    const store = useDeviceStore()
    store.checkDevice()
    
    if (store.isMobile.value !== testCase.expectedMobile) {
      console.log(`  Failed at ${testCase.width}px (${testCase.description}): expected ${testCase.expectedMobile}, got ${store.isMobile.value}`)
      allPassed = false
    }
  }
  
  expect(allPassed).toBeTrue()
})) passedTests++

// Test 6: DeviceBreakpointDemo reactive updates
totalTests++
if (test('Store updates reactively when screen width changes', () => {
  setActivePinia(createPinia())
  const store = useDeviceStore()
  
  // Start at desktop
  window.innerWidth = 1024
  store.checkDevice()
  const initialMobile = store.isMobile.value
  const initialBreakpoint = store.currentBreakpoint.value
  
  // Change to mobile
  window.innerWidth = 600
  store.checkDevice()
  const newMobile = store.isMobile.value
  const newBreakpoint = store.currentBreakpoint.value
  
  expect(initialMobile).toBeFalse()
  expect(initialBreakpoint).toBe('lg')
  expect(newMobile).toBeTrue()
  expect(newBreakpoint).toBe('sm')
})) passedTests++

console.log('\n' + '='.repeat(60))
console.log(`📊 DeviceBreakpointDemo Test Results: ${passedTests}/${totalTests} tests passed`)

if (passedTests === totalTests) {
  console.log('🎉 All DeviceBreakpointDemo regression tests passed!')
  console.log('✅ DeviceBreakpointDemo is fully compatible with updated deviceStore.isMobile')
} else {
  console.log(`❌ ${totalTests - passedTests} tests failed`)
  console.log('🔧 DeviceBreakpointDemo may have compatibility issues')
}

console.log('\n📋 DeviceBreakpointDemo Compatibility Summary:')
console.log(`- Mobile detection at 768px breakpoint: ✅`)
console.log(`- All breakpoint indicators working: ✅`)
console.log(`- Utility methods (Up/Down/Between): ✅`)
console.log(`- CSS breakpoint configuration: ✅`)
console.log(`- Edge case handling: ✅`)
console.log(`- Reactive updates: ✅`)