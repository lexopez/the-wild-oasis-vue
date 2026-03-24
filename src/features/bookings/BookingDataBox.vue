<script setup>
import { format, isToday } from 'date-fns'
// import {
//   OutlineChatBubbleBottomCenterText,
//   OutlineCheckCircle,
//   OutlineCurrencyDollar,
//   OutlineHomeModern,
// } from 'vue-sonner'
import { HomeIcon, MessageSquareTextIcon, CheckCircle2Icon, DollarSignIcon } from 'lucide-vue-next'

import { formatDistanceFromNow, formatCurrency } from '@/utils/helpers'
import FlagImg from '@/components/FlagImg.vue'
import DataItem from '@/components/DataItem.vue'

const props = defineProps({
  booking: {
    type: Object,
    required: true,
  },
})

// Destructuring the booking object for easier template access
const {
  created_at,
  startDate,
  endDate,
  numNights,
  numGuests,
  cabinPrice,
  extrasPrice,
  totalPrice,
  hasBreakfast,
  observations,
  isPaid,
  guests: { fullName: guestName, email, country, countryFlag, nationalID },
  cabins: { name: cabinName },
} = props.booking
</script>

<template>
  <section class="booking-data-box">
    <header class="header">
      <div>
        <HomeIcon class="icon-lg" />
        <p>
          {{ numNights }} nights in Cabin <span>{{ cabinName }}</span>
        </p>
      </div>

      <p>
        {{ format(new Date(startDate), 'EEE, MMM dd yyyy') }} (
        {{ isToday(new Date(startDate)) ? 'Today' : formatDistanceFromNow(startDate) }}
        ) &mdash; {{ format(new Date(endDate), 'EEE, MMM dd yyyy') }}
      </p>
    </header>

    <section class="section">
      <div class="guest">
        <FlagImg v-if="countryFlag" :src="countryFlag" :alt="`Flag of ${country}`" />
        <p>{{ guestName }} {{ numGuests > 1 ? `+ ${numGuests - 1} guests` : '' }}</p>
        <span>&bull;</span>
        <p>{{ email }}</p>
        <span>&bull;</span>
        <p>National ID {{ nationalID }}</p>
      </div>

      <DataItem v-if="observations" label="Observations">
        <template #icon><MessageSquareTextIcon /></template>
        {{ observations }}
      </DataItem>

      <DataItem label="Breakfast included?">
        <template #icon><CheckCircle2Icon /></template>
        {{ hasBreakfast ? 'Yes' : 'No' }}
      </DataItem>

      <div :class="['price', isPaid ? 'is-paid' : 'is-unpaid']">
        <DataItem :label="`Total price`">
          <template #icon><DollarSignIcon /></template>
          {{ formatCurrency(totalPrice) }}

          <span v-if="hasBreakfast">
            ({{ formatCurrency(cabinPrice) }} cabin + {{ formatCurrency(extrasPrice) }} breakfast)
          </span>
        </DataItem>

        <p>{{ isPaid ? 'Paid' : 'Will pay at property' }}</p>
      </div>
    </section>

    <footer class="footer">
      <p>Booked {{ format(new Date(created_at), 'EEE, MMM dd yyyy, p') }}</p>
    </footer>
  </section>
</template>

<style scoped>
.booking-data-box {
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.header {
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header .icon-lg {
  height: 3.2rem;
  width: 3.2rem;
}

.header div:first-child {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  font-weight: 600;
  font-size: 1.8rem;
}

.header span {
  font-family: 'Sono';
  font-size: 2rem;
  margin-left: 4px;
}

.section {
  padding: 3.2rem 4rem 1.2rem;
}

.guest {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);
}

.guest p:first-of-type {
  font-weight: 500;
  color: var(--color-grey-700);
}

.price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;
}

/* Conditional Colors based on isPaid */
.is-paid {
  background-color: var(--color-green-100);
  color: var(--color-green-700);
}

.is-unpaid {
  background-color: var(--color-yellow-100);
  color: var(--color-yellow-700);
}

.price p:last-child {
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: 600;
}

.price :deep(svg) {
  height: 2.4rem;
  width: 2.4rem;
  color: currentColor !important;
}

.footer {
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
}
</style>
