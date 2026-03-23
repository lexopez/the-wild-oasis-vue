<script setup lang="ts">
import AppHeading from '@/components/AppHeading.vue'
import AppRow from '@/components/AppRow.vue'
import UpdateSetting from '@/features/settings/UpdateSetting.vue'
</script>

<template>
  <AppRow>
    <AppHeading as="h1">Update hotel settings</AppHeading>
    <UpdateSetting />
  </AppRow>
</template>
