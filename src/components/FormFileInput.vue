<script setup>
// This ensures that if you put @change or a custom class on <FileInput />,
// it lands directly on the <input> element.
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <input type="file" class="file-input" v-bind="$attrs" />
</template>

<style scoped>
.file-input {
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);
}

/* In Vue/CSS, we use the standard pseudo-element ::file-selector-button 
  which is the direct equivalent of what you had in styled-components.
*/
.file-input::file-selector-button {
  font: inherit;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  margin-right: 1.2rem;
  border-radius: var(--border-radius-sm);
  border: none;
  color: var(--color-brand-50);
  background-color: var(--color-brand-600);
  cursor: pointer;
  transition:
    color 0.2s,
    background-color 0.2s;
}

.file-input::file-selector-button:hover {
  background-color: var(--color-brand-700);
}
</style>
