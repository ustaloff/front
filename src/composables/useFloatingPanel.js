import { ref, computed, toRefs } from "vue";
import { useFloating, autoUpdate, offset, flip, size, arrow } from '@floating-ui/vue';
import { onClickOutside } from '@vueuse/core';

export function useFloatingPanel(props, triggerRef, floatingRef, arrowRef) {
    const { boundaryElement, maxHeight, minHeight, showArrow } = toRefs(props);

    const showPopover = ref(false);
    const popoverMaxHeight = ref(null);
    const popoverMinHeight = ref(null);

    const middleware = computed(() => {
        const boundaryEl = boundaryElement.value;
        if (!boundaryEl) {
            return [];
        }
        const middlewareStack = [
            offset(10),
            size({
                padding: 10,
                apply({ availableHeight, elements }) {
                    const referenceRect = elements.reference.getBoundingClientRect();
                    const boundaryRect = boundaryEl.getBoundingClientRect();
                    const boundaryStyle = getComputedStyle(boundaryEl);
                    const boundaryPaddingLeft = parseFloat(boundaryStyle.paddingLeft);

                    const newMaxWidth = referenceRect.right - (boundaryRect.left + boundaryPaddingLeft);

                    popoverMaxHeight.value = Math.min(availableHeight, maxHeight.value);
                    popoverMinHeight.value = minHeight.value;

                    Object.assign(elements.floating.style, {
                        maxWidth: `${newMaxWidth}px`,
                    });
                },
            }),
            flip(),
        ];

        if (showArrow.value && arrowRef.value) {
            middlewareStack.push(arrow({ element: arrowRef.value }));
        }

        return middlewareStack;
    });

    const { x, y, strategy, placement, middlewareData } = useFloating(triggerRef, floatingRef, {
        open: showPopover,
        placement: 'bottom-end',
        middleware: middleware,
        whileElementsMounted: autoUpdate,
    });

    const arrowX = computed(() => middlewareData.value.arrow?.x);
    const arrowY = computed(() => middlewareData.value.arrow?.y);
    const staticSide = computed(() => {
        if (!placement.value) return 'top';
        return {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
        }[placement.value.split('-')[0]];
    });

    onClickOutside(floatingRef, () => {
        showPopover.value = false;
    }, { ignore: [triggerRef] });

    const toggle = () => {
        showPopover.value = !showPopover.value;
    };

    const close = () => {
        showPopover.value = false;
    };

    const open = () => {
        showPopover.value = true;
    };

    return {
        // State
        showPopover,
        popoverMaxHeight,
        popoverMinHeight,
        arrowRef,

        // Floating UI calculated values
        x,
        y,
        strategy,
        arrowX,
        arrowY,
        staticSide,

        // Methods
        toggle,
        close,
        open
    };
}
