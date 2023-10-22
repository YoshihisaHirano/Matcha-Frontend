<script setup lang="ts">
import logo from "~/assets/logo/matcha-logo.svg";

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const route = useRoute();

watch(
  route,
  () => {
    isOpen.value = false;
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div>
    <Button
      variant="transparent"
      :className="`menu-icon ${isOpen ? 'open' : ''}`"
      @click="toggleMenu"
    >
      <img :src="logo" alt="Matcha icon" />
    </Button>
    <nav v-if="isOpen" :class="{ open: isOpen }">
      <ul class="menu">
        <li
          v-for="link in navLinks"
          :class="{ active: $route.path === link.href }"
        >
          <CustomLink className="navbar-link" internal :href="link.href">
            <span :class="['typcn-' + link.icon]">{{ link.title }} </span>
          </CustomLink>
        </li>
      </ul>
      <footer>
        <span> Made by </span>
        <CustomLink
          target="_blank"
          href="https://profile.intra.42.fr/users/aalannys"
          className="footer-link"
          >aalannys</CustomLink
        >
        <span>&</span>
        <CustomLink
          className="footer-link"
          target="_blank"
          href="https://profile.intra.42.fr/users/jhizdahr"
          >jhizdahr
        </CustomLink>
      </footer>
    </nav>
  </div>
</template>

<style scoped>
.menu-icon {
  max-width: 3rem;
  z-index: 11;
  position: relative;
}

.nav-container {
  position: relative;
}

nav {
  left: 0;
  right: 0;
  position: absolute;
  background-color: var(--mobile-menu-bg);
  z-index: 10;
  top: 0;
  bottom: 0;
}

.menu {
  padding: 5rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}

.menu li {
  padding: 1rem;
  width: 90%;
  font-size: 1.75rem;
}

.menu a {
  text-decoration: none;
  color: var(--text-white);
}

li.active,
li:has(a:hover) {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
}

[class*="typcn-"]:before {
  margin-right: 0.65rem;
}

:global(.dark-theme .menu-icon),
.menu-icon.open {
  filter: invert(1);
}

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
  font-size: 1.25rem;
}

footer,
.footer-link {
  color: var(--text-white);
}

@media screen and (min-width: 768px) {
  .menu,
  .menu-icon {
    display: none;
  }
}
</style>

<style>
body:has(nav.open) {
  overflow: hidden;
}
</style>
