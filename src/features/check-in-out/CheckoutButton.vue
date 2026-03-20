<script setup lang="ts">
import SharedButton from '@/components/SharedButton.vue'

defineProps({
  bookingId: Number,
})

const handleClick = () => {
  console.log('click')
}
</script>

<template>
  <SharedButton variation="primary" size="small" @click="handleClick">Check out</SharedButton>
</template>
