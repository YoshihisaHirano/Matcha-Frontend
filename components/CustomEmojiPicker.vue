<script setup lang="ts">
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

interface CustomEmojiPickerProps {
  disabled?: boolean;
}

interface Emoji {
  i: string;
}

const emits = defineEmits(["selectEmoji"]);
defineProps<CustomEmojiPickerProps>();

const isPickerOpen = ref(false);
const pickerRef = ref<HTMLDivElement | null>(null);
const buttonWrapperRef = ref<HTMLDivElement | null>(null);

function togglePicker() {
  isPickerOpen.value = !isPickerOpen.value;
}

useOutsideClick([pickerRef, buttonWrapperRef], () => {
  if (!isPickerOpen.value) return;
  isPickerOpen.value = false;
});

function selectEmoji(emoji: Emoji) {
  emits("selectEmoji", emoji.i);
}
</script>

<template>
  <div class="wrapper">
    <div ref="pickerRef" v-if="isPickerOpen" class="emoji-picker-container">
      <EmojiPicker
        @select="selectEmoji"
        :disable-skin-tones="true"
        :native="true"
      />
    </div>
    <div ref="buttonWrapperRef">
      <Button
        :disabled="disabled"
        title="Choose emojis"
        variant="secondary"
        @click="togglePicker"
      >
        <span class="typcn-thumbs-up"></span>
      </Button>
    </div>
  </div>
</template>

<style scoped>
.emoji-picker-container {
  position: absolute;
  right: 0;
  bottom: 4rem;
  z-index: 10;
}

.wrapper {
  position: relative;
}
</style>
