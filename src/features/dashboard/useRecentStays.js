import { getStaysAfterDate } from '@/services/apiBookings'
import { useQuery } from '@tanstack/vue-query'
import { subDays } from 'date-fns'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const userRecentStays = () => {
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

  // 3. Fetching stays using Vue Query
  const { isLoading, data: stays } = useQuery({
    queryKey: ['stays', computed(() => `last-${numDays.value}`)],
    queryFn: () => getStaysAfterDate(queryDate.value),
  })

  // 4. Derived state: Filtered confirmed stays
  // We use computed() so this updates automatically when 'stays' changes
  const confirmedStays = computed(() => {
    return stays.value?.filter(
      (stay) => stay.status === 'checked-in' || stay.status === 'checked-out',
    )
  })

  return { isLoading, stays, confirmedStays, numDays }
}
