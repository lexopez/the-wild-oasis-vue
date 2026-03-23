<script setup>
defineProps({
  type: {
    type: String,
    default: 'regular',
    // Optional: Validation to ensure only 'regular' or 'modal' are used
    validator: (value) => ['regular', 'modal'].includes(value),
  },
})
</script>

<template>
  <form :class="['styled-form', `type-${type}`]" v-bind="$attrs">
    <slot />
  </form>
</template>

<style scoped>
.styled-form {
  overflow: hidden;
  font-size: 1.4rem;
}

/* Styles for type="regular" */
.type-regular {
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
}

/* Styles for type="modal" */
.type-modal {
  width: 80rem;
}
</style>
