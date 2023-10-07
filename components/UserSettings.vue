<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";

const store = useUserStore();

const modalOpen = ref(false);

function openModal() {
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}

const settings = computed(() => store.userSettings);
const email = ref(settings.value?.email);
const username = ref(settings.value?.username);

const emailChanged = computed(() => email.value !== settings.value?.email);
const usernameChanged = computed(
  () => username.value !== settings.value?.username
);

const largerScreen = useMediaQuery("(min-width: 1024px)");
</script>

<template>
  <Button @click="openModal" class-name="settings-btn"
    ><span class="typcn typcn-cog"></span
  ></Button>
  <Modal
    modalTitle="User Settings (danger zone)"
    @close-modal="closeModal"
    :isOpen="modalOpen"
  >
    <div class="inputs-container">
      <div>
        <Input
          label="Change email"
          id="email"
          name="email"
          type="email"
          v-model="email"
        />
        <Button :disabled="!emailChanged" class-name="submit-btn"
          >Submit</Button
        >
        <Tooltip
          class-name="email-reset-tooltip"
          :tooltip-position="largerScreen ? 'right' : 'left'"
          :activeOnHover="true"
          ><p>
            You will need to verify your email again if you change it
          </p></Tooltip
        >
      </div>
      <div>
        <Input
          label="Change username"
          id="username"
          name="username"
          v-model="username"
        /><Button class-name="submit-btn" :disabled="!usernameChanged"
          >Submit</Button
        ><Tooltip
          class-name="email-reset-tooltip"
          :tooltip-position="largerScreen ? 'right' : 'left'"
          :activeOnHover="true"
          ><p>Username must be unique</p></Tooltip
        >
      </div>
      <Button class-name="reset-pswd-btn"> Reset password </Button>
    </div>
  </Modal>
</template>

<style scoped>
.settings-btn {
  background: transparent;
  padding: 0;
  font-size: 1.7rem;
  line-height: 1;
  color: var(--primary-text);
}

.settings-btn:hover {
  color: var(--accent-red);
}

.inputs-container {
  padding: 1.5rem 0 1rem;
  display: grid;
  column-gap: 1.5rem;
  row-gap: 1.5rem;
}

.reset-pswd-btn,
.submit-btn {
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-size: 1.25rem;
  margin-top: 1rem;
  background: var(--accent-red);
  color: var(--text-white);
  font-weight: 700;
}

.reset-pswd-btn:hover {
  animation: disco 3s infinite both;
}

.reset-pswd-btn {
  padding: 0.55rem 1.2rem;
  align-self: center;
}

.submit-btn {
  padding: 0.35rem 1rem;
  align-self: flex-end;
  position: relative;
  left: -0.7rem;
}

.submit-btn:hover:not(:disabled) {
  filter: brightness(120%);
}

.inputs-container > div {
  display: flex;
  align-items: center;
}

:global(.email-reset-tooltip) {
  margin-top: 1.5rem;
  margin-left: 0.25rem;
}

@media screen and (min-width: 1024px) {
  .inputs-container {
    grid-template-columns: 52% 42%;
    grid-template-rows: repeat(2, 1fr);
  }

  .inputs-container > div {
    grid-column: 1/2;
  }

  .inputs-container > div:last-of-type {
    grid-row: 2/3;
  }

  .reset-pswd-btn {
    grid-column: 2/3;
    grid-row: 1/3;
  }
}
</style>
