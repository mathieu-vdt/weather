<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/partials/Navbar.vue'
</script>

<template>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vw;
}

@media (min-width: 1024px) {
}
</style>
