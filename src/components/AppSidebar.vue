<script setup lang="ts">
import AppLogo from './AppLogo.vue'
import MainNav from './MainNav.vue'
</script>

<template>
  <aside class="sidebar">
    <AppLogo />
    <MainNav />
  </aside>
</template>

<style scoped>
.sidebar {
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
}
</style>
