<script setup>
import { ref, provide } from 'vue'

const openId = ref('')
const position = ref(null)

const close = () => (openId.value = '')
const open = (id) => (openId.value = id)

provide('menusContext', { openId, close, open, position })
</script>

<template>
  <slot />
</template>
