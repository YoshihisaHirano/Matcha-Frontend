<script setup lang="ts">
const username = ref("");
const password = ref("");
const error = ref("");

async function submitLoginForm() {
  error.value = "";
  const res = await useLogin(username.value, password.value);
  if (res?.message) {
    error.value = res.message;
  }
}

async function resetPassword(e: Event) {
  e.preventDefault();
  if (!username.value) {
    error.value = "Enter your username to reset your password";
    return;
  }
  const res = await useResetPassword(username.value);
  error.value = res.message;
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
      <Button :disabled="!password || !username" type="submit" variant="fancy" className="login-form-btn"
        >Log In</Button
      >
      <Button @click="resetPassword" variant="transparent">Forgot password?</Button>
    </div>
    <div class="error-msg">{{error}}</div>
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

.error-msg {
  margin-top: 1rem;
  font-weight: 500;
  color: var(--accent-red);
}
</style>
