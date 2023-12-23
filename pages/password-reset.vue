<script setup lang="ts">
import useValidate from "vue-tiny-validate";
import { useUpdatePassword } from "~/composables/useActiveUser";

definePageMeta({
  layout: "empty",
});

useSeoMeta({
  title: "Reset Password | Matcha",
});

const id = useRoute().query.id;
if (!id) {
  await navigateTo("/", { redirectCode: 301 });
}

const data = ref({
  password: "",
  repeatPassword: "",
});

const error = ref("");

const rules = ref({
  password: [
    {
      name: "password",
      test: (value: string) => value.length >= 8 && value.length <= 30,
      message: "Password must be 8 - 30 characters long",
    },
    {
      name: "password",
      test: (value: string) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/.test(
          value
        ),
      message: "Uppercase, number, special symbol required",
    },
  ],
  repeatPassword: [
    {
      name: "repeatPassword",
      test: (value: string) => value === data.value.password,
      message: "Passwords must match",
    },
  ],
});

const options = reactive({ autoTest: true, firstError: true });
const { result } = useValidate(data, rules, options);

async function resetPassword() {
  error.value = "";
  if (result.value.$errors.length) {
    return;
  }
  const res = await useUpdatePassword(id as string, data.value.password);
  if (res?.message) {
    error.value = res.message;
  }
}
</script>

<template>
  <main class="container">
    <ThemeToggle />
    <div class="content">
      <GenericForm @submit="resetPassword" className="login-form">
        <Input
          v-model="data.password"
          type="password"
          name="password"
          id="password-login"
          required
          label="Password"
          icon="lock-closed"
          withErrors
          :error="result.$messages[0]"
        />
        <Input
          v-model="data.repeatPassword"
          type="password"
          name="repeatPassword"
          id="repeatPassword-login"
          required
          label="Repeat Password"
          icon="input-checked"
        />
        <Button
          :disabled="!data.password || !data.repeatPassword"
          type="submit"
          variant="fancy"
          className="login-form-btn"
          >Reset</Button
        >
        <div class="error-msg">{{ error }}</div>
      </GenericForm>
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
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.login-form {
  width: 100%;
}

.login-form-btn {
  margin-top: 2rem;
}

.error-msg {
  margin-top: 1rem;
  font-weight: 500;
  color: var(--accent-red);
}

@media screen and (min-width: 768px) {
  .login-form {
    width: 70%;
  }
}
</style>
