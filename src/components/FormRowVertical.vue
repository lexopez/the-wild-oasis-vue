<script setup>
defineProps({ label: String, error: String, id: String })
</script>
<template>
  <div class="form-row">
    <label :for="id" v-if="label" class="label">{{ label }}</label>
    <slot />
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<style>
.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
}

.label {
  font-weight: 500;
}

.error {
  font-size: 1.4rem;
  color: var(--color-red-700);
}
</style>
