<script setup>
import { ref, provide, defineExpose } from 'vue'

const openName = ref('')
const close = () => (openName.value = '')
const open = (name) => (openName.value = name)

provide('modalContext', { openName, open, close })

// Allows parent access if needed
defineExpose({ open, close })
</script>

<template>
  <slot />
</template>
