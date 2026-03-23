<script setup>
import { format, isToday } from 'date-fns'
import { formatDistanceFromNow, formatCurrency } from '@/utils/helpers'
import StatusTag from '@/components/StatusTag.vue'
import { computed, ref } from 'vue'
import AppModal from '@/components/AppModal.vue'
import MenusToggle from '@/components/MenusToggle.vue'
import MenusButton from '@/components/MenusButton.vue'
import MenusList from '@/components/MenusList.vue'
import AppMenusMenu from '@/components/AppMenusMenu.vue'

import { TrashIcon, EyeIcon, ArrowDownOnSquareIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import ModalWindow from '@/components/ModalWindow.vue'
import ConfirmDelete from '@/components/ConfirmDelete.vue'
import { useDeleteBooking } from './useDeleteBooking'
defineProps({
  booking: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const statusToTagName = computed(() => {
  return {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }
})
const childRef = ref(null)
const { deleteBooking } = useDeleteBooking()
</script>

<template>
  <div class="cabin">
    {{ booking.cabins.name }}
  </div>
  <div class="stacked">
    <span>{{ booking.guests.fullName }}</span>
    <span>{{ booking.guests.email }}</span>
  </div>
  <div class="stacked">
    <span>
      {{
        isToday(new Date(booking.startDate)) ? 'Today' : formatDistanceFromNow(booking.startDate)
      }}
      &rarr; {{ booking.numNights }} night stay
    </span>
    <span>
      {{ format(new Date(booking.startDate), 'MMM dd yyyy') }} &mdash;
      {{ format(new Date(booking.endDate), 'MMM dd yyyy') }}
    </span>
  </div>

  <StatusTag :type="statusToTagName[booking.status]">{{
    booking.status.replace('-', ' ')
  }}</StatusTag>

  <div class="amount">{{ formatCurrency(booking.totalPrice) }}</div>

  <AppModal ref="childRef">
    <AppMenusMenu>
      <MenusToggle :id="booking.id" />

      <MenusList :id="booking.id">
        <MenusButton :icon="EyeIcon" @click="router.push(`/bookings/${booking.id}`)">
          See details
        </MenusButton>

        <MenusButton
          v-if="booking.status === 'unconfirmed'"
          :icon="ArrowDownOnSquareIcon"
          @click="router.push(`/checkin/${booking.id}`)"
        >
          Check in
        </MenusButton>

        <MenusButton :icon="TrashIcon" @click="childRef.open('delete')">
          Delete booking
        </MenusButton>
      </MenusList>
    </AppMenusMenu>

    <ModalWindow name="delete">
      <ConfirmDelete resource-name="booking" @confirm="deleteBooking(booking.id)" />
    </ModalWindow>
  </AppModal>
</template>

<style scoped>
.cabin {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
}

.stacked {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.stacked span:first-child {
  font-weight: 500;
}

.stacked span:last-child {
  color: var(--color-grey-500);
  font-size: 1.2rem;
}

.amount {
  font-family: 'Sono';
  font-weight: 500;
}
</style>
