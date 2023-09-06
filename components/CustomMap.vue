<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import locationIcon from "~/assets/icons/location.svg";
import type { MapBrowserEvent, View } from "ol";

interface MapProps {
  className?: string;
  mapCenter?: number[];
}

const props = defineProps<MapProps>();

const center = ref(props.mapCenter || [40, 40]);
const projection = ref("EPSG:4326");
const zoom = ref(16);
const rotation = ref(0);
const tileSource = useMapTileSource();
const view = ref<View>();

function useCurrentLocation() {
  const coords = useUserStore().actualUserLocation;
  if (coords) {
    const coordsArr = [Number(coords.lon), Number(coords.lat)];
    view?.value?.setCenter(coordsArr);
    center.value = coordsArr;
  }
}

function handleClick(event: MapBrowserEvent<PointerEvent>) {
  view?.value?.setCenter(event.coordinate);
  center.value = event.coordinate;
}
</script>

<template>
  <ClientOnly>
    <div :class="`map-wrapper ${className || ''}`">
      <div class="outer-map-controls">
        <div aria-label="map label" class="label">
          Location
          <Search placeholder="Search for a place"/>
        </div>
        <div class="location-controls">
          <div class="current-location">
            <span>use my location</span>
          <Button @click="useCurrentLocation"
            ><span class="typcn typcn-location-arrow location-icon"></span
          ></Button>
          </div>
          <!-- <Search/> -->
        </div>
      </div>
      <ol-map
        :loadTilesWhileAnimating="true"
        :loadTilesWhileInteracting="true"
        @click="handleClick"
      >
        <ol-view
          :center="center"
          :rotation="rotation"
          :zoom="zoom"
          :projection="projection"
          ref="view"
        />
        <ol-tile-layer>
          <ol-source-xyz :url="tileSource" />
        </ol-tile-layer>

        <ol-vector-layer>
          <ol-source-vector>
            <ol-feature>
              <ol-geom-point :coordinates="center"></ol-geom-point>
              <ol-style>
                <ol-style-icon
                  :src="locationIcon"
                  :anchor="[0.5, 1]"
                  anchorXUnits="fraction"
                  anchorYUnits="fraction"
                ></ol-style-icon>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </ol-map>
    </div>
  </ClientOnly>
</template>

<style scoped>
@import "vue3-openlayers/dist/vue3-openlayers.css";

.map-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
.map-wrapper > div:last-child {
  width: 100%;
  height: 100%;
}

.label {
  font-size: 1.25rem;
  color: var(--primary-text);
  margin-bottom: .5rem;
}

.outer-map-controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.current-location {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--gray-stroke);
}

.current-location > span {
  opacity: 0.8;
  font-size: 0.85rem;
}

.current-location > button {
  background: none;
  padding: 0;
  font-size: 1.35rem;
  line-height: 1;
  color: var(--primary-text);
}

.current-location > button:hover {
  color: var(--accent-red);
}

.location-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: .5rem;
}
</style>
