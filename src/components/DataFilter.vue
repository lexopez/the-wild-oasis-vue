<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  filterField: {
    type: String,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()

const currentFilter = computed(() => {
  return route.query[props.filterField] || props.options[0].value
})

function handleClick(value) {
  // Create a new query object based on existing params
  const query = { ...route.query, [props.filterField]: value }

  // If there is a "page" param, reset it to 1 just like in your React code
  if (route.query.page) query.page = 1

  // Update the URL
  router.push({ query })
}
</script>
<template>
  <div class="styled-filter">
    <button
      v-for="option in options"
      :key="option.value"
      class="filter-button"
      :class="{ active: currentFilter === option.value }"
      :disabled="currentFilter === option.value"
      @click="handleClick(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.styled-filter {
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
}

.filter-button {
  background-color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;
  cursor: pointer;
}

/* Equivalent to the props.active logic in Styled Components */
.filter-button.active {
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
}

.filter-button:hover:not(:disabled) {
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
}

.filter-button:disabled {
  cursor: not-allowed;
}
</style>
