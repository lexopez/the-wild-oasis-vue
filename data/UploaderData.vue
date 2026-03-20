<script setup>
import { ref } from 'vue'
import { isFuture, isPast, isToday } from 'date-fns'

import { bookings } from './data-bookings'
import { cabins } from './data-cabins'
import { guests } from './data-guests'
import SharedButton from '@/components/SharedButton.vue'
import { subtractDates } from '@/utils/helpers'
import supabase from '@/services/supabase'

const isLoading = ref(false)

async function deleteGuests() {
  const { error } = await supabase.from('guests').delete().gt('id', 0)
  if (error) console.error(error.message)
}

async function deleteCabins() {
  const { error } = await supabase.from('cabins').delete().gt('id', 0)
  if (error) console.error(error.message)
}

async function deleteBookings() {
  const { error } = await supabase.from('bookings').delete().gt('id', 0)
  if (error) console.error(error.message)
}

async function createGuests() {
  const { error } = await supabase.from('guests').insert(guests)
  if (error) console.error(error.message)
}

async function createCabins() {
  const { error } = await supabase.from('cabins').insert(cabins)
  if (error) console.error(error.message)
}

async function createBookings() {
  // Get actual IDs from DB because Supabase generates them
  const { data: guestsIds } = await supabase.from('guests').select('id').order('id')
  const allGuestIds = guestsIds.map((guest) => guest.id)

  const { data: cabinsIds } = await supabase.from('cabins').select('id').order('id')
  const allCabinIds = cabinsIds.map((cabin) => cabin.id)

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins[booking.cabinId - 1]
    const numNights = subtractDates(booking.endDate, booking.startDate)
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount)
    const extrasPrice = booking.hasBreakfast ? numNights * 15 * booking.numGuests : 0
    const totalPrice = cabinPrice + extrasPrice

    let status
    const start = new Date(booking.startDate)
    const end = new Date(booking.endDate)

    if (isPast(end) && !isToday(end)) status = 'checked-out'
    if (isFuture(start) || isToday(start)) status = 'unconfirmed'
    if ((isFuture(end) || isToday(end)) && isPast(start) && !isToday(start)) status = 'checked-in'

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds[booking.guestId - 1],
      cabinId: allCabinIds[booking.cabinId - 1],
      status,
    }
  })

  const { error } = await supabase.from('bookings').insert(finalBookings)
  if (error) console.error(error.message)
}

async function uploadAll() {
  isLoading.value = true
  // Delete sequence
  await deleteBookings()
  await deleteGuests()
  await deleteCabins()

  // Create sequence
  await createGuests()
  await createCabins()
  await createBookings()
  isLoading.value = false
}

async function uploadBookings() {
  isLoading.value = true
  await deleteBookings()
  await createBookings()
  isLoading.value = false
}
</script>

<template>
  <div class="uploader-container">
    <h3>SAMPLE DATA</h3>

    <SharedButton :disabled="isLoading" @click="uploadAll"> Upload ALL </SharedButton>

    <SharedButton :disabled="isLoading" @click="uploadBookings">
      Upload bookings ONLY
    </SharedButton>
  </div>
</template>

<style scoped>
.uploader-container {
  margin-top: auto;
  background-color: var(--color-indigo-100, #e0e7ff);
  padding: 0.8rem;
  border-radius: var(--border-radius-sm, 5px);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-600);
}
</style>
