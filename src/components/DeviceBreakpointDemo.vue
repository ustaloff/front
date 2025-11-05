<template>
    <div class="breakpoint-demo">
        <div class="demo-header">
            <h2>Device Breakpoint Demo</h2>
            <p>Измените размер окна браузера, чтобы увидеть реактивность брейкпоинтов</p>
        </div>

        <!-- Текущее состояние экрана -->
        <div class="current-state">
            <div class="state-card">
                <h3>Текущее состояние</h3>
                <div class="state-info">
                    <div class="info-item">
                        <span class="label">Ширина экрана:</span>
                        <span class="value">{{ deviceStore.screenWidth }}px</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Активный брейкпоинт:</span>
                        <span class="value breakpoint-badge" :class="`bp-${deviceStore.currentBreakpoint}`">
              {{ deviceStore.currentBreakpoint.toUpperCase() }}
            </span>
                    </div>
                    <div class="info-item">
                        <span class="label">Мобильное устройство:</span>
                        <span class="value" :class="{ 'is-mobile': deviceStore.isMobile }">
              {{ deviceStore.isMobile ? 'Да' : 'Нет' }}
            </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Индикаторы брейкпоинтов -->
        <div class="breakpoint-indicators">
            <h3>Индикаторы брейкпоинтов</h3>
            <div class="indicators-grid">
                <div class="indicator" :class="{ active: deviceStore.isXs }">
                    <div class="indicator-name">XS</div>
                    <div class="indicator-range">{{ deviceStore.breakpoints.xs }}px - {{
                            deviceStore.breakpoints.sm - 1
                        }}px
                    </div>
                    <div class="indicator-status">{{ deviceStore.isXs ? 'Активен' : 'Неактивен' }}</div>
                </div>

                <div class="indicator" :class="{ active: deviceStore.isSm }">
                    <div class="indicator-name">SM</div>
                    <div class="indicator-range">{{ deviceStore.breakpoints.sm }}px - {{
                            deviceStore.breakpoints.md - 1
                        }}px
                    </div>
                    <div class="indicator-status">{{ deviceStore.isSm ? 'Активен' : 'Неактивен' }}</div>
                </div>

                <div class="indicator" :class="{ active: deviceStore.isMd }">
                    <div class="indicator-name">MD</div>
                    <div class="indicator-range">{{ deviceStore.breakpoints.md }}px - {{
                            deviceStore.breakpoints.lg - 1
                        }}px
                    </div>
                    <div class="indicator-status">{{ deviceStore.isMd ? 'Активен' : 'Неактивен' }}</div>
                </div>

                <div class="indicator" :class="{ active: deviceStore.isLg }">
                    <div class="indicator-name">LG</div>
                    <div class="indicator-range">{{ deviceStore.breakpoints.lg }}px - {{
                            deviceStore.breakpoints.xl - 1
                        }}px
                    </div>
                    <div class="indicator-status">{{ deviceStore.isLg ? 'Активен' : 'Неактивен' }}</div>
                </div>

                <div class="indicator" :class="{ active: deviceStore.isXl }">
                    <div class="indicator-name">XL</div>
                    <div class="indicator-range">{{ deviceStore.breakpoints.xl }}px - {{
                            deviceStore.breakpoints.xxl - 1
                        }}px
                    </div>
                    <div class="indicator-status">{{ deviceStore.isXl ? 'Активен' : 'Неактивен' }}</div>
                </div>

                <div class="indicator" :class="{ active: deviceStore.isXxl }">
                    <div class="indicator-name">XXL</div>
                    <div class="indicator-range">{{ deviceStore.breakpoints.xxl }}px+</div>
                    <div class="indicator-status">{{ deviceStore.isXxl ? 'Активен' : 'Неактивен' }}</div>
                </div>
            </div>
        </div>

        <!-- Утилитарные методы -->
        <div class="utility-methods">
            <h3>Утилитарные методы</h3>

            <div class="methods-grid">
                <!-- isBreakpointUp -->
                <div class="method-demo">
                    <h4>isBreakpointUp()</h4>
                    <p>Проверяет "больше или равно" указанному брейкпоинту</p>
                    <div class="method-results">
                        <div class="method-result" v-for="bp in breakpointNames" :key="`up-${bp}`">
                            <span class="method-call">isBreakpointUp('{{ bp }}')</span>
                            <span class="method-value"
                                  :class="{ true: deviceStore.isBreakpointUp(bp), false: !deviceStore.isBreakpointUp(bp) }">
                {{ deviceStore.isBreakpointUp(bp) }}
              </span>
                        </div>
                    </div>
                </div>

                <!-- isBreakpointDown -->
                <div class="method-demo">
                    <h4>isBreakpointDown()</h4>
                    <p>Проверяет "меньше" указанного брейкпоинта</p>
                    <div class="method-results">
                        <div class="method-result" v-for="bp in breakpointNames" :key="`down-${bp}`">
                            <span class="method-call">isBreakpointDown('{{ bp }}')</span>
                            <span class="method-value"
                                  :class="{ true: deviceStore.isBreakpointDown(bp), false: !deviceStore.isBreakpointDown(bp) }">
                {{ deviceStore.isBreakpointDown(bp) }}
              </span>
                        </div>
                    </div>
                </div>

                <!-- isBreakpointBetween -->
                <div class="method-demo">
                    <h4>isBreakpointBetween()</h4>
                    <p>Проверяет диапазон между двумя брейкпоинтами</p>
                    <div class="method-results">
                        <div class="method-result" v-for="range in breakpointRanges"
                             :key="`between-${range.min}-${range.max}`">
                            <span class="method-call">isBreakpointBetween('{{ range.min }}', '{{ range.max }}')</span>
                            <span class="method-value"
                                  :class="{ true: deviceStore.isBreakpointBetween(range.min, range.max), false: !deviceStore.isBreakpointBetween(range.min, range.max) }">
                {{ deviceStore.isBreakpointBetween(range.min, range.max) }}
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Конфигурация брейкпоинтов -->
        <div class="breakpoint-config">
            <h3>Конфигурация брейкпоинтов</h3>
            <div class="config-table">
                <div class="config-header">
                    <div>Брейкпоинт</div>
                    <div>Значение</div>
                    <div>Источник</div>
                </div>
                <div class="config-row" v-for="(value, name) in deviceStore.breakpoints" :key="name">
                    <div class="config-name">{{ name.toUpperCase() }}</div>
                    <div class="config-value">{{ value }}px</div>
                    <div class="config-source">CSS переменная</div>
                </div>
            </div>
        </div>

        <!-- Инструкции -->
        <div class="instructions">
            <h3>Как использовать</h3>
            <div class="code-examples">
                <div class="code-example">
                    <h4>В template:</h4>
                    <pre><code>&lt;div v-if="deviceStore.isMd"&gt;Показать только на MD экранах&lt;/div&gt;
