<script setup>
import { useRouter } from 'vue-router'
import Heading from '@/components/Heading.vue'
import SharedButton from '@/components/SharedButton.vue'

const router = useRouter()

const moveBack = () => {
  // Equivalent to the useMoveBack hook in your React setup
  router.back()
}
</script>

<template>
  <main class="styled-page-not-found">
    <div class="box">
      <Heading as="h1"> The page you are looking for could not be found 😢 </Heading>

      <SharedButton size="large" @click="moveBack"> &larr; Go back </SharedButton>
    </div>
  </main>
</template>

<style scoped>
.styled-page-not-found {
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
}

.box {
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;
}

.box h1 {
  margin-bottom: 3.2rem;
}
</style>
