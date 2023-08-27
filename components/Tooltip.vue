<script setup lang="ts">
interface TooltipProps {
  className?: string;
  contentClassName?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  activeOnHover?: boolean;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  tooltipPosition: "top",
  className: "",
  contentClassName: "",
  activeOnHover: false,
});

const dialogRef = ref<HTMLDialogElement | null>(null);
const wrapperRef = ref<HTMLDivElement | null>(null);
const mouseEventsActive = ref(true);
const focusEventsActive = computed(() => !mouseEventsActive.value);
const leavingDialog = ref(false);

function openTooltip() {
  if (dialogRef.value?.open) return;
  dialogRef.value?.show();
}

function closeTooltip() {
  if (!dialogRef.value?.open) return;
  dialogRef.value?.close();
}

function handleMouseEnter() {
  if (!mouseEventsActive.value || !props.activeOnHover) return;
  openTooltip();
}

function handleMouseLeave() {
  if (!mouseEventsActive.value || !props.activeOnHover) return;
  closeTooltip();
}

function hanldeClick() {
  if (!mouseEventsActive.value) return;
  openTooltip();
}

function handleFocusIn() {
  if (leavingDialog.value) {
    leavingDialog.value = false;
    return;
  }
  mouseEventsActive.value = false;
  openTooltip();
}

function handleFocusOut() {
  if (!focusEventsActive.value) return;
  mouseEventsActive.value = true;
  leavingDialog.value = true;
  closeTooltip();
}

useOutsideClick([dialogRef, wrapperRef], () => {
  closeTooltip();
  leavingDialog.value = true;
  mouseEventsActive.value = true;
});
</script>

<template>
  <div
    class="tooltip-wrapper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focus="handleFocusIn"
    tabindex="0"
    :class="className"
    ref="wrapperRef"
    @click="hanldeClick"
  >
    <dialog
      @blur="handleFocusOut"
      :class="['tooltip', tooltipPosition, contentClassName]"
      ref="dialogRef"
      id="dialogRef"
    >
      <slot></slot>
    </dialog>
    <slot name="icon"> <span class="typicons-info tooltip-icon"> </span></slot>
  </div>
</template>

<style scoped>
.tooltip-icon {
  color: var(--accent-red);
  opacity: 0.5;
  display: block;
  width: 1.3rem;
  line-height: 1;
  max-height: 1.3rem;
  text-align: center;
  border: 1px solid var(--accent-red);
  border-radius: 50%;
}

.tooltip-icon:hover {
  opacity: 1;
}

dialog[open] + .tooltip-icon {
  opacity: 1;
}

.tooltip-wrapper {
  position: relative;
}

.tooltip {
  border-radius: 8px;
  padding: 0.5rem 0.7rem;
  max-width: 250px;
  width: max-content;
  background: var(--primary-text);
  color: var(--primary-background);
  z-index: 5;
  border: none;
  font-weight: 500;
}

.tooltip.top,
.tooltip.bottom {
  transform: translateX(-50%);
  left: 0;
}

.tooltip.top {
  bottom: 1.7rem;
}

.tooltip.bottom {
  top: 1.7rem;
}

.tooltip.left,
.tooltip.right {
  top: 0.7rem;
}

.tooltip.right {
  left: 1.7rem;
  transform: translateY(-50%);
}

.tooltip.left {
  left: -0.4rem;
  transform: translateY(-50%) translateX(-100%);
}
</style>
