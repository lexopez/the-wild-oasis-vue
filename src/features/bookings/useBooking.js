import { useQuery } from '@tanstack/vue-query'
import { getBooking } from '@/services/apiBookings'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export function useBooking() {
  const route = useRoute()
  const bookingId = computed(() => route.params.bookingId)
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId.value],
    queryFn: () => getBooking(bookingId.value),
    retry: false,
  })

  return { isLoading, error, booking }
}
