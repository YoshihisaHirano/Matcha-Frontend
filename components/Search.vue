<script setup lang="ts">
import magnifier from "~/assets/icons/magnifier.svg";
</script>

<template>
  <label for="search">
    <input id="search" type="text" placeholder="Search for a place" />
    <img :src="magnifier" alt="" />
  </label>
</template>

<style scoped>
label {
  display: flex;
  gap: .5rem;
  color: var(--gray-stroke);
}

input {
  display: block;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 0.35rem 1rem;
  color: var(--primary-text);
  background-color: var(--input-bg);
  max-width: 100%;
}
</style>
