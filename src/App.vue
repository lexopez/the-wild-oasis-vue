<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import { useDarkMode } from './composable/useDarkMode'
useDarkMode()
</script>

<template>
  <RouterView />
  <Toaster
    position="top-center"
    :gap="12"
    :container-style="{
      margin: '8px',
    }"
    :toast-options="{
      duration: 3000, // Default duration
      style: {
        fontSize: '16px',
        maxWidth: '500px',
        padding: '16px 24px',
        background: 'var(--color-grey-0)',
        color: 'var(--color-grey-700)',
      },
    }"
  />
  <VueQueryDevtools />
</template>

<style scoped></style>
