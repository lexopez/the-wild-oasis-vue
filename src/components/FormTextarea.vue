<script setup>
// This automatically handles the 'modelValue' prop and 'update:modelValue' event
const model = defineModel()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <textarea v-model="model" v-bind="$attrs" class="textarea" />
</template>

<style scoped>
.textarea {
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 8rem;
}
</style>
