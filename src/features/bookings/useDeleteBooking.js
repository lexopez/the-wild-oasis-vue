import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner' // Or your preferred Vue toast library
import { deleteBooking as deleteBookingApi } from '@/services/apiBookings'

export function useDeleteBooking() {
  const queryClient = useQueryClient()

  // In Vue Query, isLoading is typically referred to as isPending for mutations
  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success('Booking successfully deleted')

      // Invalidate the cache to trigger a re-fetch of the bookings list
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isDeleting, deleteBooking }
}
