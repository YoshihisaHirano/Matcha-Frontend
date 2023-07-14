<script setup lang="ts">
interface LoaderProps {
  text?: string;
}

defineProps<LoaderProps>();
</script>

<template>
  <div class="loader-container">
    <div class="circle-container">
      <div class="loader-circle"></div>
      <div class="loader-circle"></div>
      <div class="loader-circle"></div>
      <div class="loader-circle"></div>
      <div class="loader-circle"></div>
    </div>
    <p v-if="text">{{ text }}</p>
  </div>
</template>

<style scoped>
.loader-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  --circle-size: 20px;
  --circle-color: var(--loader-color);
  --circle-no: 1;
  color: var(--circle-color);
  font-weight: 600;
}

.circle-container {
  width: calc(var(--circle-size) * 5);
  height: calc(var(--circle-size) * 5);
  position: relative;
}

.loader-circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
  transform-origin: center center;
  animation: wave 1.8s ease-in infinite;
  width: calc(var(--circle-no) * var(--circle-size));
  height: calc(var(--circle-no) * var(--circle-size));
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  animation-delay: calc(var(--circle-no) * 0.1s);
}

.loader-circle:nth-child(1) {
  --circle-no: 1;
}

.loader-circle:nth-child(2) {
  --circle-no: 2;
}

.loader-circle:nth-child(3) {
  --circle-no: 3;
}

.loader-circle:nth-child(4) {
  --circle-no: 4;
}

.loader-circle:nth-child(5) {
  --circle-no: 5;
}

@keyframes wave {
  0% {
    -webkit-transform: scale(1);
  }
  10% {
    -webkit-transform: scale(1+ (0.3 / var(--circle-no)));
    border-color: var(--circle-color);
  }
  20% {
    -webkit-transform: scale(1);
  }
  40% {
    -webkit-transform: scale(1);
    border-color: transparent;
  }
  100% {
    -webkit-transform: scale(1);
    border-color: transparent;
  }
}
</style>
