<script setup lang="ts">
import { LocationCoords } from "~/types/global";

interface UserLocationProps {
  location: LocationCoords;
  currentUserLocation?: LocationCoords;
  distance?: number;
  className?: string;
}

const props = defineProps<UserLocationProps>();

let geocodedAddress = ref<string | null>(null);
if (!props.currentUserLocation && !props.distance) {
  geocodedAddress.value = (await useReverseGeocoding(props.location)).address;
}

let address = computed(() => {
  if (props.distance) {
    return `${props.distance > 1 ? props.distance : "less than 1"}km from you`
  }
  if (props.currentUserLocation) {
    const distance = haversineDistance(
      props.location,
      props.currentUserLocation
    );
    return `${distance > 1 ? distance : "less than 1"}km from you`;
  } else {
    return geocodedAddress.value;
  }
});

watch(() => props.location, async () => {
  if (!props.currentUserLocation) {
    geocodedAddress.value = (await useReverseGeocoding(props.location)).address;
  }
})
</script>

<template>
  <p :class="`location ${className || ''}`">
    <span v-if="address" class="typcn-location">{{ address }}</span>
  </p>
</template>

<style scoped>
p.location {
  font-weight: 400;
}

span.typcn-location::before {
    margin-right: .2rem;
}
</style>
