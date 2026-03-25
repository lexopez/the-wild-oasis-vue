import { useMutation } from '@tanstack/vue-query'
import { signup as signupApi } from '@/services/apiAuth'
import { toast } from 'vue-sonner'

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address.",
      )
    },
  })

  return { signup, isPending }
}
