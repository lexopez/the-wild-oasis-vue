import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { updateBooking } from '@/services/apiBookings'
import { toast } from 'vue-sonner'

export function useCheckout() {
  const queryClient = useQueryClient()

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`)
      queryClient.invalidateQueries({ active: true })
    },

    onError: () => toast.error('There was an error while checking out'),
  })

  return { checkout, isCheckingOut }
}
