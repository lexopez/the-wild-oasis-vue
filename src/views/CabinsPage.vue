<script setup lang="ts">
import AppHeading from '@/components/AppHeading.vue'
import AppRow from '@/components/AppRow.vue'
import AddCabin from '@/features/cabins/AddCabin.vue'
import CabinTable from '@/features/cabins/CabinTable.vue'
import CabinTableOperations from '@/features/cabins/CabinTableOperations.vue'
</script>

<template>
  <AppRow type="horizontal">
    <AppHeading as="h1">All cabins</AppHeading>
    <CabinTableOperations />
  </AppRow>
  <AppRow>
    <CabinTable />
    <AddCabin />
  </AppRow>
</template>
