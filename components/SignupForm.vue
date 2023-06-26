<script setup lang="ts">

interface SignupFormProps {
  highlighted?: boolean
}

defineProps<SignupFormProps>()

const username = ref("");
const email = ref("");
const password = ref("");
const reapeatPassword = ref("");

async function sumbitSignupForm() {}
</script>

<template>
  <GenericForm :className="`signup-form ${highlighted ? 'highlighted' : ''}`" :fieldsetClassName="`signup-fields ${highlighted ? 'highlighted' : ''}`" @submit="sumbitSignupForm">
    <Input
      v-model="username"
      required
      class="global-form-input"
      id="username"
      name="username"
      type="text"
      label="Your name"
      icon="user"
    />
    <Input
      v-model="email"
      required
      class="global-form-input"
      type="email"
      name="email"
      id="email"
      label="Email address"
      icon="mail"
    />
    <Input
      v-model="password"
      required
      class="global-form-input"
      type="password"
      name="password"
      icon="lock"
      id="password"
      label="Password"
    />
    <Input
      v-model="reapeatPassword"
      required
      class="global-form-input"
      type="password"
      name="password-repeat"
      id="password-repeat"
      label="Repeat password"
    />
    <Button type="submit" className="fancy-btn hero-fancy-button"
      >Start your romantic journey</Button
    >
  </GenericForm>
</template>

<style>

.signup-form.highlighted {
  animation: shake 2s infinite both
}

.signup-fields.highlighted {
  animation: disco 3s infinite both
}
</style>
