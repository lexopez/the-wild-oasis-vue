<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Using HeroIcons for Vue (heroicons/vue/24/outline)
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { PAGE_SIZE } from '@/utils/constants'

const props = defineProps({
  count: {
    type: Number,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()

const currentPage = computed(() => (!route.query.page ? 1 : Number(route.query.page)))

const pageCount = computed(() => Math.ceil(props.count / PAGE_SIZE))

function nextPage() {
  const next = currentPage.value === pageCount.value ? currentPage.value : currentPage.value + 1
  router.push({ query: { ...route.query, page: next } })
}

function prevPage() {
  const prev = currentPage.value === 1 ? currentPage.value : currentPage.value - 1
  router.push({ query: { ...route.query, page: prev } })
}
</script>

<template>
  <div v-if="pageCount > 1" class="styled-pagination">
    <p class="pagination-info">
      Showing <span>{{ (currentPage - 1) * PAGE_SIZE + 1 }}</span> to
      <span>
        {{ currentPage === pageCount ? count : currentPage * PAGE_SIZE }}
      </span>
      of <span>{{ count }}</span> results
    </p>

    <div class="buttons">
      <button class="pagination-button" :disabled="currentPage === 1" @click="prevPage">
        <ChevronLeftIcon /> <span>Previous</span>
      </button>

      <button class="pagination-button" :disabled="currentPage === pageCount" @click="nextPage">
        <span>Next</span> <ChevronRightIcon />
      </button>
    </div>
  </div>
</template>

<style scoped>
.styled-pagination {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination-info {
  font-size: 1.4rem;
  margin-left: 0.8rem;
}

.pagination-info span {
  font-weight: 600;
}

.buttons {
  display: flex;
  gap: 0.6rem;
}

.pagination-button {
  background-color: var(--color-grey-50);
  color: inherit;
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;
  cursor: pointer;
}

/* Active/Hover states */
.pagination-button:hover:not(:disabled) {
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
}

.pagination-button:disabled {
  cursor: not-allowed;
}

.pagination-button svg {
  height: 1.8rem;
  width: 1.8rem;
}

/* Replicating the :has logic for specific padding */
.pagination-button span:first-child {
  padding-right: 0.4rem;
}
.pagination-button span:last-child {
  padding-left: 0.4rem;
}
</style>
