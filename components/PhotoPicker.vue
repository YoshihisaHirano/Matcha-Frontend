<script setup lang="ts">
interface PhotoPickerProps {
  buttonText?: string;
  isSmall?: boolean;
  className?: string;
  pictures: string[];
}

const props = defineProps<PhotoPickerProps>();
const emits = defineEmits(["updatePictures"]);

const updatedPictures = ref([...props.pictures]);
const mainImage = ref(updatedPictures.value[0]);
const uploadErr = ref(false);

const modalOpen = ref(false);

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
}

function submitChanges() {
  emits("updatePictures", updatedPictures.value);
}
</script>

<template>
  <Button
    :class-name="`${className || ''}`"
    @click="openModal"
    v-if="isSmall"
    variant="transparent"
    ><span class="typicons-edit"></span
  ></Button>
  <div v-else :class="`${className || ''} wrapper`">
    <span class="label">Photos</span>
    <Button @click="openModal" class-name="photo-picker-btn-large"
      >{{ buttonText || "Edit photos" }}
      <span class="typicons-edit"></span>
    </Button>
  </div>
  <Modal modalTitle="Edit photos" @close-modal="closeModal" :isOpen="modalOpen">
    <div class="modal-content">
      <div>
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
        />
        <Dropzone
          :accepted-file-types="['image/png', 'image/jpeg']"
          :class="`add-photo ${uploadErr ? 'error' : ''}`"
          v-if="updatedPictures.length < 5"
          @drop-event="addImage"
          @drop-error="setUploadErr"
        >
          <label class="upload-image-label" for="upload-image">
            <Tooltip active-on-hover>
              <template #icon><span class="typicons-plus"></span></template>
              <p>JPEG and PNG images up to 2Mb</p>
            </Tooltip>
            <span>Drop or select a file</span>
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

.label:first-of-type {
  margin-bottom: 0.25rem;
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
  padding-top: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 3rem;
  justify-content: space-between;
}

.modal-content > div:first-child {
  flex: 0 0 32%;
}

.modal-content > div:last-child {
  flex: 0 0 58%;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.gallery .label {
  flex: 0 0 100%;
}

.image-frame.gallery-picture {
  max-width: 8rem;
  min-width: 100px;
  width: 10vw;
  cursor: pointer;
}

.image-frame.gallery-picture.highlighted {
  border-color: var(--accent-red);
  outline: 2px solid var(--accent-red);
}

.image-frame.main-image {
  max-width: 20rem;
}

.add-photo {
  width: clamp(100px, 10vw, 8rem);
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

.upload-image-label .typicons-plus {
  font-size: 1.2rem;
}
</style>
