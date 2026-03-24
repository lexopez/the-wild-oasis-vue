<template>
  <div class="button-group">
    <slot />
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
}
</style>
