<script setup>
defineProps({ icon: String, label: String })
</script>
<template>
  <div class="data-item">
    <span class="label">
      <!-- <component :is="icon" v-if="icon"></component> -->
      <slot name="icon" />
      <span>{{ label }}</span>
    </span>
    <slot />
  </div>
</template>

<style>
.data-item {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
}

.label {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
}
</style>