&lt;div v-if="deviceStore.isBreakpointUp('lg')"&gt;Показать на LG и больше&lt;/div&gt;</code></pre>
                </div>

                <div class="code-example">
                    <h4>В script setup:</h4>
                    <pre><code>import { useDeviceStore } from '@/stores/device'

const deviceStore = useDeviceStore()

// Инициализация слушателей событий
deviceStore.initResizeListener()

// Использование в computed
const showSidebar = computed(() => deviceStore.isBreakpointUp('md'))</code></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useDeviceStore } from '@/stores/device'

const deviceStore = useDeviceStore()

// Список брейкпоинтов для демонстрации методов
const breakpointNames = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']

// Примеры диапазонов для isBreakpointBetween
const breakpointRanges = [
    { min: 'xs', max: 'md' },
    { min: 'sm', max: 'lg' },
    { min: 'md', max: 'xl' },
    { min: 'lg', max: 'xxl' }
]

// Слушатели событий инициализируются глобально в App.vue
// поэтому локальная инициализация не нужна
</script>

<style scoped lang="scss">
.breakpoint-demo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
        color: #2c3e50;
        margin-bottom: 0.5rem;
    }

    p {
        color: #7f8c8d;
        font-size: 1.1rem;
    }
}

.current-state {
    margin-bottom: 2rem;
}

