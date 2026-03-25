<script setup>
import { computed } from 'vue'
import { useUser } from './useUser'

const { user } = useUser()
const userInfo = computed(() => user.value.user_metadata)
</script>
<template>
  <div class="user-avatar" v-if="user">
    <img
      :src="`${userInfo.avatar ? userInfo.avatar : '/default-user.jpg'}`"
      :alt="`Avatar of ${userInfo.fullName}`"
      class="avatar"
    />
    <span>{{ userInfo.fullName }}</span>
  </div>
</template>

<style scoped>
.user-avatar {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
}

.avatar {
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
}
</style>
