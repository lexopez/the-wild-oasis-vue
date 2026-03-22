<script setup>
import { inject, computed } from 'vue'

defineProps(['id'])

const { openId, position, close } = inject('menusContext')

const positionStyle = computed(() => {
  if (!position.value) return {}
  return {
    right: `${position.value.x}px`,
    top: `${position.value.y}px`,
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <ul v-if="openId === id" class="styled-list" v-click-outside="close" :style="positionStyle">
        <slot />
      </ul>
    </Transition>
  </Teleport>
</template>

<style scoped>
.styled-list {
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  z-index: 1001; /* Ensure it's above the overlay if needed */
  list-style: none;
  padding: 0;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
