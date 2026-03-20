<script setup>
import { LogOut as LogoutIcon } from 'lucide-vue-next'
import SpinnerMini from '@/components/SpinnerMini.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'

const isLoading = false
</script>
<template>
  <ButtonIcon>
    <LogoutIcon v-if="!isLoading" />
    <SpinnerMini v-else />
  </ButtonIcon>
</template>
