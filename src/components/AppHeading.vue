<template>
  <component :is="as" :class="['heading', as]">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  as: {
    type: String,
    default: 'h1',
    validator: (value) => ['h1', 'h2', 'h3', 'h4'].includes(value),
  },
})
</script>

<style scoped>
.h1 {
  font-size: 3rem;
  font-weight: 600;
}

.h2 {
  font-size: 2rem;
  font-weight: 600;
}

.h3 {
  font-size: 2rem;
  font-weight: 500;
}

.h4 {
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
}
</style>
