<script setup lang="ts">
const formHighlighted = ref(false);

definePageMeta({
  layout: "empty",
});

useSeoMeta({
  title: "Welcome | Matcha",
});

function highlightForm() {
  formHighlighted.value = true;
  setTimeout(() => {
    formHighlighted.value = false;
  }, 2000);
}
</script>

<template>
  <header>
    <div class="logo-wrapper">
      <LogoSVG />
    </div>
    <div class="header-controls">
      <div class="link-wrapper">
        <CustomLink internal href="/login">Log In</CustomLink>
      </div>
      <div class="link-wrapper">
        <CustomLink internal href="#signup-form" @click="highlightForm">Sign Up</CustomLink>
      </div>
    </div>
  </header>
  <main>
    <section>
      <div class="hero-container">
        <div class="hero-copy-container">
          <h1 class="text-xl">
            <span class="fancy-text">Matcha:</span>
            Where Love Shines Brighter Than a Disco&nbsp;Ball
          </h1>
          <div class="hero-cta">
            <p class="text-paragraph">Already have an account? -></p>
            <CustomLink internal href="/login" class="fancy-btn"
              >Log in</CustomLink
            >
          </div>
        </div>
        <SignupForm v-bind:highlighted="formHighlighted" id="signup-form" />
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  padding: 7rem 0 0;
  position: relative;
  min-height: 100vh;
}

section {
  padding: 4rem 2rem 6rem 4rem;
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-underline-offset: 5px;
}

.hero-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.hero-copy-container h1 {
  line-height: 1.25;
  font-weight: 500;
  margin-bottom: 4.5rem;
  margin-top: 1rem;
}

.hero-copy-container p {
  margin-bottom: 1rem;
}

form {
  flex-basis: 48%;
  flex-shrink: 0;
  scroll-margin-top: 6.5rem;
}

header {
  position: fixed;
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(to left, #1a2a6c, #b21f1f, #fdbb2d);
  border-bottom: 2px solid #0000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  backdrop-filter: blur(7px);
  box-shadow: 0 0.5rem 0.3rem rgba(0, 0, 0, 0.15);
}

.header-controls {
  display: flex;
  gap: 8px;
}

.link-wrapper {
  background-color: var(--primary-background);
  border-radius: 8px;
}

.link-wrapper > * {
  background-size: 300%;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 1.5rem;
  letter-spacing: 0.03em;
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.link-wrapper:has(*:hover) {
  opacity: 0.88;
}

.link-wrapper > *:hover {
  animation: disco 3s infinite both;
}

.logo-wrapper {
  color: var(--primary-text);
  width: 189px;
  height: 70px;
}
</style>
