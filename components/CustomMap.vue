<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import locationIcon from "~/assets/icons/location.svg";
import type { MapBrowserEvent, View, Map } from "ol";
import { LocationCoords } from "~/types/global";
import { Coordinate } from "ol/coordinate";
import { getPointResolution } from "ol/proj";

interface MapProps {
  className?: string;
  mapCenter?: number[];
  radius?: number;
}

const props = defineProps<MapProps>();
const emits = defineEmits(["changeLocation", "changeRadius"]);

const center = ref(props.mapCenter || [40, 40]);
const projection = ref("EPSG:4326");
const zoom = ref(typeof props.radius !== "undefined" ? 15 : 16);
const rotation = ref(0);
const tileSource = useMapTileSource();
const view = ref<View>();
const mapRef = ref<{ map: Map } | null>(null);

let currentRadius = ref(0);

function convertMetersToProj(center: number[], meters?: number) {
  if (!meters) return 0;
  if (!mapRef.value) return meters;
  return (
    meters /
    getPointResolution(
      mapRef.value.map.getView().getProjection(),
      1,
      center,
      "m"
    )
  );
}

function useCurrentLocation() {
  const coords = useUserStore().actualUserLocation;
  if (coords) {
    const newCoords = coordsToArr(coords);
    setNewLocation(newCoords);
  }
}

function setNewLocation(newCoords: Coordinate) {
  view?.value?.setCenter(newCoords);
  center.value = newCoords;
  emits("changeLocation", { lon: newCoords[0], lat: newCoords[1] });
}

function handleClick(event: MapBrowserEvent<PointerEvent>) {
  const newCoords = event.coordinate;
  setNewLocation(newCoords);
}

function handleSearch(coords: LocationCoords) {
  const newCoords = coordsToArr(coords);
  setNewLocation(newCoords);
}

function handleRadiusChange(event: Event) {
  const { value } = event.target as HTMLInputElement;
  const numericVal = Number(value);
  currentRadius.value = convertMetersToProj(center.value, numericVal);
  emits("changeRadius", numericVal);
}

watch(
  () => props.mapCenter,
  () => {
    center.value = props.mapCenter || [40, 40];
    console.log(props.mapCenter)
  }
);

watch(
  () => mapRef.value,
  () => {
    if (mapRef.value) {
      currentRadius.value = convertMetersToProj(center.value, props.radius);
    }
  }
);
</script>

<template>
  <ClientOnly>
    <div :class="`map-wrapper ${className || ''}`">
      <div class="outer-map-controls">
        <div aria-label="map label" class="label">
          Location
          <LocationSearch @select-place="handleSearch" />
        </div>
        <div class="location-controls">
          <div class="current-location">
            <span>use my location</span>
            <Button @click="useCurrentLocation"
              ><span class="typcn typcn-location-arrow location-icon"></span
            ></Button>
          </div>
        </div>
      </div>
      <ol-map
        :loadTilesWhileAnimating="true"
        :loadTilesWhileInteracting="true"
        @click="handleClick"
        ref="mapRef"
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
            <ol-feature v-if="currentRadius">
              <ol-geom-circle
                :center="center"
                :radius="currentRadius"
              ></ol-geom-circle>
              <ol-style>
                <ol-style-stroke color="#b21f1f" :width="3"></ol-style-stroke>
                <ol-style-fill color="rgba(165, 107, 0, .4)"></ol-style-fill>
              </ol-style>
            </ol-feature>
            <ol-feature v-else>
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
    <div class="radius-picker" v-if="currentRadius">
      <label for="location-radius">
        <span>change location radius</span>
        <input
          list="values"
          type="range"
          name="location-radius"
          id="location-radius"
          min="500"
          step="250"
          max="5000"
          @change="handleRadiusChange"
        />
      </label>
      <datalist id="values">
        <option value="500" label="500 m"></option>
        <option value="1000"></option>
        <option value="1500"></option>
        <option value="2000"></option>
        <option value="2500"></option>
        <option value="3000"></option>
        <option value="3500"></option>
        <option value="4000"></option>
        <option value="4500"></option>
        <option value="5000" label="5 km"></option>
      </datalist>
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
  margin-bottom: 0.5rem;
  flex-basis: 60%;
  font-weight: 500;
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
  margin-bottom: 0.5rem;
}

.radius-picker {
  margin-left: auto;
  width: fit-content;
  margin-top: 0.75rem;
}

.radius-picker > label {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-weight: 500;
  color: var(--gray-stroke);
}

.radius-picker > label > input {
  width: 150px;
}

datalist {
  display: flex;
  width: 150px;
  flex-direction: column;
  justify-content: space-between;
  writing-mode: vertical-lr;
  margin-left: auto;
}

datalist option {
  font-size: 0.6rem;
  padding: 3px 0;
}
</style>
