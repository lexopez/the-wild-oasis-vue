<script setup>
// This automatically handles the 'modelValue' prop and 'update:modelValue' event
const model = defineModel()
defineOptions({
  inheritAttrs: false,
})
</script>
<template>
  <input v-bind="$attrs" v-model="model" class="input" />
</template>

<style scoped>
.input {
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
}
</style>
