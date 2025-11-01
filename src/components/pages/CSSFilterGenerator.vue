<template>
    <div class="generator-container">
        <h2>CSS Color Filter Generator</h2>
        <p class="subtitle">Convert any hex color to CSS filters for recoloring images</p>

        <div class="input-section">
            <div class="color-input-group">
                <div class="input-wrapper">
                    <label for="target-color">Target Color</label>
                    <div class="color-input-container">
                        <input
                            type="text"
                            id="target-color"
                            v-model="targetColor"
                            placeholder="#000000"
                            maxlength="7"
                            @input="handleColorInput"
                        >
                        <input
                            type="color"
                            id="color-picker"
                            v-model="targetColor"
                            @input="handleColorPicker"
                        >
                    </div>
                </div>
                <button
                    class="generate-btn"
                    @click="generateFilter"
                    :disabled="isGenerating"
                >
                    {{ isGenerating ? 'Generating...' : 'Generate Filter' }}
                </button>
            </div>
        </div>

        <div _v-if="showResults" id="results-container">
            <div class="preview-section">
                <div class="preview-box">
                    <div class="preview-label">Target Color</div>
                    <div class="color-sample" :style="{ backgroundColor: targetColor }">
                        {{ targetColor }}
                    </div>
                </div>
                <div class="preview-box">
                    <div class="preview-label">Filter Result</div>
                    <div class="color-sample" id="result-sample">
                        <div
                            class="filter-preview"
                            :style="{ filter: resultFilter }"
                        ></div>
                    </div>
                </div>
            </div>

            <div style="text-align: center;">
                <div class="accuracy-badge" :class="accuracyClass">
                    <span id="accuracy-text">{{ accuracyMessage }}</span>
                </div>
            </div>

            <div class="result-wrapper">
                <label>CSS Filter Code</label>
                <div class="result-box">
                    <code id="result">{{ resultFilter ? `filter: ${resultFilter};` : '' }}</code>
                    <button
                        id="copy-button"
                        title="Copy to clipboard"
                        @click="copyToClipboard"
                    >
            <span class="copy-icon" v-if="!copied">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
              </svg>
            </span>
                        <span class="success-icon" v-else>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
            </span>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="isGenerating" id="loading-container">
            <div class="loading">⏳ Calculating optimal filter values...</div>
        </div>
    </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useCSSFilterGenerator} from '@/composables/useCSSFilterGenerator';

const {
    targetColor,
    resultFilter,
    loss,
    isGenerating,
    generateFilter,
    copyToClipboard,
    copied
} = useCSSFilterGenerator();

const showResults = computed(() => {
    return !isGenerating.value && resultFilter.value;
});

const accuracyClass = computed(() => {
    if (loss.value <= 1) return 'excellent';
    if (loss.value <= 5) return 'good';
    if (loss.value <= 15) return 'fair';
    return 'poor';
});

const accuracyMessage = computed(() => {
    let message = '';
    if (loss.value <= 1) {
        message = '✨ Excellent match!';
    } else if (loss.value <= 5) {
        message = '👍 Good match';
    } else if (loss.value <= 15) {
        message = '⚠️ Fair match';
    } else {
        message = '❌ Poor match';
    }
    return `${message} (Loss: ${loss.value.toFixed(2)})`;
});

// Handle input from text field
const handleColorInput = (event) => {
    let value = event.target.value;
    if (value.startsWith('#')) {
        value = value.substring(1);
    }
    if (!/^[0-9A-Fa-f]{0,6}$/.test(value)) {
        // Revert to previous value if invalid
        event.target.value = targetColor.value.substring(1);
        return;
    }
    if (value.length === 6) {
        targetColor.value = `#${value}`;
    } else {
        targetColor.value = `#${value}`;
    }
};

// Handle input from color picker
const handleColorPicker = () => {
    // Update the text input when color picker changes
};
</script>

<style lang="scss" scoped>
:root {
    --bg-color: #f8f9fc;
    --container-bg: #ffffff;
    --text-color: #1f2937;
    --label-color: #4b5563;
    --border-color: #d1d5db;
    --border-focus-color: #4f46e5;
    --primary-color: #4f46e5;
    --primary-hover-color: #4338ca;
    --code-bg: #f3f4f6;
    --code-color: #111827;
    --shadow-color: rgba(0, 0, 0, 0.05);
    --radius-md: 8px;
    --radius-lg: 12px;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 16px;
}

