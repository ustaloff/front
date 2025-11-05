import { ref, computed, onMounted } from 'vue';

export function useClampGenerator() {
    // --- State ---
    const form = ref({
        minWidth: 375,
        minWidthUnit: 'px',
        maxWidth: 1440,
        maxWidthUnit: 'px',
        minFont: 16,
        minFontUnit: 'px',
        maxFont: 48,
        maxFontUnit: 'px',
        baseFontSize: 16,
        outputUnit: 'rem',
    });

    const result = ref('');

    // --- Getters / Computed ---
    const getValueInPx = (value, unit) => {
        const baseSize = parseFloat(form.value.baseFontSize) || 16;
        return unit === 'rem' ? value * baseSize : value;
    };

    const generatedClamp = computed(() => {
        const minW = getValueInPx(form.value.minWidth, form.value.minWidthUnit);
        const maxW = getValueInPx(form.value.maxWidth, form.value.maxWidthUnit);
        const minF = getValueInPx(form.value.minFont, form.value.minFontUnit);
        const maxF = getValueInPx(form.value.maxFont, form.value.maxFontUnit);
        const baseFontSize = parseFloat(form.value.baseFontSize) || 16;
        const outputUnit = form.value.outputUnit;

        if (minW >= maxW || minF >= maxF) {
            return 'Invalid values';
        }

        const slope = (maxF - minF) / (maxW - minW);
        const intercept = minF - slope * minW;

        let minVal, maxVal, preferredVal;

        if (outputUnit === 'rem') {
            const toRem = (px) => (px / baseFontSize).toFixed(4).replace(/\.?0+$/, '');
            minVal = `${toRem(minF)}rem`;
            maxVal = `${toRem(maxF)}rem`;
            preferredVal = `${toRem(intercept)}rem + ${(slope * 100).toFixed(4).replace(/\.?0+$/, '')}vw`;
        } else { // px
            minVal = `${minF.toFixed(2).replace(/\.00$/, '')}px`;
            maxVal = `${maxF.toFixed(2).replace(/\.00$/, '')}px`;
            preferredVal = `${intercept.toFixed(4).replace(/\.?0+$/, '')}px + ${(slope * 100).toFixed(4).replace(/\.?0+$/, '')}vw`;
        }

        const clampValue = `clamp(${minVal}, ${preferredVal}, ${maxVal})`;
        return `font-size: ${clampValue};`;
    });

    // --- Actions / Methods ---
    const generateClamp = () => {
        result.value = generatedClamp.value;
    };

    const copyToClipboard = () => {
        if (!result.value || result.value === 'Invalid values') return;

        return navigator.clipboard.writeText(result.value);
    };

    // --- Lifecycle Hooks ---
    onMounted(generateClamp);

    return {
        form,
        result,
        generateClamp,
        copyToClipboard,
    };
}
