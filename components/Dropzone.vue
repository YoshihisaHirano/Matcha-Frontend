<script setup lang="ts">
interface DropzoneProps {
  className?: string;
  acceptedFileTypes?: string[];
}

const props = defineProps<DropzoneProps>();
const emits = defineEmits(["dropEvent", "dropError"]);

function dragoverHandler(ev: DragEvent) {
  ev.preventDefault();
  if (!ev.dataTransfer) return;
  ev.dataTransfer.dropEffect = "move";
}

async function dropHandler(ev: DragEvent) {
  ev.preventDefault();
  if (!ev.dataTransfer) return;
  const file = ev.dataTransfer.files[0];
  const result = await handleFile(file, props.acceptedFileTypes)
  if (!result) emits('dropError')
  else emits('dropEvent', result)
}
</script>

<template>
  <div @dragover="dragoverHandler" @drop="dropHandler" :class="className">
    <slot />
  </div>
</template>
