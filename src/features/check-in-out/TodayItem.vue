<script setup>
import StatusTag from '@/components/StatusTag.vue'
import FlagImg from '@/components/FlagImg.vue'
import SharedButton from '@/components/SharedButton.vue'
import CheckoutButton from './CheckoutButton.vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
})

// Destructuring for easier access in template
const { id, status, guests, numNights } = props.activity
</script>

<template>
  <li class="today-item">
    <StatusTag v-if="status === 'unconfirmed'" type="green">Arriving</StatusTag>
    <StatusTag v-if="status === 'checked-in'" type="blue">Departing</StatusTag>

    <FlagImg :src="guests.countryFlag" :alt="`Flag of ${guests.country}`" />
    <div class="guest">{{ guests.fullName }}</div>
    <div>{{ numNights }} nights</div>

    <template v-if="status === 'unconfirmed'">
      <SharedButton size="small" variation="primary" as="router-link" :to="`/checkin/${id}`">
        Check in
      </SharedButton>
    </template>

    <CheckoutButton v-if="status === 'checked-in'" :booking-id="id" />
  </li>
</template>

<style scoped>
.today-item {
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);
}

.today-item:first-child {
  border-top: 1px solid var(--color-grey-100);
}

.guest {
  font-weight: 500;
}
</style>
