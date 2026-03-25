import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner' // Using Vue Sonner as previously discussed
import { login as loginApi } from '@/services/apiAuth'

export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      // Manually set the user data in the cache to avoid an extra fetch
      queryClient.setQueryData(['user'], user.user)

      // Navigate to dashboard and replace history (redirect)
      router.replace('/dashboard')
      // Or simply: router.replace('/dashboard');
    },

    onError: (err) => {
      console.error('ERROR', err)
      toast.error('Provided email or password are incorrect')
    },
  })

  return { login, isLoading }
}
