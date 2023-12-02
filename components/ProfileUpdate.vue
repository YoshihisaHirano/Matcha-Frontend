<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { EditableUserData, LocationCoords } from "~/types/global";
import { sexPrefOptions } from "~/utils/getSexPref";

const modalOpen = ref(false);
const photoEditBtnDisabled = ref(false);
const ownBtnsDisabled = ref(false);

const store = useUserStore();

function openModal() {
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}

let userData = ref<EditableUserData | null>(null);

onMounted(() => {
  userData.value = cloneEditableData(store.userEditableData);
});

const userDataInvalid = computed(() => {
  return !isEditedDataValid(userData.value);
});

const shouldDisableBtns = computed(() => {
  return (
    ownBtnsDisabled.value ||
    userDataInvalid.value ||
    !hasUserDataChanged(userData.value, store.userEditableData)
  );
});

const mapCoords = computed(() => {
  if (!userData.value) return undefined;
  return coordsToArr(userData.value.location);
});

async function submitUpdate() {
  if (userData.value && !userDataInvalid.value) {
    ownBtnsDisabled.value = true;
    // console.log(JSON.stringify(userData.value));
    await useUpdateUser({ ...userData.value });
    ownBtnsDisabled.value = false;
  }
}

function reset() {
  userData.value = cloneEditableData(store.userCommonData);
  // closeModal();
}

async function updatePictures(pictures: string[]) {
  photoEditBtnDisabled.value = true;
  const updated = await useNewPictures(pictures, store.userPictures);
  await useUpdateUser(updated);
  userData.value = cloneEditableData(store.userCommonData);
  photoEditBtnDisabled.value = false;
}

function updateLocation(location: LocationCoords) {
  if (!userData.value) return;
  userData.value = { ...userData.value, location: { ...location } };
}
</script>

<template>
  <Button @click="openModal" variant="round" class-name="edit-btn"
    ><span class="typcn typcn-pencil"></span
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
        <div class="input-group">
          <label for="birth-date">
            <span class="date-label">Birthday</span>
            <Datepicker
              model-type="timestamp"
              :text-input="true"
              :enable-time-picker="false"
              :max-date="minus18Years()"
              name="birth-date"
              v-model="userData.dateOfBirth"
              position="left"
              :clearable="false"
              menu-class-name="custom-calendar-menu"
              input-class-name="custom-calendar-input"
            />
          </label>
          <PhotoPicker
            button-text="Open editor"
            @update-pictures="updatePictures"
            :btns-disabled="photoEditBtnDisabled"
          />
        </div>
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
        <div>
          <Input
            :is-textarea="true"
            placeholder="Please write a few words about yourself"
            name="bio"
            id="bio"
            label="Biography"
            :maxlength="300"
            v-model="userData.biography"
          ></Input>
          <WordCount
            :text="userData.biography"
            :maxlength="300"
            class-name="word-count"
          />
        </div>
      </div>
      <div class="content-right">
        <CustomMap :map-center="mapCoords" @change-location="updateLocation" />
      </div>
    </div>
    <ButtonControls
      :disabled="shouldDisableBtns"
      :disable-submit-only="userDataInvalid"
      @reset="reset"
      @submit="submitUpdate"
    />
  </Modal>
</template>

<style scoped>
.profile-edit-modal {
  width: 95vw;
  max-width: 1200px;
}

.edit-btn {
  font-size: 1.1rem;
}

.edit-modal-content {
  display: flex;
  gap: 1rem;
  padding-top: 2rem;
  flex-wrap: wrap;
}

.edit-modal-content :global(input),
.edit-modal-content :global(textarea) {
  font-weight: 400;
  font-size: 1rem;
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

.input-group > * {
  flex: 0 0 48%;
}

.date-label {
  font-size: 1.25rem;
  color: var(--primary-text);
}

.bottom-controls {
  display: flex;
  margin-left: auto;
  margin-top: 2rem;
  width: fit-content;
  gap: 0.75rem;
}

.word-count {
  text-align: right;
}

.content-right {
  width: 100%;
}

@media screen and (min-width: 820px) {
  .edit-modal-content {
    flex-wrap: nowrap;
    gap: 2rem;
  }

  .edit-modal-content > div {
    flex-basis: 49%;
  }
}

@media screen and (min-width: 1024px) {
  .profile-edit-modal {
    width: 85vw;
  }
}
</style>
