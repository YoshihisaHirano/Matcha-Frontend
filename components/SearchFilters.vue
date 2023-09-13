<script setup lang="ts">
import { SearchFilters, useFiltersStore } from "~/stores/filtersStore";
import { useUserStore } from "~/stores/userStore";
import { LocationCoords } from "~/types/global";

const emits = defineEmits(["updateFilters"]);

const filters = useFiltersStore();
const userStore = useUserStore();
const modalOpen = ref(false);

const defaultFilterValues = {
  fameDiff: 1,
  ageDiff: 6,
};
const defaultRadius = 500;

const searchFilters = computed(() => filters.searchFilters);
const filtersApplied = computed(() => filters.areFiltersApplied);
const userData = computed(() => {
  return userStore.filterData || null;
});

const filterValues = ref({ ...defaultFilterValues });
const filterTags = ref([...(searchFilters.value.tags || [])]);
const locationRadius = ref(searchFilters.value.locationRadius || defaultRadius);
const filterLocation = ref(userData.value?.location);

const fameRange = computed(() => {
  const range: Partial<Pick<SearchFilters, "fameFrom" | "fameTo">> = {
    fameFrom: undefined,
    fameTo: undefined,
  };
  if (!userData.value) return range;
  const fameNum = Number(filterValues.value.fameDiff);
  range.fameFrom = Math.max(1, userData.value.fame - fameNum);
  range.fameTo = Math.min(5, userData.value.fame + fameNum);
  return range;
});

const ageRange = computed(() => {
  const range: Partial<Pick<SearchFilters, "ageFrom" | "ageTo">> = {
    ageFrom: undefined,
    ageTo: undefined,
  };
  if (!userData.value) return range;
  const ageNum = Number(filterValues.value.ageDiff);
  range.ageFrom = Math.max(18, userData.value.age - ageNum);
  range.ageTo = Math.min(100, userData.value.age + ageNum);
  return range;
});

function openModal() {
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}

function addTag(tag: string) {
  if (!filterTags.value.includes(tag)) {
    filterTags.value = [...filterTags.value, tag];
  }
}

function deleteTag(tag: string) {
  filterTags.value = filterTags.value.filter((item) => item !== tag);
}

function changeRadius(rad: number) {
  locationRadius.value = rad;
}

function changeLocation(coords: LocationCoords) {
  filterLocation.value = coordsToArr(coords);
}

function onSubmit() {
  if (!userData.value) return;
  const filterVal = filterValues.value;
  filterVal.ageDiff = Number(filterVal.ageDiff);
  filterVal.fameDiff = Number(filterVal.fameDiff);
  const fame = filterVal.fameDiff !== 1 ? { ...fameRange.value } : {};
  const age = filterVal.ageDiff !== 6 ? { ...ageRange.value } : {};
  const sf: Partial<SearchFilters> = { ...fame, ...age };
  if (filterTags.value.length) {
    sf.tags = [...filterTags.value];
  }
  if (locationRadius.value !== defaultRadius) {
    sf.locationRadius = locationRadius.value;
  }
  if (
    filterLocation.value &&
    (filterLocation.value[0] !== userData.value.location[0] ||
      filterLocation.value[1] !== userData.value.location[1])
  ) {
    sf.location = filterLocation.value;
  }
  console.log(filterUnsetKeys(sf));
  emits("updateFilters", filterUnsetKeys(sf));
}

function onReset() {
  filterValues.value = { ...defaultFilterValues };
  filterTags.value = [...(searchFilters.value.tags || [])];
  locationRadius.value = defaultRadius;
  filterLocation.value = userData.value?.location;
}
</script>

