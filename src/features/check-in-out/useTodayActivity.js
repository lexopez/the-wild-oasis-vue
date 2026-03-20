import { getStaysTodayActivity } from '@/services/apiBookings'
import { useQuery } from '@tanstack/vue-query'

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activity'],
  })

  return { activities, isLoading }
}