.state-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    h3 {
        margin: 0 0 1rem 0;
        font-size: 1.3rem;
    }
}

.state-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.info-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .label {
        font-size: 0.9rem;
        opacity: 0.8;
    }

    .value {
        font-size: 1.2rem;
        font-weight: 600;

        &.is-mobile {
            color: #e74c3c;
        }
    }
}

.breakpoint-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.9rem !important;
    font-weight: 700 !important;

    &.bp-xs {
        background: #e74c3c;
    }

    &.bp-sm {
        background: #f39c12;
    }

    &.bp-md {
        background: #f1c40f;
        color: #2c3e50;
    }

    &.bp-lg {
        background: #27ae60;
    }

    &.bp-xl {
        background: #3498db;
    }

    &.bp-xxl {
        background: #9b59b6;
    }
}

.breakpoint-indicators {
    margin-bottom: 2rem;

    h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
    }
}

.indicators-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.indicator {
    background: #f8f9fa;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    transition: all 0.3s ease;

    &.active {
        background: #d4edda;
        border-color: #27ae60;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(39, 174, 96, 0.2);
    }

    .indicator-name {
        font-size: 1.2rem;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 0.5rem;
    }

    .indicator-range {
        font-size: 0.9rem;
        color: #7f8c8d;
        margin-bottom: 0.5rem;
    }

    .indicator-status {
        font-size: 0.8rem;
        font-weight: 600;
        color: #95a5a6;

        .active & {
            color: #27ae60;
        }
    }
}

.utility-methods {
    margin-bottom: 2rem;

    h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
    }
}

.methods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.method-demo {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h4 {
        color: #2c3e50;
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
    }

    p {
        color: #7f8c8d;
        font-size: 0.9rem;
        margin: 0 0 1rem 0;
    }
}

.method-results {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.method-result {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background: #f8f9fa;
    border-radius: 4px;
    font-size: 0.85rem;

    .method-call {
        font-family: 'Monaco', 'Menlo', monospace;
        color: #2c3e50;
    }

    .method-value {
        font-weight: 600;
        padding: 0.2rem 0.5rem;
        border-radius: 12px;

        &.true {
            background: #d4edda;
            color: #155724;
        }

        &.false {
            background: #f8d7da;
            color: #721c24;
        }
    }
}

.breakpoint-config {
    margin-bottom: 2rem;

    h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
    }
}

.config-table {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.config-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;

    > div {
        padding: 1rem;
        border-right: 1px solid #e9ecef;

        &:last-child {
            border-right: none;
        }
    }
}

.config-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-top: 1px solid #e9ecef;

    > div {
        padding: 0.75rem 1rem;
        border-right: 1px solid #e9ecef;

        &:last-child {
            border-right: none;
        }
    }

    .config-name {
        font-weight: 600;
        color: #2c3e50;
    }

    .config-value {
        font-family: 'Monaco', 'Menlo', monospace;
        color: #e74c3c;
    }

    .config-source {
        color: #7f8c8d;
        font-size: 0.9rem;
    }
}

.instructions {
    h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
    }
}

.code-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
}

.code-example {
    background: #2c3e50;
    border-radius: 8px;
    overflow: hidden;

    h4 {
        background: #34495e;
        color: white;
        margin: 0;
        padding: 1rem;
        font-size: 1rem;
    }

    pre {
        margin: 0;
        padding: 1.5rem;
        overflow-x: auto;

        code {
            color: #ecf0f1;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
        }
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .breakpoint-demo {
        padding: 1rem;
    }

    .state-info {
        grid-template-columns: 1fr;
    }

    .indicators-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .methods-grid {
        grid-template-columns: 1fr;
    }

    .code-examples {
        grid-template-columns: 1fr;
    }

    .config-header,
    .config-row {
        grid-template-columns: 1fr;

        > div {
            border-right: none;
            border-bottom: 1px solid #e9ecef;

            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>