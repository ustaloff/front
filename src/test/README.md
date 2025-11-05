# Тестирование сайдбара

## Обзор

Этот документ описывает тестирование функциональности сайдбара, включая композабл `useSidebar`, store `useDeviceStore` и компоненты `AppHeader` и `AppSidebar`.

## Структура тестов

### Unit тесты

#### useDeviceStore (`stores/__tests__/device.test.js`)
- ✅ Инициализация с текущей шириной окна
- ✅ Определение десктопного устройства (>= 801px)
- ✅ Определение мобильного устройства (< 801px)
- ✅ Обновление screenWidth при вызове checkDevice
- ✅ Добавление event listeners при initResizeListener
- ✅ Удаление event listeners при cleanupListeners
- ✅ Предотвращение двойного добавления listeners

#### useSidebar (`composables/__tests__/useSidebar.test.js`)
- ✅ Экспорт константы SIDEBAR
- ✅ Инициализация с корректным состоянием на десктопе
- ✅ Инициализация с корректным состоянием на мобильном
- ✅ Загрузка состояния expansion из localStorage
- ✅ Обработка ошибок localStorage
- ✅ toggleVisibility на мобильном устройстве
- ✅ toggleVisibility на десктопе (переключение expansion)
- ✅ Сохранение состояния expansion в localStorage
- ✅ toggleExpansion на десктопе
- ✅ Игнорирование toggleExpansion на мобильном
- ✅ Адаптация при переключении desktop ↔ mobile

### Integration тесты

#### AppHeader (`components/layout/__tests__/AppHeader.test.js`)
- ✅ Рендеринг кнопки toggle
- ✅ Структура иконки toggle (3 линии)
- ✅ Вызов toggleVisibility при клике
- ✅ Корректные aria-labels для desktop/mobile
- ✅ Применение класса is-open при активном состоянии
- ✅ Рендеринг логотипа и навигации

#### AppSidebar (`components/layout/__tests__/AppSidebar.test.js`)
- ✅ Рендеринг Drawer компонента
- ✅ Корректные props для desktop (modal: false)
- ✅ Корректные props для mobile (modal: true)
- ✅ CSS классы для expanded/minimized/mobile состояний
- ✅ Рендеринг header с логотипом
- ✅ Рендеринг навигационного меню
- ✅ Рендеринг пользовательской секции
- ✅ Обработка клика по логотипу (expansion toggle)
- ✅ Обработка события hide на мобильном

## Покрытие тестами

### Основная функциональность
- [x] Device detection (desktop/mobile)
- [x] Sidebar state management
- [x] Toggle visibility/expansion
- [x] LocalStorage integration
- [x] Responsive behavior
- [x] Component rendering
- [x] Event handling

### Граничные случаи
- [x] LocalStorage errors
- [x] Window resize events
- [x] Device orientation changes
- [x] State synchronization between components

## Запуск тестов

### С Vitest (рекомендуется)
```bash
npm install --save-dev vitest @vue/test-utils jsdom
npm run test
```

### Простые тесты (без зависимостей)
```bash
node src/test/simple-tests.js
```

### Ручное тестирование
1. Откройте приложение в браузере
2. Измените размер окна (< 801px для мобильного режима)
3. Кликните по кнопке toggle в header
4. Проверьте поведение сайдбара на разных размерах экрана

## Тестовые сценарии

### Сценарий 1: Мобильное устройство
1. Установить ширину окна < 801px
2. Сайдбар должен быть закрыт по умолчанию
3. Клик по toggle должен открыть modal drawer
4. Клик по overlay должен закрыть drawer

### Сценарий 2: Десктопное устройство
1. Установить ширину окна >= 801px
2. Сайдбар должен быть открыт по умолчанию
3. Клик по toggle должен переключать expansion
4. Состояние expansion должно сохраняться в localStorage

### Сценарий 3: Переключение между устройствами
1. Начать с desktop режима
2. Изменить размер окна на mobile
3. Сайдбар должен автоматически закрыться
4. Вернуться к desktop режиму
5. Сайдбар должен открыться с сохраненным состоянием expansion

## Известные ограничения

1. Тесты компонентов требуют мокирования PrimeVue Drawer
2. Event listeners тестируются через моки
3. LocalStorage тестируется через моки
4. Некоторые тесты требуют ручной проверки в браузере

## Рекомендации по улучшению

1. Добавить E2E тесты с Playwright или Cypress
2. Добавить тесты производительности
3. Добавить тесты accessibility
4. Добавить visual regression тесты
5. Улучшить покрытие edge cases