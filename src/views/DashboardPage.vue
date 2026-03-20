<script setup>
import AppHeading from '@/components/AppHeading.vue'
import AppRow from '@/components/AppRow.vue'
import DashboardFilter from '@/features/dashboard/DashboardFilter.vue'
import DashboardLayout from '@/features/dashboard/DashboardLayout.vue'
</script>

<template>
  <AppRow type="horizontal">
    <AppHeading as="h1">Dashboard</AppHeading>
    <DashboardFilter />
  </AppRow>
  <DashboardLayout />
</template>
