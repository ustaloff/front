// Test setup file
import { vi } from 'vitest'

// Mock window.innerWidth for device store tests
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
})

// Mock window.addEventListener and removeEventListener
window.addEventListener = vi.fn()
window.removeEventListener = vi.fn()

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock