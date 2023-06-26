<script setup lang="ts">
const links = [
  { href: "/search", title: "Search", icon: "world" },
  { href: "/chats", title: "Chats", icon: "message" },
  { href: "/likes", title: "Likes", icon: "heart" },
  { href: "/history", title: "History", icon: "list" },
];
</script>

<template>
  <nav>
    <header class="logo-wrapper">
      <LogoSVG />
    </header>
    <ul>
      <li v-for="link in links">
        <NuxtLink :href="link.href">
          <span :class="['typicons-' + link.icon]">{{ link.title }}</span>
        </NuxtLink>
      </li>
    </ul>
    <footer>
      Made with by&thinsp;<a
        target="_blank"
        href="https://profile.intra.42.fr/users/aalannys"
        >aalannys</a
      >
      &nbsp;&&nbsp;
      <a target="_blank" href="https://profile.intra.42.fr/users/jhizdahr"
        >jhizdahr
      </a>
    </footer>
  </nav>
</template>

<style scoped>
li {
  list-style: none;
  font-size: 1.75rem;
}

li a,
.author-link {
  color: #fffff0;
  text-decoration: none;
}

[class*="typicons-"]:before {
  color: #fffff0;
  margin-right: 0.65rem;
}

ul {
  padding: 2rem 1rem 0;
}

nav {
  background: var(--accent-gradient);
  background-size: 150%;
  position: relative;
}

.logo-wrapper {
  color: var(--primary-background);
  width: 270px;
  padding: 2rem 0.75rem;
}

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  color: var(--primary-background);
  display: flex;
  justify-content: center;
}
</style>
