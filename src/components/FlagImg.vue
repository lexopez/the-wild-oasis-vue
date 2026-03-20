<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: 'Country flag',
  },
})
</script>

<template>
  <img class="flag" :src="src" :alt="alt" />
</template>

<style scoped>
.flag {
  max-width: 2rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);
}
</style>
