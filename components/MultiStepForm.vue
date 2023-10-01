<script setup lang="ts">
interface MultiStepFormProps {
  stepData: Array<{ label: string; slotName: string, enableNext: boolean }>;
}

defineProps<MultiStepFormProps>();
const emits = defineEmits(["submit"]);

const currentStep = ref(0);

function forwardSubmit() {
  emits("submit");
}
</script>

<template>
  <div class="container">
    <div class="step-counter">
      <span
        class="step"
        :class="{ active: i <= currentStep }"
        v-for="(_, i) in stepData"
      >
        <span class="step-no">{{ i + 1 }}</span>
      </span>
    </div>
    <GenericForm @submit="forwardSubmit">
      <h3 class="step-heading">{{ stepData[currentStep].label }}</h3>
      <slot :name="stepData[currentStep].slotName" />
      <div class="button-container">
        <Button
          v-if="currentStep > 0"
          variant="secondary"
          @click="currentStep--"
        >
          Back
        </Button>
        <Button
          v-if="currentStep < stepData.length - 1"
          variant="primary"
          @click="currentStep++"
          :disabled="!stepData[currentStep].enableNext"
        >
          Next
        </Button>
        <Button
          v-if="currentStep === stepData.length - 1"
          type="submit"
          variant="fancy"
          class-name="multi-form-submit-button"
          :disabled="!stepData[currentStep].enableNext"
        >
          Submit
        </Button>
      </div>
    </GenericForm>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  height: 100%;
}

.button-container {
  display: flex;
  gap: 1rem;
  position: absolute;
  bottom: 0;
  right: 0;
}

button[data-variant="fancy"].multi-form-submit-button {
  font-weight: 700;
  padding: 0.35rem 1rem;
  border-radius: 8px;
  font-size: 1.25rem;
}

.step-counter {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.step {
  position: relative;
  flex: 0 0 33%;
  height: 1rem;
  background: var(--accent-red-pale);
  transition: all .3s ease-in-out;
}

.step.active {
  background: var(--accent-red);
  color: var(--primary-background);
}

.step-no {
  position: absolute;
  background: inherit;
  font-weight: 700;
  z-index: 2;
  padding: 0.45rem 1rem;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.step:first-of-type .step-no {
  left: -0.1rem;
  transform: translateY(-50%);
}

.step:last-of-type .step-no {
  left: unset;
  right: -0.1rem;
  transform: translateY(-50%);
}

.step-heading {
  font-weight: 500;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
}
</style>
