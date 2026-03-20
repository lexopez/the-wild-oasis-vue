<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})

// We create a computed object for the styles to keep the template clean
const dynamicStyles = computed(() => ({
  color: `var(--color-${props.type}-700)`,
  backgroundColor: `var(--color-${props.type}-100)`,
}))
</script>

<template>
  <span class="tag" :style="dynamicStyles">
    <slot />
  </span>
</template>

<style scoped>
.tag {
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
}
</style>
