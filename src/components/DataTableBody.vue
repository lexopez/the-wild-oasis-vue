<script setup>
defineProps({
  data: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <p v-if="!data.length" class="empty">No data to show at the moment</p>

  <section v-else class="styled-body">
    <slot v-for="item in data" :key="item.id" :item="item" />
  </section>
</template>

<style scoped>
.styled-body {
  margin: 0.4rem 0;
}
.empty {
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
}
</style>
