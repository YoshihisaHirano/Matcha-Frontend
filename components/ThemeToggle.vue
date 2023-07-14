<script setup lang="ts">
const darkTheme = ref(false);

onMounted(() => {
  let userTheme = localStorage.getItem("theme");
  const root = document.documentElement;
  if (userTheme) {
    darkTheme.value = userTheme === "dark";
  } else {
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    userTheme = userPrefersDark ? "dark" : "light";
  }
  if (userTheme === 'dark') {
    root.classList.add("dark-theme");
  }
});

function toggleTheme(e: Event) {
  const root = document.documentElement;
  root.classList.toggle("light-theme");
  root.classList.toggle("dark-theme");
  const target = e.target as HTMLInputElement;
  localStorage.setItem("theme", target.checked ? "dark" : "light");
}
</script>

<template>
  <label class="theme-toggle">
    <input @change="toggleTheme" type="checkbox" :checked="darkTheme" />
    <span class="toggle-slide">
      <img src="~/assets/icons/moon.svg" alt="" />
      <img src="~/assets/icons/sun.svg" alt="" />
    </span>
  </label>
</template>

<style scoped>
label.theme-toggle {
  display: block;
  position: relative;
  height: 2rem;
  width: 3.8rem;
  cursor: pointer;
}

span.toggle-slide {
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border-radius: 1rem;
  padding: 0.15rem;
  background: var(--primary-gradient-reverse);
  border: 1px solid var(--gray-stroke);
}

span.toggle-slide::before {
  content: "";
  position: absolute;
  left: 0.15rem;
  top: 50%;
  transform: translateY(-50%);
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 1.6rem;
  background: var(--primary-background);
  transition: all 0.2s ease-in-out;
  box-shadow: 5px -6px 6px -4px rgba(0, 0, 0, 0.5) inset;
}

input[type="checkbox"]:checked + span.toggle-slide::before {
  transform: translateY(-50%) translateX(110%);
  box-shadow: 5px -6px 6px -4px rgba(255, 255, 255, 0.5) inset;
}

span.toggle-slide img {
  max-width: 25px;
}

input[type="checkbox"] {
  visibility: hidden;
  position: absolute;
}
</style>
