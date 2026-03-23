import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createEditCabin } from '@/services/apiCabins'
import { toast } from 'vue-sonner'

export function useEditCabin() {
  const queryClient = useQueryClient()

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData }) => createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success('Cabin successfully edited')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isEditing, editCabin }
}
