<script setup>
import { Loader2 as LoaderIcon } from 'lucide-vue-next'
</script>

<template>
  <LoaderIcon class="spinner-mini" />
</template>

<style scoped>
@keyframes rotate {
  to {
    transform: rotate(1turn);
  }
}

.spinner-mini {
  width: 2.4rem;
  height: 2.4rem;
  animation: rotate 1.5s infinite linear;
}
</style>
