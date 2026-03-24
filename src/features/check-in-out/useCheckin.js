import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { updateBooking } from '@/services/apiBookings'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'

export function useCheckin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`)
      queryClient.invalidateQueries({ active: true })
      router.push(`/bookings/${data.id}`)
    },

    onError: () => toast.error('There was an error while checking in'),
  })

  return { checkin, isCheckingIn }
}
