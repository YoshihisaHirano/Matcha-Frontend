<script setup lang="ts">
interface ModalProps {
  isOpen?: boolean;
  modalTitle?: string;
  className?: string;
}

const props = defineProps<ModalProps>();

const dialogRef = ref<HTMLDialogElement | null>(null);

watch(
  () => props.isOpen,
  () => {
    if (props.isOpen && dialogRef.value && !dialogRef.value.open) {
      dialogRef.value.showModal();
    } else if (!props.isOpen && dialogRef.value && dialogRef.value.open) {
      dialogRef.value.close();
    }
  }
);

const emits = defineEmits(["close-modal"]);

function closeModal() {
  dialogRef?.value?.close();
  emits("close-modal");
}
</script>

<template>
  <dialog
    @close="closeModal"
    :class="`dialog-box ${className || ''}`"
    ref="dialogRef"
  >
    <Button class-name="close-modla-btn" @click="closeModal">x</Button>
    <h2 class="modal-title" v-if="modalTitle">{{ modalTitle }}</h2>
    <slot />
  </dialog>
</template>

<style scoped>
.dialog-box {
  margin: 0;
  padding: 1.5rem 1.4rem 2.25rem;
  border: 2px solid var(--accent-red);
  border-radius: 0.75rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--primary-background);
  position: relative;
  width: 95vw;
  max-width: 950px;
}

.dialog-box::backdrop {
  background: url("~/assets/images/pattern-light.svg");
  background-color: rgba(5, 5, 5, 0.75);
  backdrop-filter: blur(5px);
}

.close-modla-btn {
  position: absolute;
  padding: 0;
  padding-bottom: 0.1rem;
  width: 1.5rem;
  height: 1.5rem;
  top: 0.5rem;
  right: 0.5rem;
  border-radius: 50%;
  line-height: 1;
  color: var(--accent-red);
  background: transparent;
  border: 2px solid var(--accent-red);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.close-modla-btn:hover {
  border-width: 3px;
}

.modal-title {
  font-weight: 400;
  color: var(--primary-text);
}

@media screen and (min-width: 768px) {
  .dialog-box {
    width: 75vw;
  }
}
</style>
