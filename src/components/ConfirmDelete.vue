<script setup>
import { inject } from 'vue'
import AppHeading from './AppHeading.vue'
import SharedButton from './SharedButton.vue'

const emit = defineEmits(['confirm'])
defineProps({
  resourceName: {
    type: String,
    required: true,
  },
})
const { close } = inject('modalContext')
const handleDelete = () => {
  emit('confirm')
  close()
}
</script>

<template>
  <div class="confirm-delete">
    <AppHeading as="h3">Delete {{ resourceName }}</AppHeading>

    <p>
      Are you sure you want to delete this {{ resourceName }} permanently? This action cannot be
      undone.
    </p>

    <div>
      <SharedButton variation="secondary" @click="close"> Cancel </SharedButton>
      <SharedButton variation="danger" @click="handleDelete"> Delete </SharedButton>
    </div>
  </div>
</template>

<style scoped>
.confirm-delete {
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
}
</style>
