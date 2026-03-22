import { computed } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { getBookings } from '@/services/apiBookings'
import { PAGE_SIZE } from '@/utils/constants'

export function useBookings() {
  const queryClient = useQueryClient()
  const route = useRoute()

  // 1. FILTER - Computed to stay reactive to URL changes
  const filter = computed(() => {
    const filterValue = route.query.status
    return !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }
  })

  // 2. SORT
  const sortBy = computed(() => {
    const sortByRaw = route.query.sortBy || 'startDate-desc'
    const [field, direction] = sortByRaw.split('-')
    return { field, direction }
  })

  // 3. PAGINATION
  const page = computed(() => (!route.query.page ? 1 : Number(route.query.page)))

  // 4. QUERY
  // Note: We pass functions to queryKey/queryFn so they react to the computed refs above
  const { isLoading, data, error } = useQuery({
    queryKey: computed(() => ['bookings', filter.value, sortBy.value, page.value]),
    queryFn: () =>
      getBookings({
        filter: filter.value,
        sortBy: sortBy.value,
        page: page.value,
      }),
  })

  // 5. PRE-FETCHING (Logic moved into a watcher-like effect inside computed)
  // We extract count safely from the data object
  const bookings = computed(() => data.value?.data || [])
  const count = computed(() => data.value?.count || 0)
  const pageCount = computed(() => Math.ceil(count.value / PAGE_SIZE))

  // Pre-fetching logic: Vue Query handles this well when queryKey changes,
  // but we can manually trigger it for the next/prev pages
  const prefetch = () => {
    if (page.value < pageCount.value) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', filter.value, sortBy.value, page.value + 1],
        queryFn: () =>
          getBookings({ filter: filter.value, sortBy: sortBy.value, page: page.value + 1 }),
      })
    }

    if (page.value > 1) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', filter.value, sortBy.value, page.value - 1],
        queryFn: () =>
          getBookings({ filter: filter.value, sortBy: sortBy.value, page: page.value - 1 }),
      })
    }
  }

  // Trigger prefetch whenever data is fetched
  prefetch()

  return { isLoading, error, bookings, count }
}
