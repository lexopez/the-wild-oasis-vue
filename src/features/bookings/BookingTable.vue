<script setup>
import { useBookings } from './useBookings'
import AppSpinner from '@/components/AppSpinner.vue'
import DataTable from '@/components/DataTable.vue'
import DataTableHeader from '@/components/DataTableHeader.vue'
import DataTableBody from '@/components/DataTableBody.vue'
import DataTableRow from '@/components/DataTableRow.vue'
import DataTableFooter from '@/components/DataTableFooter.vue'
import BookingRow from './BookingRow.vue'
import AppMenus from '@/components/AppMenus.vue'
import DataTablePagination from '@/components/DataTablePagination.vue'

const { isLoading, bookings, count, error } = useBookings()
</script>

<template>
  <AppSpinner v-if="isLoading" />
  <AppMenus v-else>
    <DataTable columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <DataTableHeader>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </DataTableHeader>
      <DataTableBody :data="bookings" v-slot="{ item: booking }">
        <DataTableRow>
          <BookingRow :booking="booking" />
        </DataTableRow>
      </DataTableBody>

      <DataTableFooter>
        <DataTablePagination :count="count" />
      </DataTableFooter>
    </DataTable>
  </AppMenus>
</template>
