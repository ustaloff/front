<template>
    <div class="generator-container">
        <h2>CSS <code>clamp()</code> Generator</h2>

        <Button label="Primary"/>
        <Button label="Secondary" severity="secondary"/>
        <Button label="Success" severity="success"/>
        <Button label="Info" severity="info"/>
        <Button label="Warning" severity="warning"/>
        <Button label="Help" severity="help"/>
        <Button label="Danger" severity="danger"/>
        <Button label="Contrast" severity="contrast"/>

        <form id="clamp-form" class="form-grid" @input.prevent="generateClamp">
            <!-- Viewport -->
            <div class="input-group">
                <label for="minWidth">Minimum Viewport</label>
                <div class="input-with-unit">
                    <input type="number" id="minWidth" v-model.number="form.minWidth" step="1">
                    <select id="minWidthUnit" v-model="form.minWidthUnit">
                        <option value="px">px</option>
                        <option value="rem">rem</option>
                    </select>
                </div>
            </div>
            <div class="input-group">
                <label for="maxWidth">Maximum Viewport</label>
                <div class="input-with-unit">
                    <input type="number" id="maxWidth" v-model.number="form.maxWidth" step="1">
                    <select id="maxWidthUnit" v-model="form.maxWidthUnit">
                        <option value="px">px</option>
                        <option value="rem">rem</option>
                    </select>
                </div>
            </div>

            <!-- Font Size -->
            <div class="input-group">
                <label for="minFont">Minimum Font Size</label>
                <div class="input-with-unit">
                    <input type="number" id="minFont" v-model.number="form.minFont" step="0.1">
                    <select id="minFontUnit" v-model="form.minFontUnit">
                        <option value="px">px</option>
                        <option value="rem">rem</option>
                    </select>
                </div>
            </div>
            <div class="input-group">
                <label for="maxFont">Maximum Font Size</label>
                <div class="input-with-unit">
                    <input type="number" id="maxFont" v-model.number="form.maxFont" step="0.1">
                    <select id="maxFontUnit" v-model="form.maxFontUnit">
                        <option value="px">px</option>
                        <option value="rem">rem</option>
                    </select>
                </div>
            </div>

            <!-- Settings -->
            <div class="input-group single-input">
                <label for="baseFontSize">Base Font Size (for rem conversion)</label>
                <input type="number" id="baseFontSize" v-model.number="form.baseFontSize" step="1">
            </div>
            <div class="input-group single-input">
                <label for="outputUnit">Output Unit</label>
                <select id="outputUnit" v-model="form.outputUnit">
                    <option value="rem">rem</option>
                    <option value="px">px</option>
                </select>
            </div>
        </form>

        <div class="result-wrapper">
            <label>Result</label>
            <div class="result-box">
                <code id="result">{{ result }}</code>
                <button id="copy-button" title="Copy to clipboard" @click="handleCopy">
                    <span class="copy-icon" :style="{ opacity: copySuccess ? 0 : 1 }">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
                        </svg>
                    </span>
                    <span class="success-icon" :style="{ opacity: copySuccess ? 1 : 0 }">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                              stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import {useClampGenerator} from '@/composables/useClampGenerator';

const {form, result, generateClamp, copyToClipboard} = useClampGenerator();

const copySuccess = ref(false);

const handleCopy = () => {
    copyToClipboard().then(() => {
        copySuccess.value = true;
        setTimeout(() => {
            copySuccess.value = false;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

</script>

<style scoped>
/* Базовые стили */
/** {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 16px;
}

body {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    padding: 2rem 1rem;
    line-height: 1.5;
}*/

/* Контейнер генератора */
.generator-container {
    max-width: 800px;
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
    margin-bottom: 2rem;
}

/* Сетка для полей формы */
.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

/* Группа полей ввода */
.input-group label {
    display: block;
    font-weight: 500;
    color: var(--label-color);
    margin-bottom: 0.5rem;
}

.input-with-unit {
    display: flex;
    align-items: stretch;
}

/* Стилизация полей ввода и селектов */
input[type="number"],
select {
    width: 100%;
    padding: 0.65rem 0.75rem;
    font-size: 1rem;
    font-family: inherit;
    border: 1px solid var(--border-color);
    background-color: #fff;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input[type="number"]:focus,
select:focus {
    outline: none;
    border-color: var(--border-focus-color);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

/* Стили для инпута с селектом единиц */
.input-with-unit input[type="number"] {
    flex-grow: 1;
    border-right: none;
    border-radius: var(--radius-md) 0 0 var(--radius-md);
}

.input-with-unit select {
    flex-shrink: 0;
    width: auto;
    border-left: 1px solid var(--border-color);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    background-color: var(--bg-color);
    font-weight: 500;
    cursor: pointer;
}

/* Стили для одиночных полей */
.single-input input,
.single-input select {
    border-radius: var(--radius-md);
}

/* Область результата */
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
    border: 1px solid var(--border-color);
}

#result {
    flex-grow: 1;
    font-family: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
    color: var(--code-color);
    font-size: 0.95rem;
    white-space: nowrap;
    overflow-x: auto;
    padding-right: 1rem;
}

/* Кнопка копирования */
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
</style>
