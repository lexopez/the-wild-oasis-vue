<script setup>
import { useRouter } from 'vue-router'
import { User as UserIcon } from 'lucide-vue-next' // Example icon library
import ButtonIcon from './ButtonIcon.vue'
import DarkModeToggle from './DarkModeToggle.vue'
import LogoutButton from '@/features/authentication/LogoutButton.vue'

const router = useRouter()
</script>

<template>
  <ul class="header-menu">
    <li>
      <ButtonIcon @click="router.push('/account')">
        <UserIcon />
      </ButtonIcon>
    </li>
    <li>
      <DarkModeToggle />
    </li>
    <li>
      <LogoutButton />
    </li>
  </ul>
</template>

<style scoped>
.header-menu {
  display: flex;
  gap: 0.4rem;
}
</style>
