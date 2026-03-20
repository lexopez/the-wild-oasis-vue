<script setup>
import AppSpinner from '@/components/AppSpinner.vue'
import TodayItem from './TodayItem.vue'
import { useTodayActivity } from './useTodayActivity'
import AppRow from '@/components/AppRow.vue'
import AppHeading from '@/components/AppHeading.vue'

const { activities, isLoading } = useTodayActivity()
</script>
<template>
  <div class="today-activity">
    <AppRow type="horizontal">
      <AppHeading as="h2">Today</AppHeading>
    </AppRow>

    <AppSpinner v-if="isLoading" />

    <template v-else>
      <ul v-if="activities?.length > 0" class="today-list">
        <TodayItem v-for="activity in activities" :key="activity.id" :activity="activity" />
      </ul>
      <p v-else class="no-activity">No activity today...</p>
    </template>
  </div>
</template>

<style scoped>
.today-activity {
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
}

.today-list {
  overflow: scroll;
  overflow-x: hidden;
  list-style: none;
  padding: 0;
  margin: 0;

  /* Removing scrollbars */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-activity {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
}
</style>
