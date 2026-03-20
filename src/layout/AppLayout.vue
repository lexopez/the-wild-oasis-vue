<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <AppSidebar />
    <main class="main">
      <div class="container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

.main {
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  /* Equivalent to overflow: scroll */
  overflow-y: auto;
}

.container {
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
}
</style>
