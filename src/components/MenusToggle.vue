<script setup>
import { inject } from 'vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'

const props = defineProps(['id'])
const { openId, close, open, position } = inject('menusContext')

function handleClick(e) {
  e.stopPropagation()
  const rect = e.currentTarget.getBoundingClientRect()
  position.value = {
    x: window.innerWidth - rect.width - rect.x,
    y: rect.y + rect.height + 8,
  }
  openId.value === '' || openId.value !== props.id ? open(props.id) : close()
}
</script>

<template>
  <button class="styled-toggle" @click.stop="handleClick" ref="refer">
    <EllipsisVerticalIcon />
  </button>
</template>

<style scoped>
.styled-toggle {
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
}

.styled-toggle:hover {
  background-color: var(--color-grey-100);
}

.styled-toggle svg {
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-grey-700);
}
</style>
