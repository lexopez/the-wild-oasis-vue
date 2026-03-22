<script setup lang="ts">
import AppHeading from '@/components/AppHeading.vue'
import AppRow from '@/components/AppRow.vue'
import BookingTable from '@/features/bookings/BookingTable.vue'
import BookingTableOperations from '@/features/bookings/BookingTableOperations.vue'
</script>

<template>
  <AppRow type="horizontal">
    <AppHeading as="h1">All bookings</AppHeading>
    <BookingTableOperations />
  </AppRow>
  <BookingTable />
</template>
