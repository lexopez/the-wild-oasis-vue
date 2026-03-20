<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  variation: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value),
  },
  // Added 'as' and 'to' to support the Link/RouterLink behavior
  // you used in TodayItem.vue
  as: {
    type: String,
    default: 'button',
  },
  to: {
    type: String,
    default: '',
  },
})

// 1. Define the emit
const emit = defineEmits(['click'])

// 2. Create the guarded handler
function handleClick(event) {
  // Only emit if it's acting as a regular button
  if (props.as === 'button') {
    emit('click', event)
  }
}

// Map the props to CSS classes
const sizeClass = computed(() => `size-${props.size}`)
const variationClass = computed(() => `variation-${props.variation}`)
</script>

<template>
  <component
    :is="as === 'router-link' ? 'RouterLink' : as"
    :to="to"
    class="button"
    :class="[sizeClass, variationClass]"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<style scoped>
/* Base Styles */
.button {
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s;
  display: inline-block;
  text-decoration: none; /* For when 'as' is a link */
}

/* Sizes */
.size-small {
  font-size: 1.2rem;
  padding: 0.4rem 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
}

.size-medium {
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
}

.size-large {
  font-size: 1.6rem;
  padding: 1.2rem 2.4rem;
  font-weight: 500;
}

/* Variations */
.variation-primary {
  color: var(--color-brand-50);
  background-color: var(--color-brand-600);
}

.variation-primary:hover {
  background-color: var(--color-brand-700);
}

.variation-secondary {
  color: var(--color-grey-600);
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
}

.variation-secondary:hover {
  background-color: var(--color-grey-50);
}

.variation-danger {
  color: var(--color-red-100);
  background-color: var(--color-red-700);
}

.variation-danger:hover {
  background-color: var(--color-red-800);
}
</style>
