<script setup lang="ts">
const modalOpen = ref(false);

function openModal() {
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}
</script>

<template>
  <Button @click="openModal" class-name="settings-btn"
    ><span class="typicons-cog"></span
  ></Button>
  <Modal
    modalTitle="User Settings (danger zone)"
    @close-modal="closeModal"
    :isOpen="modalOpen"
  >
    <div class="inputs-container">
      <div>
        <Input label="Change email" id="email" name="email" type="email" />
        <Button class-name="submit-btn">Submit</Button>
        <Tooltip class-name="email-reset-tooltip" tooltip-position="right" :activeOnHover="true"
          ><p>
            You will need to verify your email again if you change it
          </p></Tooltip
        >
      </div>
      <div>
        <Input label="Change username" id="username" name="username" /><Button
          class-name="submit-btn"
          >Submit</Button
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
  color: var(--primary-text);
}

.settings-btn:hover {
  color: var(--accent-red);
}

.inputs-container {
  padding: 1.5rem 0 1rem;
  display: grid;
  grid-template-columns: 52% 42%;
  grid-template-rows: repeat(2, 1fr);
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
  grid-column: 2/3;
  grid-row: 1/3;
  align-self: center;
}

.submit-btn {
  padding: 0.35rem 1rem;
  align-self: flex-end;
  position: relative;
  left: -0.7rem;
}

.inputs-container > div {
  display: flex;
  align-items: center;
  grid-column: 1/2;
}

.inputs-container > div:last-of-type {
  grid-row: 2/3;
}

:global(.email-reset-tooltip) {
  margin-top: 1.5rem;
  margin-left: 0.25rem;
}
</style>
