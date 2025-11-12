import { computed, ref, watch } from 'vue';
import { useElementSize, useSwipe } from '@vueuse/core';

/**
 * Композабл для 3D карусели
 * @param {Object} options - Параметры карусели
 * @returns {Object} - Объект с методами и реактивными данными карусели
 */
export const use3DCarousel = (options = {}) => {
    // Конфигурация по умолчанию
    const defaults = {
        radius: 300,           // Радиус 3D карусели при базовой ширине
        baseSlideSize: 250,    // Базовый размер слайда (ширина и высота)
        maxVisibleAngle: Math.PI / 1.8,  // Максимальный угол видимости
        maxScale: 1.0,         // Максимальный масштаб активного элемента
        minScale: 0.4,         // Минимальный масштаб боковых элементов
        maxOpacity: 1.0,       // Максимальная прозрачность активного элемента
        minOpacity: 0.2,       // Минимальная прозрачность боковых элементов
        maxRotation: 30,       // Максимальный поворот в градусах
        swipeThreshold: 100,   // Порог свайпа для смены слайда
        baseWidth: 1000        // Базовая ширина для расчёта масштаба
    };

    // Объединяем переданные опции с настройками по умолчанию
    const config = { ...defaults, ...options };

    // Реактивное значение для индекса активного слайда
    const activeIndex = ref(0);

    // Ссылка на элемент карусели
    const sliderWrapperRef = options.sliderWrapperRef || ref(null);

    // Определяем размеры контейнера
    const { width: containerWidth } = useElementSize(sliderWrapperRef);

    // Вычисляем коэффициент масштабирования на основе ширины контейнера
    const scaleFactor = ref(1);
    
    // Обновляем коэффициент масштабирования при изменении ширины контейнера
    watch(containerWidth, (newWidth) => {
        if (newWidth > 0) {
            scaleFactor.value = newWidth / config.baseWidth;
        }
    });
    
    // Вычисляем динамический радиус на основе ширины контейнера
    const dynamicRadius = computed(() => {
        return config.radius * scaleFactor.value;
    });

    // Вычисляем динамический размер слайда на основе ширины контейнера
    const dynamicSlideSize = computed(() => {
        return config.baseSlideSize * scaleFactor.value;
    });

    // Обработка свайпа (работает как на тач-устройствах, так и с мышью)
    const { isSwiping, lengthX } = useSwipe(sliderWrapperRef, {
        onSwipeEnd: () => {
            // Проверяем, есть ли данные слайдов
            if (!options.slidesData?.value) return;

            // Учитываем масштабирование порога свайпа
            const scaledSwipeThreshold = config.swipeThreshold * scaleFactor.value;
            
            // Если пользователь свайпнул дальше порога, переключаем слайд
            if (Math.abs(lengthX.value) > scaledSwipeThreshold) {
                if (lengthX.value < 0) {
                    // Свайп влево - следующий слайд
                    console.log('next (swipe left)', lengthX.value);
                    next();
                } else {
                    // Свайп вправо - предыдущий слайд
                    console.log('prev (swipe right)', lengthX.value);
                    prev();
                }
            }
        }
    });

    // Навигация к следующему слайду
    const next = () => {
        if (options.slidesData?.value) {
            // Переход к следующему слайду с зацикливанием
            activeIndex.value = (activeIndex.value + 1) % options.slidesData.value.length;
        }
    };

    // Навигация к предыдущему слайду
    const prev = () => {
        if (options.slidesData?.value) {
            // Переход к предыдущему слайду с зацикливанием
            activeIndex.value = (activeIndex.value - 1 + options.slidesData.value.length) % options.slidesData.value.length;
        }
    };

    // Вычисление стилей для 3D эффекта слайдов
    const getSlideStyle = (index) => {
        if (!options.slidesData?.value || options.slidesData.value.length === 0) {
            return {};
        }

        const totalSlides = options.slidesData.value.length;
        // Угол активного слайда
        const activeAngle = (2 * Math.PI * activeIndex.value) / totalSlides;
        // Угол текущего слайда
        const currentAngle = (2 * Math.PI * index) / totalSlides;

        // Разница углов между текущим и активным слайдом
        let angleDiff = currentAngle - activeAngle;

        // Нормализация угла в диапазоне [-π, π]
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff <= -Math.PI) angleDiff += 2 * Math.PI;

        // Вычисление позиции слайда с использованием динамического радиуса
        const x = Math.sin(angleDiff) * dynamicRadius.value;
        const z = (1 - Math.abs(angleDiff) / config.maxVisibleAngle) * (dynamicRadius.value / 3);

        // Вычисление масштаба на основе расстояния от центра
        let scale = config.maxScale - (Math.abs(angleDiff) / config.maxVisibleAngle) * (config.maxScale - config.minScale);
        scale = Math.max(scale, config.minScale); // Минимальный масштаб
        
        // Применяем масштабирование к размеру слайда
        scale = scale * scaleFactor.value;

        // Вычисление прозрачности на основе расстояния от центра
        let opacity = config.maxOpacity - (Math.abs(angleDiff) / config.maxVisibleAngle) * (config.maxOpacity - config.minOpacity);
        opacity = Math.max(opacity, config.minOpacity); // Минимальная прозрачность

        // Вычисление поворота для 3D эффекта
        const rotationY = (angleDiff / config.maxVisibleAngle) * config.maxRotation;

        // Вычисление z-index на основе позиции
        const zIndex = Math.round(50 - Math.abs(angleDiff) * 8);

        return {
            transform: `translateX(${x}px) translateZ(${z}px) scale(${scale}) rotateY(${rotationY}deg)`,
            zIndex: zIndex,
            filter: `blur(${(1 - opacity) * 0.5 * scaleFactor.value}px)`,
            opacity: opacity,
            visibility: 'visible',
            // Устанавливаем размер слайда через стили
            width: `${dynamicSlideSize.value}px`,
            height: `${dynamicSlideSize.value}px`
        };
    };

    // Получение CSS класса для слайда
    const getSlideClass = (index) => {
        return 'slide-3d';
    };

    return {
        // Реактивные значения
        activeIndex,      // Индекс активного слайда
        sliderWrapperRef, // Ссылка на контейнер карусели
        isSwiping,        // Состояние свайпа
        scaleFactor,      // Коэффициент масштабирования
        dynamicRadius,    // Динамический радиус карусели
        dynamicSlideSize, // Динамический размер слайда

        // Методы
        next,             // Переход к следующему слайду
        prev,             // Переход к предыдущему слайду
        getSlideStyle,    // Получение стилей для 3D эффекта
        getSlideClass,    // Получение CSS класса слайда

        // Конфигурация
        config            // Конфигурация карусели
    };
};