<script setup lang="ts">
interface LinkProps {
  internal?: boolean;
  className?: string;
  href: string;
}

withDefaults(defineProps<LinkProps>(), {
  internal: false,
  className: "",
});
</script>

<template>
  <NuxtLink :class="`custom-link ${className}`" :href="href" v-if="internal" >
    <slot />
  </NuxtLink>
  <a v-else :class="`custom-link ${className}`" :href="href">
    <slot />
  </a>
</template>

<style scoped>
.custom-link {
  display: block;
  cursor: pointer;
  border: none;
  box-shadow: none;
  display: block;
  text-decoration: none;
  color: var(--primary-text);
}

.custom-link.fancy-btn {
    color: #FFF;
}

.custom-link:hover,
.custom-link:active {
  text-decoration: none;
}
</style>
