<script setup lang="ts">
const username = ref("");
const password = ref("");

async function submitLoginForm() {
  console.log(username.value, password.value);
}

function resetPassword(e: Event) {
  e.preventDefault();
}
</script>

<template>
  <GenericForm @submit="submitLoginForm" className="login-form">
    <Input
      v-model="username"
      type="text"
      name="username"
      id="username-login"
      required
      label="Username"
      icon="user"
      withErrors
    />
    <Input
      v-model="password"
      type="password"
      name="password"
      id="password-login"
      required
      label="Password"
      icon="lock-closed"
      withErrors
    />
    <div class="bottom-controls">
      <Button type="submit" @click="submitLoginForm" variant="fancy" className="login-form-btn"
        >Log In</Button
      >
      <Button @click="resetPassword" variant="transparent">Forgot password?</Button>
    </div>
  </GenericForm>
</template>

<style scoped>
.login-form {
  width: 100%;
  max-width: 800px;
}

.bottom-controls {
  display: flex;
  gap: .75rem;
  align-items: center;
  justify-content: space-between;
}

.login-form-btn {
  flex-basis: 60%;
}
</style>
