import { useQuery } from '@tanstack/vue-query'
import { subDays } from 'date-fns'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { getBookingsAfterDate } from '@/services/apiBookings'

export function useRecentBookings() {
  const route = useRoute()

  // 1. Reactive calculation of numDays based on URL
  const numDays = computed(() => {
    const last = route.query.last
    return !last ? 7 : Number(last)
  })

  // 2. Reactive calculation of the ISO date string
  const queryDate = computed(() => {
    return subDays(new Date(), numDays.value).toISOString()
  })

  // 3. Vue Query automatically re-fetches when a reactive dependency
  // (like numDays or queryDate) inside the queryKey changes.
  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings', computed(() => `last-${numDays.value}`)],
    queryFn: () => getBookingsAfterDate(queryDate.value),
  })

  return { isLoading, bookings }
}
