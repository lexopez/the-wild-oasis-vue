<script setup>
import AppMenus from '@/components/AppMenus.vue'
import DataTable from '@/components/DataTable.vue'
import DataTableHeader from '@/components/DataTableHeader.vue'
import { useCabins } from './useCabins'
import { useRoute } from 'vue-router'
import AppSpinner from '@/components/AppSpinner.vue'
import EmptyData from '@/components/EmptyData.vue'
import { computed } from 'vue'
import DataTableBody from '@/components/DataTableBody.vue'
import DataTableRow from '@/components/DataTableRow.vue'
import CabinRow from './CabinRow.vue'

const { isLoading, cabins } = useCabins()
const route = useRoute()

// 1. FILTERING LOGIC
const filteredCabins = computed(() => {
  const filterValue = route.query?.discount || 'all'

  if (filterValue === 'all') return cabins.value

  if (filterValue === 'no-discount') {
    return cabins.value.filter((cabin) => cabin.discount === 0)
  }

  if (filterValue === 'with-discount') {
    return cabins.value.filter((cabin) => cabin.discount > 0)
  }

  return cabins.value
})

// 2. SORTING LOGIC
const sortedCabins = computed(() => {
  const sortBy = route.query.sortBy || 'name-asc' // Adjusted default for cabins
  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1

  // We use [...array] to avoid mutating the filteredCabins array directly
  return [...filteredCabins.value].sort((a, b) => {
    // Handle string sorting (like names) vs number sorting
    if (typeof a[field] === 'string') {
      return a[field].localeCompare(b[field]) * modifier
    }
    return (a[field] - b[field]) * modifier
  })
})
</script>

<template>
  <AppSpinner v-if="isLoading" />
  <EmptyData v-else-if="!cabins.length" resource-name="cabins" />
  <AppMenus v-else>
    <DataTable columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <DataTableHeader>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </DataTableHeader>
      <DataTableBody :data="sortedCabins" v-slot="{ item: cabin }">
        <DataTableRow>
          <CabinRow :cabin="cabin" />
        </DataTableRow>
      </DataTableBody>
    </DataTable>
  </AppMenus>
</template>
