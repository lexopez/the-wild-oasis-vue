<script setup>
import { inject } from 'vue'

const props = defineProps(['icon'])
const emit = defineEmits(['click'])

const { close } = inject('menusContext')

function handleClick() {
  emit('click')
  close()
}
</script>

<template>
  <li>
    <button class="styled-button" @click="handleClick">
      <component :is="icon" v-if="icon" class="icon" />
      <span><slot /></span>
    </button>
  </li>
</template>

<style scoped>
.styled-button {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
}
</style>
