<script setup lang="ts">
definePageMeta({
  layout: "empty",
});

useSeoMeta({
  title: "Welcome | Matcha",
});

const formTabs = [
  { label: "Log In", slotName: "login" },
  { label: "Sign Up", slotName: "signup" },
];
</script>

<template>
  <main class="container">
    <ThemeToggle />
    <div class="content">
      <div class="gradient-wrapper">
        <h2>Welcome to Matcha!</h2>
        <div class="gradient gradient-1"></div>
        <div class="gradient gradient-2"></div>
        <div class="gradient gradient-3"></div>
      </div>
      <div class="forms-container">
        <Tabs :tabs="formTabs">
          <template #login>
            <LoginForm />
          </template>
          <template #signup>
            <SignupForm />
          </template>
        </Tabs>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  height: 100vh;
  padding: 0.75rem;
  grid-column: 1 / -1;
}

.content {
  display: flex;
  height: 95%;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.gradient-wrapper {
  position: relative;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.forms-container {
  width: 100%;
  position: relative;
  z-index: 2;
  padding: 1.5rem 1rem 2rem;
  border: 10px solid;
  border-image-slice: 1;
  border-width: 5px;
  border-image-source: linear-gradient(to left, #fdbb2d, #b21f1f, #1a2a6c);
  box-shadow: 0 0.5rem 0.3rem rgba(0, 0, 0, 0.15);
}

h2 {
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: center;
  position: relative;
  font-size: 2.5rem;
  z-index: 2;
  text-shadow: 2px 2px 20px var(--primary-background);
}

.gradient {
  display: none;
}

.gradient-1 {
  position: absolute;
  top: -29%;
  left: -14%;
  aspect-ratio: 1;
  width: 32vw;
  background: radial-gradient(
    circle,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 24%,
    rgba(252, 176, 69, 1) 45%,
    rgba(148, 187, 233, 0) 70%
  );
  background-blend-mode: multiply;
}

.gradient-2 {
  position: absolute;
  top: -15%;
  right: -13%;
  aspect-ratio: 1;
  width: 33vw;
  background: radial-gradient(
    circle,
    rgba(51, 51, 153, 1) 0%,
    rgba(255, 0, 204, 1) 34%,
    rgba(148, 187, 233, 0) 70%
  );
  background-blend-mode: multiply;
}

.gradient-3 {
  position: absolute;
  right: 3%;
  top: 18%;
  aspect-ratio: 1;
  width: 34vw;
  background: radial-gradient(
    circle,
    rgba(255, 106, 0, 1) 0%,
    rgba(238, 9, 121, 1) 34%,
    rgba(148, 187, 233, 0) 70%
  );
  background-blend-mode: multiply;
}

@media screen and (min-width: 768px) {
  .content {
    justify-content: center;
    padding-top: 0;
    padding-bottom: 0;
  }

  .forms-container {
    width: 80%;
  }

  .gradient-wrapper {
    aspect-ratio: 1.2;
  }

  .gradient {
    display: block;
  }
}

@media screen and (min-width: 1024px) {
  .content {
    flex-direction: row;
    max-width: 80%;
    justify-content: unset;
  }

  .gradient-wrapper {
    flex: 0 1 50%;
  }

  .forms-container {
    flex: 1 0 50%;
    padding: 2.5rem 4rem 3rem;
  }

  .container {
    overflow-y: hidden;
  }
}
</style>
