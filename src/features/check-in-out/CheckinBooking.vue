<script setup>
import { ref, computed, watch } from 'vue'

import { useCheckin } from './useCheckin'
import { useBooking } from '../bookings/useBooking'
import { useSettings } from '../settings/useSettings'

import { formatCurrency } from '@/utils/helpers'
import BookingDataBox from '@/features/bookings/BookingDataBox.vue'
import AppRow from '@/components/AppRow.vue'
import AppHeading from '@/components/AppHeading.vue'
import SharedButtonText from '@/components/SharedButtonText.vue'
import CheckboxInput from '@/components/CheckboxInput.vue'
import SharedButtonGroup from '@/components/SharedButtonGroup.vue'
import SharedButton from '@/components/SharedButton.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import { useRouter } from 'vue-router'
// 1. Data & Hooks
const { booking, isLoading } = useBooking()
const { data: settings, isLoading: isLoadingSettings } = useSettings()
const { checkin, isCheckingIn } = useCheckin()

// 2. Local State
const confirmPaid = ref(false)
const addBreakfast = ref(false)
const router = useRouter()

// 3. Computed (Derived State)
const bookingId = computed(() => booking.value?.id)
const guests = computed(() => booking.value?.guests)
const totalPrice = computed(() => booking.value?.totalPrice)
const numGuests = computed(() => booking.value?.numGuests)
const hasBreakfast = computed(() => booking.value?.hasBreakfast)
const numNights = computed(() => booking.value?.numNights)

const optionalBreakfastPrice = computed(
  () => settings.value?.breakfastPrice * numNights.value * numGuests.value,
)

// 4. check if booking already checked in and Sync payment status (Like useEffect)
watch(
  booking,
  (newBooking) => {
    if (newBooking?.status === 'checked-in') router.push(`/bookings/${newBooking.id}`)
    if (newBooking) confirmPaid.value = newBooking.isPaid ?? false
  },
  { immediate: true },
)

// 5. Handlers
function handleBreakfastChange() {
  // Reset confirmation if breakfast selection changes
  confirmPaid.value = false
}

function handleCheckin() {
  if (!confirmPaid.value) return

  if (addBreakfast.value) {
    checkin({
      bookingId: bookingId.value,
      breakfast: {
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice.value,
        totalPrice: totalPrice.value + optionalBreakfastPrice.value,
      },
    })
  } else {
    checkin({
      bookingId: bookingId.value,
      breakfast: {},
    })
  }
}
</script>
<template>
  <AppSpinner v-if="isLoading || isLoadingSettings" />

  <template v-else>
    <AppRow type="horizontal">
      <AppHeading as="h1">Check in booking #{{ bookingId }}</AppHeading>
      <SharedButtonText @click="router.back()">&larr; Back</SharedButtonText>
    </AppRow>

    <BookingDataBox :booking="booking" />

    <div v-if="!hasBreakfast" class="box">
      <CheckboxInput id="breakfast" v-model="addBreakfast" @change="handleBreakfastChange">
        Want to add breakfast for {{ optionalBreakfastPrice }}?
      </CheckboxInput>
    </div>

    <div class="box">
      <CheckboxInput id="confirm" v-model="confirmPaid" :disabled="confirmPaid || isCheckingIn">
        I confirm that {{ guests.fullName }} has paid the total amount of
        {{
          !addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} 
               (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`
        }}
      </CheckboxInput>
    </div>

    <SharedButtonGroup>
      <SharedButton @click="handleCheckin" :disabled="!confirmPaid || isCheckingIn">
        Check in booking #{{ bookingId }}
      </SharedButton>
      <SharedButton variation="secondary" @click="router.back()"> Back </SharedButton>
    </SharedButtonGroup>
  </template>
</template>

<style scoped>
.box {
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  margin-bottom: 2.4rem; /* Added spacing between boxes */
}
</style>
