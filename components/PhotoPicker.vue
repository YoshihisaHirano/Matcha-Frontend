<script setup lang="ts">
interface PhotoPickerProps {
  buttonText?: string;
}

defineProps<PhotoPickerProps>();

const modalOpen = ref(false);

function openModal() {
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}
</script>

<template>
  <div class="wrapper">
    <span class="label">Photos</span>
    <Button @click="openModal" class-name="photo-picker-btn-large"
      >{{ buttonText || "Edit photos" }}
      <span class="typicons-edit"></span>
    </Button>
</div>
  <Modal :modalTitle="buttonText || 'Edit photos'"
    @close-modal="closeModal"
    :isOpen="modalOpen">
    Hello
  </Modal>
</template>

<style scoped>
.label {
  display: block;
  font-size: 1.25rem;
  color: var(--primary-text);
  width: 100%;
}

.photo-picker-btn-large {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 0.35rem 1rem;
  color: var(--primary-text);
  background-color: var(--input-bg);
  font-size: 1rem;
  font-weight: 500;
  filter: brightness(.98);
}

.photo-picker-btn-large:hover {
    filter: brightness(.96);
}

.photo-picker-btn-large > span::before {
    line-height: 1;
    color: var(--accent-red);
}

.wrapper {
    width: 100%;
}
</style>
