<script setup>
import { LogOut as LogoutIcon } from 'lucide-vue-next'
import SpinnerMini from '@/components/SpinnerMini.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import { useLogout } from './useLogout'

const { logout, isLoading } = useLogout()
</script>
<template>
  <ButtonIcon @click="logout" :disabled="isLoading">
    <LogoutIcon v-if="!isLoading" />
    <SpinnerMini v-else />
  </ButtonIcon>
</template>
