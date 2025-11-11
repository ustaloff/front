import { ref, computed } from 'vue';
import { useSwipe } from '@vueuse/core';

export const use3DCarousel = (options = {}) => {
  // Default configuration
  const defaults = {
    radius: 300,
    maxVisibleAngle: Math.PI / 1.8,
    maxScale: 1.0,
    minScale: 0.4,
    maxOpacity: 1.0,
    minOpacity: 0.2,
    maxRotation: 30,
    swipeThreshold: 100,
    perspective: 1000,
    animationDuration: 600,
    animationEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  };

  // Merge options with defaults
  const config = { ...defaults, ...options };

  // Reactive variables
  const baseActiveIndex = ref(0);
  // Use the provided ref from options, or create a new one
  const sliderWrapperRef = options.sliderWrapperRef || ref(null);

  // Swipe detection
  const { isSwiping, lengthX } = useSwipe(sliderWrapperRef, {
    onSwipe: () => {
      // Update swipe offset during swipe for continuous rotation
    },
    onSwipeEnd: () => {
      if (!options.slidesData?.value) return;
      
      // Calculate how many slides to move based on swipe distance
      const slidesToMove = Math.round(lengthX.value / config.swipeThreshold);

      if (Math.abs(slidesToMove) > 0) {
        // Update baseActiveIndex by the number of slides moved
        let newIndex = (baseActiveIndex.value + slidesToMove) % options.slidesData.value.length;
        if (newIndex < 0) {
          newIndex += options.slidesData.value.length;
        }
        baseActiveIndex.value = newIndex;

        if (slidesToMove < 0) { // Swiped left (finger moves left on screen)
          console.log('next', lengthX.value, slidesToMove);
        } else { // Swiped right (finger moves right on screen)
          console.log('prev', lengthX.value, slidesToMove);
        }
      }
    }
  });

  // Computed properties
  const swipeOffset = computed(() => {
    return lengthX.value ? lengthX.value / config.swipeThreshold : 0;
  });

  const activeIndex = computed(() => {
    if (!options.slidesData?.value || options.slidesData.value.length === 0) return 0;
    
    const rawIndex = baseActiveIndex.value + swipeOffset.value;
    const totalSlides = options.slidesData.value.length;
    // Normalize the index to be within the valid range [0, totalSlides-1]
    let normalizedIndex = rawIndex % totalSlides;
    if (normalizedIndex < 0) {
      normalizedIndex += totalSlides;
    }
    return Math.round(normalizedIndex);
  });

  // Navigation functions
  const next = () => {
    if (options.slidesData?.value) {
      baseActiveIndex.value = (baseActiveIndex.value + 1) % options.slidesData.value.length;
    }
  };

  const prev = () => {
    if (options.slidesData?.value) {
      baseActiveIndex.value = (baseActiveIndex.value - 1 + options.slidesData.value.length) % options.slidesData.value.length;
    }
  };

  // Function to calculate slide styles for 3D effect
  const getSlideStyle = (index) => {
    if (!options.slidesData?.value || options.slidesData.value.length === 0) {
      return {};
    }
    
    const totalSlides = options.slidesData.value.length;
    const angleStep = (2 * Math.PI) / totalSlides;
    const activeAngle = (2 * Math.PI * activeIndex.value) / totalSlides;
    const currentAngle = (2 * Math.PI * index) / totalSlides;

    // Calculate angle difference from active slide (with swipe offset)
    let angleDiff = currentAngle - activeAngle;

    // Normalize angle to be between -π and π
    while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    while (angleDiff <= -Math.PI) angleDiff += 2 * Math.PI;

    // Calculate position
    const x = Math.sin(angleDiff) * config.radius;
    const z = (1 - Math.abs(angleDiff) / config.maxVisibleAngle) * (config.radius / 3);

    // Calculate scale based on distance from center
    let scale = config.maxScale - (Math.abs(angleDiff) / config.maxVisibleAngle) * (config.maxScale - config.minScale);
    scale = Math.max(scale, config.minScale); // Ensure minimum scale

    // Calculate opacity based on distance
    let opacity = config.maxOpacity - (Math.abs(angleDiff) / config.maxVisibleAngle) * (config.maxOpacity - config.minOpacity);
    opacity = Math.max(opacity, config.minOpacity); // Ensure minimum opacity

    // Calculate rotation for 3D effect
    const rotationY = (angleDiff / config.maxVisibleAngle) * config.maxRotation;

    // Calculate z-index based on position
    const zIndex = Math.round(50 - Math.abs(angleDiff) * 8);

    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale}) rotateY(${rotationY}deg)`,
      zIndex: zIndex,
      filter: `blur(${(1 - opacity) * 0.5}px)`,
      opacity: opacity,
      visibility: 'visible'
    };
  };

  // Function to determine slide class
  const getSlideClass = (index) => {
    return 'slide-3d';
  };

  return {
    // Reactive references
    baseActiveIndex,
    activeIndex,
    sliderWrapperRef,
    isSwiping,
    
    // Computed properties
    swipeOffset,
    
    // Functions
    next,
    prev,
    getSlideStyle,
    getSlideClass,
    
    // Configuration
    config
  };
};