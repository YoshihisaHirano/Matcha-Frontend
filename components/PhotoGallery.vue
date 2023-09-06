<script setup lang="ts">
interface PhotoGalleryProps {
  pictures: string[];
  alt: string;
  isCurrentUser: boolean;
}

const props = defineProps<PhotoGalleryProps>();
const currIdx = ref(0);
const lastIdx = computed(() => props.pictures.length - 1);
const controlsVisible = ref(false);
const midPassed = computed(() => currIdx.value > lastIdx.value / 2);

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

function updatePictures(data: string[]) {
  console.log(sortImagesToHandle(data, props.pictures))
}
</script>

<template>
  <div class="image-frame">
    <div
      v-if="pictures.length > 0"
      class="image-wrapper"
      @mouseenter="toggleControls"
      @mouseleave="toggleControls"
    >
      <img :src="pictures[currIdx]" :alt="alt" />
      <!-- <nuxt-img v-if="props" :src="pictures[currIdx]" /> -->
      <div
        v-if="pictures.length > 1"
        :class="['idx-indicator', { reversed: midPassed }]"
      ></div>
      <div
        v-if="pictures.length > 1"
        :class="['controls', { visible: controlsVisible }]"
      >
        <PhotoPicker
          is-small
          v-if="isCurrentUser"
          :class-name="`edit-photos-btn ${ controlsVisible ? 'visible' : '' }`"
          :pictures="pictures"
          @update-pictures="updatePictures"
        />
        <Button @click="prevImage" class="control-btn"
          ><span class="typcn-previous"></span
        ></Button>
        <Button @click="nextImage" class="control-btn"
          ><span class="typcn-next"></span
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
  top: .5rem;
  left: .5rem;
  font-size: 1.5rem;
  color: var(--text-white);
  text-shadow: 2px 2px 20px #000;
  -webkit-text-stroke-width: .5px;
  -webkit-text-stroke-color: #000;
  transform: scaleX(-1);
  opacity: 0;
}

:global(button[data-variant="transparent"].edit-photos-btn.visible) {
  opacity: 1;
}
</style>
