<template>
  <div class="spinner"></div>
</template>

<style scoped>
@keyframes rotate {
  to {
    transform: rotate(1turn);
  }
}

.spinner {
  margin: 4.8rem auto;

  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;

  /* Background logic exactly as in your React code */
  background:
    radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000) top/10px 10px no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-600));

  /* Masking for the "donut" effect */
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);

  /* Animation call */
  animation: rotate 1.5s infinite linear;
}
</style>
