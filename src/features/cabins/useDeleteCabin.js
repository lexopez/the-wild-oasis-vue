import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner' // Switched to Vue Sonner as discussed
import { deleteCabin as deleteCabinApi } from '@/services/apiCabins'

export function useDeleteCabin() {
  const queryClient = useQueryClient()

  // In Vue Query, we use 'isPending' instead of 'isLoading' for mutations
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully deleted')

      // Invalidate the cache to trigger an automatic re-fetch of the cabin list
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { isDeleting, deleteCabin }
}
