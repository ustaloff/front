import { ref, computed, toRefs } from "vue";
import { useFloating, autoUpdate, offset, flip, size, arrow } from '@floating-ui/vue';
import { onClickOutside } from '@vueuse/core';
import { UI_CONFIG } from '@/config';

export function useFloatingPanel(props, triggerRef, floatingRef, arrowRef) {
    const { boundaryElement, maxHeight, minHeight, showArrow, placement: placementProp } = toRefs(props);

    const showPopover = ref(false);
    const popoverMaxHeight = ref(null);
    const popoverMinHeight = ref(null);

    // Define the effective placement once, using the default from UI_CONFIG.
    const effectivePlacement = computed(() => placementProp.value || UI_CONFIG.POPOVER_DEFAULT_PLACEMENT);

    const middleware = computed(() => {
        const boundaryEl = boundaryElement.value;
        const middlewareStack = [
            offset(10),
            size({
                padding: 10,
                apply({ availableHeight, elements }) {
                    popoverMaxHeight.value = Math.min(availableHeight, maxHeight.value);
                    popoverMinHeight.value = minHeight.value;

                    if (boundaryEl) {
                        const referenceRect = elements.reference.getBoundingClientRect();
                        const boundaryRect = boundaryEl.getBoundingClientRect();
                        let newMaxWidth;

                        // Use the single source of truth for placement.
                        if (effectivePlacement.value.includes('start')) {
                            // Starts at trigger-left, ends at boundary-right
                            newMaxWidth = boundaryRect.right - referenceRect.left;
                        } else { // Assumes 'end' or other
                            // Starts at boundary-left, ends at trigger-right
                            newMaxWidth = referenceRect.right - boundaryRect.left;
                        }

                        elements.floating.style.maxWidth = `${newMaxWidth}px`;
                    } else {
                        elements.floating.style.maxWidth = '';
                    }
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
        placement: effectivePlacement.value,
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
