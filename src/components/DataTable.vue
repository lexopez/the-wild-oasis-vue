<script setup>
import { provide, toRefs } from 'vue'

const props = defineProps({
  columns: {
    type: String,
    required: true,
  },
})

// Provide the columns prop to all child components (Header, Row, etc.)
provide('tableContext', toRefs(props))
</script>

<template>
  <div class="styled-table" role="table">
    <slot />
  </div>
</template>

<style scoped>
.styled-table {
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
}
</style>
