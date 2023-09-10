<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";

interface PhotoGalleryProps {
  alt: string;
  isCurrentUser: boolean;
  pictures?: string[];
}

const props = defineProps<PhotoGalleryProps>();
const currIdx = ref(0);
const controlsVisible = ref(false);
const photoEditBtnDisabled = ref(false);
const midPassed = computed(() => currIdx.value > lastIdx.value / 2);
const store = useUserStore();

const userPics = computed(() => {
  const pics =  props.isCurrentUser ? store.userPictures : props.pictures;
  return pics || []
});

const lastIdx = computed(() => userPics.value.length - 1);

function toggleControls() {
  controlsVisible.value = !controlsVisible.value;
}

function nextImage() {
  if (currIdx.value < lastIdx.value) {
    currIdx.value++;
  } else {
    currIdx.value = 0;
  }
}

function prevImage() {
  if (currIdx.value > 0) {
    currIdx.value--;
  } else {
    currIdx.value = lastIdx.value;
  }
}

async function updatePictures(pictures: string[]) {
  photoEditBtnDisabled.value = true;
  const updated = await useNewPictures(pictures, store.userPictures);
  await useUpdateUser(updated);
  photoEditBtnDisabled.value = false;
}
</script>

<template>
  <div class="image-frame">
    <div
      v-if="userPics.length > 0"
      class="image-wrapper"
      @mouseenter="toggleControls"
      @mouseleave="toggleControls"
    >
      <img :src="userPics[currIdx]" :alt="alt" />
      <!-- <nuxt-img v-if="props" :src="pictures[currIdx]" /> -->
      <div
        v-if="userPics.length > 1"
        :class="['idx-indicator', { reversed: midPassed }]"
      ></div>
      <div
        v-if="userPics.length > 1"
        :class="['controls', { visible: controlsVisible }]"
      >
        <PhotoPicker
          is-small
          v-if="isCurrentUser"
          :class-name="`edit-photos-btn ${controlsVisible ? 'visible' : ''}`"
          @update-pictures="updatePictures"
          :btns-disabled="photoEditBtnDisabled"
        />
        <Button @click="prevImage" class="control-btn"
          ><span class="typcn typcn-chevron-left"></span
        ></Button>
        <Button @click="nextImage" class="control-btn"
          ><span class="typcn typcn-chevron-right"></span
        ></Button>
      </div>
    </div>
    <NoImage v-else />
  </div>
</template>

<style scoped>
.image-frame {
  border: 2px solid var(--gray-stroke);
  border-radius: 1rem;
  aspect-ratio: var(--photo-aspect-ratio);
  overflow: hidden;
  max-height: 550px;
  flex: 0 0 clamp(350px, 33%, 26vw);
}

.image-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-wrapper > img {
  height: 100%;
  object-fit: cover;
}

.control-btn,
.idx-indicator {
  position: absolute;
  z-index: 3;
}

.controls {
  transition: opacity 0.2s ease-in;
}

.controls .control-btn {
  opacity: 0;
}

.control-btn {
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-white);
  background: transparent;
  padding: 0;
  margin: 0;
  font-size: 1.75rem;
}

.controls.visible .control-btn {
  opacity: 0.7;
}

.controls.visible .control-btn:hover {
  opacity: 1;
}

.control-btn:first-of-type {
  left: 0;
}

.control-btn:last-of-type {
  right: 0;
}

.idx-indicator {
  bottom: 8px;
  letter-spacing: 3px;
  color: var(--text-white);
  right: 50%;
  transform: translateX(50%);
  opacity: 0.9;
  width: 32px;
  display: flex;
  gap: 2px;
}

.idx-indicator::after,
.idx-indicator::before {
  content: "";
  display: inline-block;
  background: var(--text-white);
  z-index: 2;
  height: 8px;
}

.idx-indicator::before {
  flex-basis: 75%;
  border-radius: 10px;
}

.idx-indicator::after {
  flex-basis: 25%;
  border-radius: 50%;
}

.idx-indicator.reversed {
  flex-direction: row-reverse;
}

:global(button[data-variant="transparent"].edit-photos-btn) {
  position: absolute;
  z-index: 3;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 1.5rem;
  color: var(--text-white);
  text-shadow: 2px 2px 20px #000;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #000;
  transform: scaleX(-1);
  opacity: 0;
}

:global(button[data-variant="transparent"].edit-photos-btn.visible) {
  opacity: 1;
}
</style>
