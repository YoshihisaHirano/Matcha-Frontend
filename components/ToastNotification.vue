<script lang="ts">
import type { Notification } from "~/types/global";
import type { ToastOptions } from "vue3-toastify";
import type { PropType } from "vue";

export default {
  name: "ToastNotification",
  props: {
    closeToast: Function as PropType<(e?: MouseEvent) => void>,
    toastProps: Object as PropType<ToastOptions>,
    notification: Object as PropType<Notification>,
  },
};
</script>

<template>
  <NotificationContent v-if="notification" :notification="notification" />
</template>
