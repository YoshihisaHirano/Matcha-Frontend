<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";

interface PhotoPickerProps {
  buttonText?: string;
  isSmall?: boolean;
  className?: string;
  btnsDisabled?: boolean;
  label?: string;
  closeOnSubmit?: boolean;
}

const props = defineProps<PhotoPickerProps>();
const emits = defineEmits(["updatePictures", "reset"]);
const store = useUserStore();

const userPics = computed(() => {
  return store.userPictures || [];
});

const updatedPictures = ref([...userPics.value]);
const mainImage = ref(userPics.value[0]);
const uploadErr = ref(false);
const modalOpen = ref(false);

const shouldDisableBtn = computed(() => {
  return (
    props.btnsDisabled ||
    (areStringArraysEqual(userPics.value, updatedPictures.value) &&
      mainImage.value === userPics.value[0])
  );
});

function openModal() {
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}

function chooseMainImage(pic: string) {
  mainImage.value = pic;
}

async function handleImageInput(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target.files || !target.files[0]) return;
  const res = await handleFile(target.files[0]);
  if (res) addImage(res as string);
  else setUploadErr();
}

function setUploadErr() {
  uploadErr.value = true;
  setTimeout(() => {
    uploadErr.value = false;
  }, 2000);
}

function addImage(data: string) {
  updatedPictures.value = [...updatedPictures.value, data];
  if (!mainImage.value) {
    mainImage.value = data;
  }
}

function removeImage(img: string, event: Event) {
  updatedPictures.value = updatedPictures.value.filter((item) => item !== img);
  if (img === mainImage.value) {
    mainImage.value = updatedPictures.value[0];
  }
  event.stopPropagation();
}

function reset() {
  updatedPictures.value = [...userPics.value];
  mainImage.value = userPics.value[0];
  emits("reset");
  closeModal();
}

function submitChanges() {
  const pics = updatedPictures.value.filter((item) => item !== mainImage.value);
  emits("updatePictures", [mainImage.value, ...pics]);
  if (props.closeOnSubmit) {
    closeModal();
  }
}

function refreshValues() {
  updatedPictures.value = [...userPics.value];
  mainImage.value = userPics.value[0];
}

watch(() => userPics.value, refreshValues);
</script>

<template>
  <Button
    :class-name="`${className || ''}`"
    @click="openModal"
    v-if="isSmall"
    variant="transparent"
    ><span class="typcn-edit"></span
  ></Button>
  <div v-else :class="`${className || ''} wrapper`">
    <span class="label">{{ label || "Photos" }}</span>
    <Button @click="openModal" class-name="photo-picker-btn-large"
      >{{ buttonText || "Edit photos" }}
      <span class="typcn-edit"></span>
    </Button>
  </div>
  <Modal modalTitle="Edit photos" @close-modal="closeModal" :isOpen="modalOpen">
    <div class="modal-content">
      <div class="main-image-wrapper">
        <p class="label">Main image</p>
        <FramedImage
          class-name="main-image"
          :src="mainImage"
          alt="User's main image"
        />
      </div>
      <div class="gallery">
        <p class="label">Gallery</p>
        <FramedImage
          v-for="pic in updatedPictures"
          :class-name="`gallery-picture ${
            pic === mainImage ? 'highlighted' : ''
          }`"
          :src="pic"
          :alt="
            pic !== mainImage ? 'An image from the gallery' : 'The main image'
          "
          @click="chooseMainImage"
        >
          <Button
            @click="(event) => removeImage(pic, event)"
            class-name="delete-pic-btn"
            variant="transparent"
            ><span class="typcn typcn-trash"></span
          ></Button>
        </FramedImage>
        <Dropzone
          :accepted-file-types="['image/png', 'image/jpeg']"
          :class="`add-photo ${uploadErr ? 'error' : ''}`"
          v-if="updatedPictures.length < 5"
          @drop-event="addImage"
          @drop-error="setUploadErr"
        >
          <label class="upload-image-label" for="upload-image">
            <Tooltip active-on-hover>
              <template #icon
                ><span :class="`typcn-${uploadErr ? 'cancel' : 'plus'}`"></span
              ></template>
              <p>JPEG and PNG images up to 2Mb</p>
            </Tooltip>
            <span v-if="uploadErr">Upload failed</span>
            <span v-else>Drop or select a file</span>
            <input
              accept=".png,.jpg,.jpeg"
              class="visually-hidden"
              id="upload-image"
              type="file"
              @change="handleImageInput"
            />
          </label>
        </Dropzone>
      </div>
    </div>
    <ButtonControls
      :disabled="shouldDisableBtn"
      @reset="reset"
      @submit="submitChanges"
    />
  </Modal>
</template>

<style scoped>
.label {
  display: block;
  font-size: 1.25rem;
  color: var(--primary-text);
  width: 100%;
  font-weight: 600;
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
  filter: brightness(0.98);
}

.photo-picker-btn-large:hover {
  filter: brightness(0.96);
}

.photo-picker-btn-large > span::before {
  line-height: 1;
  color: var(--accent-red);
}

.wrapper {
  width: 100%;
}

.modal-content {
  padding-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1.5rem;
  justify-content: space-between;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1.5rem;
}

.gallery .label {
  flex: 0 0 100%;
}

.image-frame.gallery-picture {
  max-width: 5rem;
  min-width: 87px;
  width: 7vw;
  cursor: pointer;
  position: relative;
}

.image-frame.gallery-picture.highlighted {
  border-color: var(--accent-red);
  outline: 2px solid var(--accent-red);
}

.main-image-wrapper {
  text-align: center;
  margin: 0 auto;
}

.image-frame.main-image {
  max-width: 10rem;
}

.add-photo {
  width: clamp(87px, 7vw, 5rem);
  aspect-ratio: var(--photo-aspect-ratio);
  text-align: center;
  border: 2px dashed var(--gray-stroke);
  border-radius: 1rem;
}

.add-photo.error {
  border-color: crimson;
}

.upload-image-label {
  color: var(--gray-stroke);
  display: flex;
  padding: 0.35rem;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  font-size: 0.9rem;
}

.error .upload-image-label {
  color: crimson;
}

.upload-image-label .typcn-plus,
.upload-image-label .typcn-cancel {
  font-size: 1.2rem;
}

.image-frame.gallery-picture .delete-pic-btn {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  z-index: 3;
  color: var(--text-white);
  text-shadow: 2px 2px 20px #000;
  font-size: 1.2rem;
}

@media screen and (min-width: 768px) {
  .modal-content {
    flex-wrap: nowrap;
    gap: 3rem;
    padding-top: 2rem;
  }

  .modal-content > div:first-child {
    flex: 0 0 32%;
  }

  .image-frame.main-image {
    max-width: 20rem;
  }

  .modal-content > div:last-child {
    flex: 0 0 58%;
  }

  .main-image-wrapper {
    text-align: left;
    margin: unset;
  }

  .add-photo {
    width: clamp(100px, 10vw, 8rem);
  }

  .image-frame.gallery-picture {
    max-width: 8rem;
    min-width: 100px;
    width: 10vw;
  }
}
</style>
