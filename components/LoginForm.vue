<script setup lang="ts">
const email = ref("");
const password = ref("");

async function submitLoginForm() {
  console.log(email.value, password.value);
}
</script>

<template>
  <GenericForm @submit="submitLoginForm" className="login-form">
      <h2 class="text-xl">Welcome to <span class="fancy-text">Matcha</span></h2>
      <Input
        v-model="email"
        type="email"
        name="email"
        id="email-login"
        required
        label="Email"
        icon="mail"
      />
      <Input
        v-model="password"
        type="password"
        name="password"
        id="password-login"
        required
        label="Password"
        icon="lock"
      />
      <a href="">Forgot password?</a>
      <Button type="submit" @click="submitLoginForm" class="fancy-btn hero-fancy-button"
        >Log In</Button
      >
    </GenericForm>
</template>

<style scoped>
.login-form {
  width: 100%;
  max-width: 800px;
}

h2 {
  margin-bottom: 1rem;
  font-weight: 400;
}

a {
  display: block;
  width: fit-content;
  margin-left: auto;
  margin-top: 0.75rem;
}
</style>
