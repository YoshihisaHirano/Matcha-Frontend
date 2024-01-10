<script setup lang="ts">
interface VerifyEmailProps {
  userId?: string;
}

const props = defineProps<VerifyEmailProps>();

const message = ref("");

async function resendEmail() {
  if (props.userId) {
    const res = await useResendEmail(props.userId);
    if (res.message) {
      message.value = res.message;
    }
  }
}
</script>

<template>
  <div class="verify-email-container">
    <div class="verify-email">
      <h1>Please verify your email</h1>
      <p>
        We have sent you an email with a link to verify your account. If you
        haven't received it, please check your spam folder or click the button
        below to resend it. If you confirmed your email, try to refresh the page.
      </p>
      <Button variant="primary" @click="resendEmail">
        Resend verification email
      </Button>
    </div>
    <p class="resend-msg">
      {{ message }}
    </p>
  </div>
</template>

<style scoped>
.verify-email-container {
  padding-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.verify-email {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.verify-email p {
  max-width: 70%;
  text-align: center;
  margin-bottom: 2rem;
}

.resend-msg {
  color: var(--accent-red);
  font-weight: 500;
  margin-top: 1rem;
}
</style>
