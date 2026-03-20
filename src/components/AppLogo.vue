<script setup>
const isDarkMode = false
const src = isDarkMode ? '/logo-dark.png' : '/logo-light.png'
</script>
<template>
  <div class="logo">
    <img :src="src" alt="Logo" class="img" />
  </div>
</template>

<style scoped>
.logo {
  text-align: center;
}

.img {
  height: 9.6rem;
  width: auto;
}
</style>
