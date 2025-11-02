import { reactive, computed, watch } from 'vue'
import { useDeviceStore } from '@/stores/device'

// Константа для идентификации сайдбара
export const SIDEBAR = 'SIDEBAR'

// Ключ для localStorage
const STORAGE_KEY = 'sidebar-expanded'

// Функция для загрузки состояния из localStorage
const loadExpandedState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved !== null ? JSON.parse(saved) : false
  } catch (error) {
    console.warn('Failed to load sidebar state from localStorage:', error)
    return false
  }
}

// Функция для сохранения состояния в localStorage
const saveExpandedState = (isExpanded) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isExpanded))
  } catch (error) {
    console.warn('Failed to save sidebar state to localStorage:', error)
  }
}

// Глобальное состояние сайдбара
const sidebarState = reactive({
  isOpen: false,
  isExpanded: loadExpandedState(), // Загружаем сохраненное состояние
  initialized: false
})

// Основная функция композабла
export function useSidebar() {
  const deviceStore = useDeviceStore()
  
  // Инициализация состояния в зависимости от типа устройства
  const initializeSidebar = () => {
    if (sidebarState.initialized) return
    
    // Убеждаемся, что device store инициализирован
    deviceStore.checkDevice()
    
    if (deviceStore.isMobile.value) {
      // На мобильных устройствах сайдбар закрыт по умолчанию
      sidebarState.isOpen = false
      sidebarState.isExpanded = false
    } else {
      // На десктопе сайдбар открыт в маленьком состоянии по умолчанию
      sidebarState.isOpen = true
      // isExpanded уже загружено из localStorage при создании sidebarState (по умолчанию false - маленький)
    }
    
    sidebarState.initialized = true
  }
  
  // Инициализируем при первом вызове
  initializeSidebar()
  
  // Отслеживаем изменения expansion состояния для сохранения
  watch(() => sidebarState.isExpanded, (newExpanded) => {
    if (!deviceStore.isMobile.value) {
      saveExpandedState(newExpanded)
    }
  })
  
  // Отслеживаем изменения типа устройства и адаптируем поведение
  watch(() => deviceStore.isMobile.value, (newIsMobile, oldIsMobile) => {
    if (newIsMobile !== oldIsMobile) {
      if (newIsMobile) {
        // Переход на мобильное устройство - закрываем сайдбар
        sidebarState.isOpen = false
        sidebarState.isExpanded = false
      } else {
        // Переход на десктоп - открываем сайдбар и восстанавливаем сохраненное состояние expansion
        sidebarState.isOpen = true
        sidebarState.isExpanded = loadExpandedState()
      }
    }
  }, { immediate: false })
  
  // Computed свойства для удобного доступа
  const isOpen = computed(() => sidebarState.isOpen)
  const isExpanded = computed(() => sidebarState.isExpanded)
  const isMobile = computed(() => deviceStore.isMobile)
  
  return {
    isOpen,
    isExpanded,
    isMobile,
    sidebarState
  }
}

// Утилитарная функция для переключения видимости
export function toggleVisibility() {
  const deviceStore = useDeviceStore()
  
  // Убеждаемся, что device store инициализирован
  deviceStore.checkDevice()
  
  if (deviceStore.isMobile.value) {
    // На мобильных просто переключаем видимость
    sidebarState.isOpen = !sidebarState.isOpen
  } else {
    // На десктопе кнопка в header прячет/показывает сайдбар
    sidebarState.isOpen = !sidebarState.isOpen
  }
}

// Утилитарная функция для закрытия сайдбара
export function closeSidebar() {
  sidebarState.isOpen = false
}

// Утилитарная функция для переключения развернутости (только для десктопа)
export function toggleExpansion() {
  const deviceStore = useDeviceStore()
  
  // Expansion работает только на десктопе
  if (!deviceStore.isMobile.value) {
    sidebarState.isExpanded = !sidebarState.isExpanded
    // Сохраняем состояние expansion
    saveExpandedState(sidebarState.isExpanded)
  }
}