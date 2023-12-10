<script setup lang="ts">
import useValidate from "vue-tiny-validate";
import { SignupUserData } from "~/types/global";

interface SignupFormProps {
  highlighted?: boolean;
}

defineProps<SignupFormProps>();

const initialState: SignupUserData & { repeatPassword: string } = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const data = ref({ ...initialState });
const formError = ref("");

const rules = ref({
  username: [
    {
      name: "username",
      test: (value: string) => value.length >= 3 && value.length <= 30,
      message: "Username must be 3 - 30 characters long",
    },
    {
      name: "username",
      test: (value: string) => /^[a-zA-Z0-9_]+$/.test(value),
      message: "Only letters, numbers and underscores",
    },
    {
      name: 'username',
      test: async (value: string) => {
        const res = await useCheckUsername(value);
        if (typeof res === 'object') {
          return false;
        }
        return res === false;
      },
      message: 'Username is already taken',
    }
  ],
  email: [
    {
      name: "email",
      test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Email is invalid",
    },
  ],
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
  firstName: [
    {
      name: "firstName",
      test: (value: string) => value.length >= 1 && value.length <= 30,
      message: "First name must be 1 - 30 characters long",
    },
    {
      name: "firstName",
      test: (value: string) => /^[a-z\-A-Z]+$/.test(value),
      message: "Only letters and hyphen",
    },
  ],
  lastName: [
    {
      name: "lastName",
      test: (value: string) => value.length >= 1 && value.length <= 30,
      message: "Last name must be 1 - 30 characters long",
    },
    {
      name: "lastName",
      test: (value: string) => /^[a-z\-A-Z]+$/.test(value),
      message: "Only letters and hyphen",
    },
  ],
});

const options = reactive({ autoTest: true, firstError: true });
const { result } = useValidate(data, rules, options);

const messages = ref({ ...initialState });

async function sumbitSignupForm() {
  result.value.$test();
if (result.value.$errors.length) {
  const errors: Array<{ name: keyof typeof initialState; message: string }> =
    unref(result.value.$errors);
  const unrefMessages = unref(messages);
  for (const key of Object.keys(unrefMessages)) {
    if (errors.findIndex((item) => item.name === key) === -1) {
      //@ts-ignore
      messages.value[key] = "";
    }
  }
  for (const error of errors) {
    const name = error.name;
    //@ts-ignore
    messages.value[name] = error.message;
  }
  } else {
    let signupData = { ...data.value } as any;
    delete signupData.repeatPassword;
    const res = await useRegister(signupData);
    if (res?.message) {
      formError.value = res.message;
    }
  }
}
</script>

<template>
  <GenericForm
    :className="`signup-form ${highlighted ? 'highlighted' : ''}`"
    :fieldsetClassName="`signup-fields ${highlighted ? 'highlighted' : ''}`"
    @submit="sumbitSignupForm"
  >
    <div class="input-group">
      <Input
        v-model="data.firstName"
        required
        class="global-form-input"
        id="firstName"
        name="firstName"
        type="text"
        label="First name"
        icon="business-card"
        :error="messages.firstName"
        withErrors
      />
      <Input
        v-model="data.lastName"
        required
        class="global-form-input"
        id="lastName"
        name="lastName"
        type="text"
        label="Last name"
        icon="contacts"
        :error="messages.lastName"
        withErrors
      />
    </div>
    <div class="input-group">
      <Input
        v-model="data.username"
        required
        class="global-form-input"
        id="username"
        name="username"
        type="text"
        label="Username"
        icon="user"
        :error="messages.username"
        withErrors
      />
      <Input
        v-model="data.email"
        required
        class="global-form-input"
        type="email"
        name="email"
        id="email"
        label="Email address"
        icon="mail"
        :error="messages.email"
        withErrors
      />
    </div>
    <div class="input-group">
      <Input
        v-model="data.password"
        required
        class="global-form-input"
        type="password"
        name="password"
        icon="key-outline"
        id="password"
        label="Password"
        :error="messages.password"
        withErrors
      />
      <Input
        v-model="data.repeatPassword"
        required
        class="global-form-input"
        type="password"
        name="password-repeat"
        id="password-repeat"
        label="Repeat password"
        icon="key"
        :error="messages.repeatPassword"
        withErrors
      />
    </div>
    <Button type="submit" variant="fancy">Start your romantic journey</Button>
    <div class="error-msg">{{formError}}</div>
  </GenericForm>
</template>

<style>
.input-group {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

@media screen and (min-width: 768px) {
  .input-group {
    flex-direction: row;
    gap: 1rem;
  }
}

.error-msg {
  margin-top: 1rem;
  font-weight: 500;
  color: var(--accent-red);
}
</style>
