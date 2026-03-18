<script setup>
defineProps({
  type: {
    type: String,
    default: "vertical",
    validator: (value) => ["horizontal", "vertical"].includes(value),
  },
});
</script>

<template>
  <div :class="['row', type]">
    <slot />
  </div>
</template>

<style scoped>
.row {
  display: flex;
}

/* Horizontal variation */
.horizontal {
  justify-content: space-between;
  align-items: center;
}

/* Vertical variation */
.vertical {
  flex-direction: column;
  gap: 1.6rem;
}
</style>
