<script setup>
import { computed } from 'vue'
import {
  Briefcase as BriefcaseIcon,
  Banknote as BanknotesIcon,
  CalendarDays as CalendarIcon,
  BarChart3 as ChartBarIcon,
} from 'lucide-vue-next'

import { formatCurrency } from '@/utils/helpers'
import DashboardStat from './DashboardStat.vue'

const props = defineProps({
  bookings: Array,
  confirmedStays: Array,
  numDays: Number,
  cabinCount: Number,
})

// 1.
const numBookings = computed(() => props.bookings.length)

// 2.
const sales = computed(() => props.bookings.reduce((acc, cur) => acc + cur.totalPrice, 0))

// 3.
const checkins = computed(() => props.confirmedStays.length)

// 4.
const occupancyRate = computed(() => {
  const occupation =
    props.confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (props.numDays * props.cabinCount)

  return Math.round(occupation * 100) + '%'
})
</script>

<template>
  <DashboardStat title="Bookings" color="blue" :value="numBookings">
    <template #icon><BriefcaseIcon /></template>
  </DashboardStat>

  <DashboardStat title="Sales" color="green" :value="formatCurrency(sales)">
    <template #icon><BanknotesIcon /></template>
  </DashboardStat>

  <DashboardStat title="Check ins" color="indigo" :value="checkins">
    <template #icon><CalendarIcon /></template>
  </DashboardStat>

  <DashboardStat title="Occupancy rate" color="yellow" :value="occupancyRate">
    <template #icon><ChartBarIcon /></template>
  </DashboardStat>
</template>
