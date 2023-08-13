<script setup lang="ts">
import { ref } from "vue";

interface MapProps {
  className?: string
}

defineProps<MapProps>();

const center = ref([40, 40]);
const projection = ref("EPSG:4326");
const zoom = ref(10);
const rotation = ref(0);
const tileSource = useMapTileSource();
</script>

<template>
  <div :class="`map-wrapper ${className || ''}`">
    <span aria-label="map label" class="label">Location</span>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true">
      <ol-view
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />
      <ol-tile-layer>
        <ol-source-xyz :url="tileSource" />
      </ol-tile-layer>
    </ol-map>
  </div>
</template>

<style scoped>
@import "vue3-openlayers/dist/vue3-openlayers.css";

.map-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
.map-wrapper > div {
  width: 100%;
  height: 100%;
}

.label {
  font-size: 1.25rem;
  color: var(--primary-text);
}
</style>