body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    padding: 2rem 1rem;
    line-height: 1.5;
}

.generator-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    background-color: var(--container-bg);
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 12px var(--shadow-color), 0 10px 30px rgba(0, 0, 0, 0.05);
}

h2 {
    font-size: 1.75rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 0.5rem;
}

.subtitle {
    text-align: center;
    color: var(--label-color);
    margin-bottom: 2rem;
    font-size: 0.95rem;
}

.input-section {
    margin-bottom: 2rem;
}

.color-input-group {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
    margin-bottom: 1rem;
}

.input-wrapper {
    flex: 1;
}

.input-wrapper label {
    display: block;
    font-weight: 500;
    color: var(--label-color);
    margin-bottom: 0.5rem;
}

.color-input-container {
    display: flex;
    gap: 0.5rem;
}

input[type="text"] {
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
    font-family: 'SF Mono', monospace;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    transition: border-color 0.2s ease;
}

input[type="text"]:focus {
    outline: none;
    border-color: var(--border-focus-color);
}

input[type="color"] {
    width: 60px;
    height: 48px;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: border-color 0.2s ease;
}

input[type="color"]:hover {
    border-color: var(--primary-color);
}

.generate-btn {
    padding: 0.75rem 2rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    font-size: 1rem;
}

.generate-btn:hover {
    background-color: var(--primary-hover-color);
    transform: translateY(-1px);
}

.generate-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.preview-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: var(--code-bg);
    border-radius: var(--radius-md);
}

.preview-box {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.preview-label {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--label-color);
    text-align: center;
}

.color-sample {
    width: 100%;
    height: 120px;
    border-radius: var(--radius-md);
    border: 2px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.85rem;
    color: #666;
}

.filter-preview {
    width: 50px;
    height: 50px;
    background: black;
    border-radius: var(--radius-md);
}

.accuracy-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
    margin: 1rem auto;
    text-align: center;
    justify-content: center;
}

.accuracy-badge.excellent {
    background-color: #d1fae5;
    color: var(--success-color);
}

.accuracy-badge.good {
    background-color: #dbeafe;
    color: #3b82f6;
}

.accuracy-badge.fair {
    background-color: #fef3c7;
    color: var(--warning-color);
}

.accuracy-badge.poor {
    background-color: #fee2e2;
    color: var(--danger-color);
}

.result-wrapper {
    margin-top: 1.5rem;
}

.result-wrapper label {
    display: block;
    font-weight: 500;
    color: var(--label-color);
    margin-bottom: 0.5rem;
}

.result-box {
    display: flex;
    align-items: center;
    background-color: var(--code-bg);
    border-radius: var(--radius-md);
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    border: 2px solid var(--border-color);
}

#result {
    flex-grow: 1;
    font-family: 'SF Mono', 'Fira Code', monospace;
    color: var(--code-color);
    font-size: 0.9rem;
    white-space: nowrap;
    overflow-x: auto;
    padding-right: 1rem;

    /* Hide Scrollbar */
    /* Chrome, Safari, Opera */
    ::-webkit-scrollbar {
        display: none;
    }

    /* Firefox */
    scrollbar-width: none;
    /* IE and Edge */
    -ms-overflow-style: none;
}

#copy-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    color: #6b7280;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
    position: relative;
}

#copy-button:hover {
    background-color: #e5e7eb;
    color: var(--primary-color);
}

#copy-button svg {
    width: 20px;
    height: 20px;
    transition: opacity 0.2s ease;
}

#copy-button .copy-icon,
#copy-button .success-icon {
    position: absolute;
}

#copy-button .success-icon {
    opacity: 0;
    color: var(--primary-color);
}

#copy-button:deep(.success-icon) {
    opacity: 1 !important;
}

.loading {
    text-align: center;
    color: var(--label-color);
    padding: 1rem;
}

@media (max-width: 768px) {
    .preview-section {
        grid-template-columns: 1fr;
    }

    .color-input-group {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
    }
}
</style>