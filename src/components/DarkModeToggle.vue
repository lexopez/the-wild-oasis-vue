<script setup>
import { Sun as SunIcon, Moon as MoonIcon } from 'lucide-vue-next'
import ButtonIcon from './ButtonIcon.vue'
import { useDarkMode } from '@/composable/useDarkMode'

const { isDarkMode, toggleDarkMode } = useDarkMode()
</script>

<template>
  <ButtonIcon @click="toggleDarkMode">
    <SunIcon v-if="isDarkMode" />
    <MoonIcon v-else />
  </ButtonIcon>
</template>