<template>
  <Button
    @click="openModal"
    :class-name="`search-filter-btn ${filtersApplied ? 'active' : ''} `"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.90693 3.9999C9.93791 3.99996 9.96894 4.00001 10 4.00001C10.0311 4.00001 10.0621 3.99996 10.0931 3.9999C10.4618 3.99929 10.8242 3.99869 11.147 4.08519C12.0098 4.31636 12.6836 4.99023 12.9148 5.85296C13.0013 6.1758 13.0007 6.53821 13.0001 6.90693C13.0001 6.93792 13 6.96895 13 7.00001H21C21.5523 7.00001 22 7.44772 22 8.00001C22 8.55229 21.5523 9.00001 21 9.00001H13C13 9.03107 13.0001 9.0621 13.0001 9.09309C13.0007 9.46181 13.0013 9.82422 12.9148 10.1471C12.6836 11.0098 12.0098 11.6837 11.147 11.9148C10.8242 12.0013 10.4618 12.0007 10.0931 12.0001C10.0621 12.0001 10.0311 12 10 12C9.96894 12 9.93791 12.0001 9.90692 12.0001C9.5382 12.0007 9.17579 12.0013 8.85295 11.9148C7.99022 11.6837 7.31635 11.0098 7.08519 10.1471C6.99868 9.82421 6.99928 9.46181 6.9999 9.09308C6.99995 9.0621 7 9.03106 7 9.00001H5C4.44772 9.00001 4 8.55229 4 8.00001C4 7.44772 4.44772 7.00001 5 7.00001H7C7 6.96895 6.99995 6.93792 6.9999 6.90693C6.99928 6.53821 6.99868 6.1758 7.08519 5.85296C7.31635 4.99023 7.99022 4.31636 8.85295 4.08519C9.17579 3.99869 9.5382 3.99929 9.90693 3.9999ZM9.49861 6.00536C9.39195 6.01022 9.36685 6.01805 9.37059 6.01704C9.19804 6.06328 9.06327 6.19805 9.01704 6.3706C9.0162 6.37411 9.00963 6.40483 9.00535 6.49861C9.00024 6.61064 9 6.75845 9 7.00001V9.00001C9 9.24156 9.00024 9.38937 9.00535 9.5014C9.01021 9.60806 9.01804 9.63315 9.01704 9.62942C9.06327 9.80196 9.19804 9.93674 9.37059 9.98297C9.36685 9.98197 9.39195 9.98979 9.49861 9.99466C9.61063 9.99977 9.75844 10 10 10C10.2416 10 10.3894 9.99977 10.5014 9.99466C10.608 9.98979 10.6331 9.98197 10.6294 9.98297C10.802 9.93674 10.9367 9.80196 10.983 9.62942C10.982 9.63315 10.9898 9.60806 10.9946 9.5014C10.9998 9.38937 11 9.24156 11 9.00001V7.00001C11 6.75845 10.9998 6.61064 10.9946 6.49861C10.9898 6.39196 10.982 6.36686 10.983 6.3706M9.49861 6.00536C9.61063 6.00025 9.75844 6.00001 10 6.00001L9.49861 6.00536ZM10 6.00001C10.2416 6.00001 10.3894 6.00025 10.5014 6.00536L10 6.00001ZM10.5014 6.00536C10.5952 6.00963 10.6259 6.0162 10.6294 6.01704L10.5014 6.00536ZM10.6298 6.01713C10.6298 6.01713 10.6296 6.0171 10.6294 6.01704L10.6298 6.01713ZM15.9069 11.9999C15.9379 12 15.9689 12 16 12C16.0311 12 16.0621 12 16.0931 11.9999C16.4618 11.9993 16.8242 11.9987 17.147 12.0852C18.0098 12.3164 18.6836 12.9902 18.9148 13.853C19.0013 14.1758 19.0007 14.5382 19.0001 14.9069C19.0001 14.9379 19 14.9689 19 15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H19C19 17.0311 19.0001 17.0621 19.0001 17.0931C19.0007 17.4618 19.0013 17.8242 18.9148 18.1471C18.6836 19.0098 18.0098 19.6837 17.147 19.9148C16.8242 20.0013 16.4618 20.0007 16.0931 20.0001C16.0621 20.0001 16.0311 20 16 20C15.9689 20 15.9379 20.0001 15.9069 20.0001C15.5382 20.0007 15.1758 20.0013 14.853 19.9148C13.9902 19.6837 13.3164 19.0098 13.0852 18.1471C12.9987 17.8242 12.9993 17.4618 12.9999 17.0931C12.9999 17.0621 13 17.0311 13 17H5C4.44772 17 4 16.5523 4 16C4 15.4477 4.44772 15 5 15H13C13 14.969 12.9999 14.9379 12.9999 14.9069C12.9993 14.5382 12.9987 14.1758 13.0852 13.853C13.3164 12.9902 13.9902 12.3164 14.853 12.0852C15.1758 11.9987 15.5382 11.9993 15.9069 11.9999ZM15.4986 14.0054C15.392 14.0102 15.3669 14.018 15.3706 14.017C15.198 14.0633 15.0633 14.1981 15.017 14.3706C15.018 14.3669 15.0102 14.392 15.0054 14.4986C15.0002 14.6106 15 14.7585 15 15V17C15 17.2416 15.0002 17.3894 15.0054 17.5014C15.0102 17.6081 15.018 17.6332 15.017 17.6294C15.0633 17.802 15.198 17.9367 15.3706 17.983C15.3669 17.982 15.392 17.9898 15.4986 17.9947C15.6106 17.9998 15.7584 18 16 18C16.2416 18 16.3894 17.9998 16.5014 17.9947C16.608 17.9898 16.6331 17.982 16.6294 17.983C16.802 17.9367 16.9367 17.802 16.983 17.6294C16.982 17.6332 16.9898 17.6081 16.9946 17.5014C16.9998 17.3894 17 17.2416 17 17V15C17 14.7585 16.9998 14.6106 16.9946 14.4986C16.9898 14.392 16.982 14.3669 16.983 14.3706C16.9367 14.1981 16.802 14.0633 16.6294 14.017C16.6331 14.018 16.608 14.0102 16.5014 14.0054C16.3894 14.0002 16.2416 14 16 14C15.7584 14 15.6106 14.0002 15.4986 14.0054Z"
        fill="#0F1729"
      />
    </svg>
  </Button>
  <Modal
    modalTitle="Search Filters"
    @close-modal="closeModal"
    :isOpen="modalOpen"
  >
    <div v-if="userData" class="filters-container">
      <div>
        <CustomMap
          :map-center="filterLocation"
          class-name="filter-map-wrapper"
          :radius="locationRadius"
          @change-radius="changeRadius"
          @change-location="changeLocation"
        />
      </div>
      <div class="right-side">
        <div>
          <label class="filter-label" for="age-gap"
            >Age gap
            <span class="typcn-calendar"></span>
            <input
              name="age-gap"
              id="age-gap"
              type="range"
              min="1"
              max="81"
              step="3"
              v-model="filterValues.ageDiff"
            />
          </label>
          <p
            class="range-input-bottom-label"
            v-if="ageRange.ageFrom && ageRange.ageTo"
          >
            from {{ Math.round(ageRange.ageFrom) }} to
            {{ Math.round(ageRange.ageTo) }}
          </p>
        </div>
        <div>
          <label class="filter-label" for="fame-gap"
            >Fame gap
            <span class="typcn-star-full-outline"></span>
            <input
              name="fame-gap"
              id="fame-gap"
              type="range"
              min="1"
              max="5"
              step="1"
              v-model="filterValues.fameDiff"
            />
          </label>
          <p
            class="range-input-bottom-label"
            v-if="fameRange.fameFrom && fameRange.fameTo"
          >
            from {{ Math.round(fameRange.fameFrom) }} to
            {{ Math.round(fameRange.fameTo) }}
          </p>
        </div>
        <div>
          <p class="filter-label">Interests (up to 6)</p>
          <TagList
            @add-tag="addTag"
            @delete-tag="deleteTag"
            no-modal
            show-delete
            :tags="filterTags"
            :max-length="6"
          />
        </div>
      </div>
    </div>
    <ButtonControls @reset="onReset" @submit="onSubmit" />
  </Modal>
