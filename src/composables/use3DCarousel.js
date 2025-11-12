import { ref } from 'vue';
import { useSwipe, useDraggable } from '@vueuse/core';

/**
 * Композабл для 3D карусели
 * @param {Object} options - Параметры карусели
 * @returns {Object} - Объект с методами и реактивными данными карусели
 */
export const use3DCarousel = (options = {}) => {
  // Конфигурация по умолчанию
  const defaults = {
    radius: 300,           // Радиус 3D карусели
    maxVisibleAngle: Math.PI / 1.8,  // Максимальный угол видимости
    maxScale: 1.0,         // Максимальный масштаб активного элемента
    minScale: 0.4,         // Минимальный масштаб боковых элементов
    maxOpacity: 1.0,       // Максимальная прозрачность активного элемента
    minOpacity: 0.2,       // Минимальная прозрачность боковых элементов
    maxRotation: 30,       // Максимальный поворот в градусах
    swipeThreshold: 100    // Порог свайпа для смены слайда
  };

  // Объединяем переданные опции с настройками по умолчанию
  const config = { ...defaults, ...options };

  // Реактивное значение для индекса активного слайда
  const activeIndex = ref(0);

  // Ссылка на элемент карусели
  const sliderWrapperRef = options.sliderWrapperRef || ref(null);

  // Обработка свайпа (работает как на тач-устройствах, так и с мышью)
  const { isSwiping, lengthX } = useSwipe(sliderWrapperRef, {
    onSwipeEnd: () => {
      // Проверяем, есть ли данные слайдов
      if (!options.slidesData?.value) return;

      console.log('isSwiping', isSwiping);

      // Если пользователь свайпнул дальше порога, переключаем слайд
      if (Math.abs(lengthX.value) > config.swipeThreshold) {
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

    // Вычисление позиции слайда
    const x = Math.sin(angleDiff) * config.radius;
    const z = (1 - Math.abs(angleDiff) / config.maxVisibleAngle) * (config.radius / 3);

    // Вычисление масштаба на основе расстояния от центра
    let scale = config.maxScale - (Math.abs(angleDiff) / config.maxVisibleAngle) * (config.maxScale - config.minScale);
    scale = Math.max(scale, config.minScale); // Минимальный масштаб

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
      filter: `blur(${(1 - opacity) * 0.5}px)`,
      opacity: opacity,
      visibility: 'visible'
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

    // Методы
    next,             // Переход к следующему слайду
    prev,             // Переход к предыдущему слайду
    getSlideStyle,    // Получение стилей для 3D эффекта
    getSlideClass,    // Получение CSS класса слайда

    // Конфигурация
    config            // Конфигурация карусели
  };
};