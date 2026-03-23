import { useQuery } from '@tanstack/vue-query'
import { getSettings } from '@/services/apiSettings'

export function useSettings() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  })

  return { isLoading, error, data }
}
