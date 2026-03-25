<script setup lang="ts">
import AppHeading from '@/components/AppHeading.vue'
import AppLogo from '@/components/AppLogo.vue'
import LoginForm from '@/features/authentication/LoginForm.vue'
</script>

<template>
  <main class="login-layout">
    <AppLogo />
    <AppHeading as="h4">Log in to your account</AppHeading>
    <LoginForm />
  </main>
</template>

<style scoped>
.login-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
}
</style>
