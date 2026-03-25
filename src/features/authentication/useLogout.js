import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { logout as logoutApi } from '@/services/apiAuth'
import { useRouter } from 'vue-router'

export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries()
      router.replace('/login')
    },
  })

  return { logout, isLoading }
}
