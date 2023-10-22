<script setup lang="ts">
import { navLinks } from "~/utils/navLinks";

const largerScreen = useMediaQuery("(min-width: 1024px)");
</script>

<template>
  <nav>
    <div class="logo-wrapper">
      <LogoSVG :small="!largerScreen" />
    </div>
    <ul>
      <li
        v-for="link in navLinks"
        :class="{ active: $route.path === link.href }"
      >
        <CustomLink className="navbar-link" internal :href="link.href">
          <span :class="['typcn-' + link.icon]">
            <span :class="{ hidden: !largerScreen }">{{ link.title }}</span>
          </span>
        </CustomLink>
      </li>
    </ul>
    <footer :class="{ hidden: !largerScreen }">
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
</template>

<style scoped>
li {
  font-size: 1.75rem;
  padding: 0.2rem 0.35rem;
}

li:not(:last-child) {
  margin-bottom: 1rem;
}

li.active,
li:has(a:hover) {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
}

li:has(a:hover) {
  background-color: rgba(248, 203, 203, 0.07);
}

.navbar-link {
  display: block;
  width: fit-content;
  margin: 0 auto;
}

.footer-link,
.navbar-link {
  color: var(--primary-background);
  font-weight: 400;
}

[class*="typcn-"]:before {
  color: var(--primary-background);
}

ul {
  padding: 2rem 1rem 0;
}

nav {
  display: none;
  background: var(--accent-gradient);
  background-size: 150%;
  grid-row: 1/3;
  grid-column: 1/2;
  position: relative;
}

.logo-wrapper {
  color: var(--primary-background);
  max-width: 270px;
  padding: 1rem 0.75rem;
}

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  color: var(--primary-background);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
}

.hidden {
  display: none;
}

@media screen and (min-width: 768px) {
  nav {
    display: block;
  }
}

@media screen and (min-width: 1024px) {
  [class*="typcn-"]:before {
    margin-right: 0.65rem;
  }

  .logo-wrapper {
    padding: 2rem 0.75rem;
  }

  .navbar-link {
    width: 100%;
  }
}
</style>
