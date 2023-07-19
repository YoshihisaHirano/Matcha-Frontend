<script setup lang="ts">
const modalOpen = ref(false)

function openModal() {
    modalOpen.value = true;
}

function closeModal() {
    modalOpen.value = false;
}
</script>

<template>
    <Button @click="openModal" class-name="settings-btn"><span class="typicons-cog"></span></Button>
    <Modal modalTitle="User Settings" @close-modal="closeModal" :isOpen="modalOpen">
        <div class="inputs-container">
            <Input label="Change username" id="username" name="username"/>
            <Input label="Change email" id="email" name="email" type="email"/>
            <Input label="Change password" id="password" name="password" type="password"/>
        </div>
    </Modal>
</template>

<style scoped>
.settings-btn {
    background: transparent;
    padding: 0;
    font-size: 1.7rem;
}

.settings-btn:hover {
    color: var(--accent-red);
}

.inputs-container {
    padding: 1.5rem 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.inputs-container > * {
    max-width: 70%;
}
</style>