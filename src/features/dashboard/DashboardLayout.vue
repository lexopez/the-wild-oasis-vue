<script setup>
import { useRecentBookings } from './useRecentBooking'
import { userRecentStays } from './useRecentStays'
import { useCabins } from '../cabins/useCabins'
import AppSpinner from '@/components/AppSpinner.vue'
import DashboardStats from './DashboardStats.vue'
import TodayActivity from '../check-in-out/TodayActivity.vue'
import DurationChart from './DurationChart.vue'
import SalesChart from './SalesChart.vue'

const { bookings, isLoading: isLoading1 } = useRecentBookings()
const { confirmedStays, isLoading: isLoading2, numDays } = userRecentStays()
const { cabins, isLoading: isLoading3 } = useCabins()
</script>
<template>
  <AppSpinner v-if="isLoading1 || isLoading2 || isLoading3" />
  <div class="dash-layout" v-if="bookings && confirmedStays && cabins">
    <DashboardStats
      :bookings="bookings"
      :confirmed-stays="confirmedStays"
      :num-days="numDays"
      :cabinCount="cabins?.length"
    />
    <TodayActivity />
    <DurationChart :confirmed-stays="confirmedStays" />
    <SalesChart :bookings="bookings" :num-days="numDays" />
  </div>
</template>

<style scoped>
.dash-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
}
</style>
