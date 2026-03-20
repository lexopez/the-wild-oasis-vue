<script setup>
defineEmits(['click'])
</script>
<template>
  <button class="button-icon" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.button-icon {
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
}

.button-icon:hover {
  background-color: var(--color-grey-100);
}

/* Equivalent to "& svg" in your styled-component */
.button-icon :deep(svg) {
  width: 2.2rem;
  height: 2.2rem;
  color: var(--color-brand-600);
}
</style>
