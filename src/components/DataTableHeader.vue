<script setup>
import { inject } from 'vue'
const { columns } = inject('tableContext')
</script>

<template>
  <header class="common-row styled-header" role="row">
    <slot />
  </header>
</template>

<style scoped>
.common-row {
  display: grid;
  /* Use v-bind to inject the provided columns into CSS */
  grid-template-columns: v-bind(columns);
  column-gap: 2.4rem;
  align-items: center;
}

.styled-header {
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
}
</style>
