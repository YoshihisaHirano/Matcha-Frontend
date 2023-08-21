<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { CommonUserData } from "~/types/global";

const modalOpen = ref(false);

function openModal() {
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}

let userData = ref<CommonUserData | null>(null);

const sexPrefOptions = ["men", "women", "both"];

onMounted(() => {
  const userInfo = useUserStore().userCommonData;
  userData.value = userInfo;
});
</script>

<template>
  <Button @click="openModal" class-name="edit-btn"
    ><span class="typicons-write"></span
  ></Button>
  <Modal
    modalTitle="Edit your profile"
    @close-modal="closeModal"
    :isOpen="modalOpen"
    class-name="profile-edit-modal"
  >
    <div v-if="userData" class="edit-modal-content">
      <div class="content-left">
        <div class="input-group">
          <Input
            v-model="userData.firstName"
            name="first-name"
            id="first-name"
            label="First name"
          ></Input>
          <Input
            v-model="userData.lastName"
            name="last-name"
            id="last-name"
            label="Last name"
          ></Input>
        </div>
        <label for="birth-date">
          <span class="date-label">Birthday</span>
          <Datepicker
            :text-input="true"
            :enable-time-picker="false"
            :max-date="minus18Years()"
            name="birth-date"
            v-model="userData.dateOfBirth"
            position="left"
            :clearable="false"
          />
        </label>
        <div class="input-group">
          <Dropdown
            :options="sexPrefOptions"
            v-model="userData.sexPref"
            label="Sex preference"
          />
          <Dropdown
            :options="Object.keys(genderIcons)"
            v-model="userData.gender"
            label="Gender"
          />
        </div>
        <Input
          :is-textarea="true"
          name="bio"
          id="bio"
          label="Biography"
          v-model="userData.biography"
        ></Input>
      </div>
      <div>
        <CustomMap
          :map-center="[
            Number(userData.location.lon),
            Number(userData.location.lat),
          ]"
        />
      </div>
    </div>
    <div class="bottom-controls">
      <Button class-name="reset-btn">Reset</Button>
      <Button class-name="submit-btn">Submit</Button>
    </div>
  </Modal>
</template>

<style scoped>
.profile-edit-modal {
  width: 85vw;
  max-width: 1200px;
}

.edit-btn {
  background: transparent;
  border: 1px solid var(--accent-red);
  border-radius: 50%;
  margin: 0;
  font-size: 1.3rem;
  line-height: 1;
  font-weight: 400;
  color: var(--accent-red);
  padding: 2px 5px;
}

.edit-btn:hover {
  outline: 1px solid var(--accent-red);
  font-weight: 500;
}

.edit-modal-content {
  display: flex;
  gap: 2rem;
  padding-top: 2rem;
}

.edit-modal-content :global(input),
.edit-modal-content :global(textarea) {
  font-weight: 400;
  font-size: 1rem;
}

.edit-modal-content > div {
  flex-basis: 49%;
}

.content-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  gap: 1rem;
}

.date-label {
  font-size: 1.25rem;
  color: var(--primary-text);
}

.submit-btn {
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-size: 1.25rem;
  margin-top: 1rem;
  background: var(--accent-red);
  color: var(--text-white);
  font-weight: 700;
}

.bottom-controls {
  display: flex;
  margin-left: auto;
  margin-top: 2rem;
  width: fit-content;
}
</style>
