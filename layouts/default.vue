<script setup lang="ts">
import { useActiveUser } from '~/composables/useActiveUser';

useActiveUser('aaa')
</script>
<template>
    <SidebarNav />
    <Header/>
  <main>
    <slot />
  </main>
</template>

<style scoped>
  main {
    grid-column: 2/3;
    grid-row: 2/3;
    padding: 0.5rem 0.85rem;
  }
</style>

<style>
#__nuxt {
  display: grid;
  grid-template-columns: minmax(200px, 20vw) auto;
  grid-template-rows: minmax(50px, 10%) auto;
  height: 100vh;
}
</style>
