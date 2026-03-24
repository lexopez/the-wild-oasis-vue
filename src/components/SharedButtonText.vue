<script setup>
defineEmits(['click'])
</script>
<template>
  <button class="button-text" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.button-text {
  color: var(--color-brand-600);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);

  &:hover,
  &:active {
    color: var(--color-brand-700);
  }
}
</style>
