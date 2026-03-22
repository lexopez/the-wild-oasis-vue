<script setup>
import { useRoute, useRouter } from 'vue-router'
import SelectTag from './SelectTag.vue'
import { computed } from 'vue'

defineProps({
  options: {
    type: Array,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()

// 1. Get the current 'sortBy' value from the URL
const sortBy = computed(() => route.query.sortBy || 'startDate-desc')

// 2. Update the URL when the select value changes
function handleChange(value) {
  // Create a new query object to avoid mutating the original route object
  const newQuery = { ...route.query, sortBy: value }

  router.push({ query: newQuery })
}
</script>

<template>
  <SelectTag
    :options="options"
    :model-value="sortBy"
    type="white"
    @update:model-value="handleChange"
  />
</template>
