<script setup>
defineProps({
  title: String,
  value: [String, Number],
  color: String,
})
</script>

<template>
  <div class="styled-stat">
    <div class="icon" :style="{ '--stat-color': color }">
      <slot name="icon" />
    </div>
    <h5 class="title">{{ title }}</h5>
    <p class="value">{{ value }}</p>
  </div>
</template>

<style scoped>
.styled-stat {
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
}

.icon {
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Uses the --stat-color variable set in the template */
  background-color: var(--color-current-100, var(--color-grey-100));
  background-color: var(--color-v-bind(color + '-100')); /* Alternative Vue 3.2+ syntax */

  /* Standard mapping to your global design system variables */
  background-color: v-bind('`var(--color-${color}-100)`');
}

.icon :deep(svg) {
  width: 3.2rem;
  height: 3.2rem;
  color: v-bind('`var(--color-${color}-700)`');
}

.title {
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
}

.value {
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;
}
</style>
