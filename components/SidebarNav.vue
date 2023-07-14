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
    <div class="logo-wrapper">
      <LogoSVG />
    </div>
    <ul>
      <li v-for="link in links">
        <CustomLink className="navbar-link" internal :href="link.href">
          <span :class="['typicons-' + link.icon]">{{ link.title }}</span>
        </CustomLink>
      </li>
    </ul>
    <footer>
      Made by&thinsp;<CustomLink
        target="_blank"
        href="https://profile.intra.42.fr/users/aalannys"
        className="navbar-link" 
        >aalannys</CustomLink
      >
      &nbsp;&&nbsp;
      <CustomLink className="navbar-link" target="_blank" href="https://profile.intra.42.fr/users/jhizdahr"
        >jhizdahr
      </CustomLink>
    </footer>
  </nav>
</template>

<style scoped>
li {
  list-style: none;
  font-size: 1.75rem;
}

li:not(:last-child) {
  margin-bottom: 1rem;
}

.navbar-link {
  color: var(--primary-background);
  font-weight: 400;
}

[class*="typicons-"]:before {
  color: var(--primary-background);
  margin-right: 0.65rem;
}

ul {
  padding: 2rem 1rem 0;
}

nav {
  background: var(--accent-gradient);
  background-size: 150%;
  grid-row: 1/3;
  grid-column: 1/2;
  position: relative;
}

.logo-wrapper {
  color: var(--primary-background);
  max-width: 270px;
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
