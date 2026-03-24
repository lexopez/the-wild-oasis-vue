<script setup>
import AppHeading from '@/components/AppHeading.vue'
import AppRow from '@/components/AppRow.vue'
import StatusTag from '@/components/StatusTag.vue'
import { useDeleteBooking } from './useDeleteBooking'
import { useBooking } from './useBooking'
import AppHeadingGroup from '@/components/AppHeadingGroup.vue'
import SharedButtonText from '@/components/SharedButtonText.vue'
import { useRouter } from 'vue-router'
import AppSpinner from '@/components/AppSpinner.vue'
import EmptyData from '@/components/EmptyData.vue'
import SharedButtonGroup from '@/components/SharedButtonGroup.vue'
import SharedButton from '@/components/SharedButton.vue'

import { ArrowUpOnSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import AppModal from '@/components/AppModal.vue'
import ModalWindow from '@/components/ModalWindow.vue'
import { ref } from 'vue'
import AppMenus from '@/components/AppMenus.vue'
import ConfirmDelete from '@/components/ConfirmDelete.vue'
import { useCheckout } from '../check-in-out/useCheckout'
import BookingDataBox from './BookingDataBox.vue'

const { booking, isLoading } = useBooking()
const { checkout, isCheckingOut } = useCheckout()
const { deleteBooking } = useDeleteBooking()

const router = useRouter()

const statusToTagName = {
  unconfirmed: 'blue',
  'checked-in': 'green',
  'checked-out': 'silver',
}
const childRef = ref('')
</script>

<template>
  <AppSpinner v-if="isLoading" />
  <EmptyData v-else-if="!booking" />
  <template v-else>
    <AppRow type="horizontal">
      <AppHeadingGroup>
        <AppHeading as="h1">Booking # {{ booking.id }}</AppHeading>
        <StatusTag :type="statusToTagName[booking.status]">{{
          booking.status.replace('-', ' ')
        }}</StatusTag>
      </AppHeadingGroup>
      <SharedButtonText @click="router.back()">&larr; Back</SharedButtonText>
    </AppRow>

    <BookingDataBox :booking="booking" />

    <SharedButtonGroup>
      <SharedButton
        v-if="booking.status === 'unconfirmed'"
        as="router-link"
        :to="`/checkin/${booking.id}`"
        >Check in</SharedButton
      >

      <SharedButton
        v-if="booking.status === 'checked-in'"
        @click="checkout(booking.id)"
        :disabled="isCheckingOut"
      >
        <ArrowUpOnSquareIcon class="icon" /> Check out</SharedButton
      >

      <AppModal ref="childRef">
        <AppMenus>
          <SharedButton @click="childRef.open('delete')">
            Delete booking<TrashIcon class="icon" />
          </SharedButton>

          <ModalWindow name="delete">
            <ConfirmDelete
              resource-name="booking"
              @confirm="
                deleteBooking(booking.id, {
                  onSettled: () => router.back(),
                })
              "
            />
          </ModalWindow>
        </AppMenus>
      </AppModal>

      <SharedButton variation="secondary" @click="router.back()">Back</SharedButton>
    </SharedButtonGroup>
  </template>
</template>

<style scoped>
.icon {
  width: 1.6rem;
  height: 1.6rem;
  color: var(--color-grey-400);
  transition: all 0.3s;
}
</style>