</template>

<style scoped>
.search-filter-btn {
  background: transparent;
  border-radius: 50%;
  outline: none;
  border: none;
  width: 2rem;
  height: 2rem;
  outline: 2px solid var(--accent-red);
}

.search-filter-btn:hover {
  outline-width: 3px;
}

.search-filter-btn.active {
  background: var(--accent-red);
}

.search-filter-btn svg path {
  fill: var(--accent-red);
}

.search-filter-btn.active svg path {
  fill: var(--primary-background);
}

.search-filter-btn.active:hover svg path {
  fill: var(--primary-text);
}

.filters-container {
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  display: flex;
  justify-content: space-between;
}

.filters-container > div:first-child {
  flex-basis: 52%;
  flex-shrink: 0;
  min-height: 400px;
}

.filters-container > div:last-child {
  flex-basis: 42%;
  padding-top: 3rem;
}

:global(.tags-wrapper.visible-filter-tags li:not(:last-child)) {
  background: var(--tag-gray-bg);
  color: var(--primary-text);
}

:global(.tags-wrapper.visible-filter-tags .delete-tag-btn) {
  color: var(--primary-text);
}

input[type="range"] {
  display: block;
  width: 100%;
  max-width: 245px;
}

.filter-label {
  font-size: 1.2rem;
  margin-bottom: 0.45rem;
  font-weight: 500;
  color: var(--primary-text);
}

.filter-label:last-of-type {
  margin-bottom: 0.1rem;
}

.right-side {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.range-input-bottom-label {
  font-weight: 500;
  color: var(--disabled-gray);
}
</style>
