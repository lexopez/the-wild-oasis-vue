<script setup>
import { inject } from 'vue'
const { columns } = inject('tableContext')
</script>

<template>
  <div class="common-row styled-row" role="row">
    <slot />
  </div>
</template>

<style scoped>
.common-row {
  display: grid;
  grid-template-columns: v-bind(columns);
  column-gap: 2.4rem;
  align-items: center;
}

.styled-row {
  padding: 1.2rem 2.4rem;
}

.styled-row:not(:last-child) {
  border-bottom: 1px solid var(--color-grey-100);
}
</style>
