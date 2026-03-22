<template>
  <footer class="footer">
    <slot />
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;
}

/* Replicating the :has(*) logic for empty footers */
.footer:empty {
  display: none;
}
</style>
