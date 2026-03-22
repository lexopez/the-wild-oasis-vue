<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  // We explicitly define 'type' to use it in our CSS logic
  type: {
    type: String,
    default: 'default',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <select
    class="styled-select"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
.styled-select {
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  /* Replicating your dynamic border logic using v-bind */
  border: 1px solid v-bind("type === 'white' ? 'var(--color-grey-100)' : 'var(--color-grey-300)'");
}
</style>
