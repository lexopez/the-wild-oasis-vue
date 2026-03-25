<script setup>
import AppHeading from '@/components/AppHeading.vue'
import AppRow from '@/components/AppRow.vue'
import UpdatePasswordForm from '@/features/authentication/UpdatePasswordForm.vue'
import UpdateUserDataForm from '@/features/authentication/UpdateUserDataForm.vue'
</script>

<template>
  <AppHeading as="h1">Update your account</AppHeading>

  <AppRow>
    <AppHeading as="h3">Update user data</AppHeading>
    <UpdateUserDataForm />
  </AppRow>

  <AppRow>
    <AppHeading as="h3">Update password</AppHeading>
    <UpdatePasswordForm />
  </AppRow>
</template>
