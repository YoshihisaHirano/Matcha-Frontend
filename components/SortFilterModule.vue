<script setup lang="ts">
import { sortModule, filterModule } from "~/utils/sortFilterModule";

interface SortFilterModuleProps {
  sortValue?: keyof typeof sortModule | "";
  filterValue?: keyof typeof filterModule | "";
}

const sortValue = ref<keyof typeof sortModule | "">("");
const filterValue = ref<keyof typeof filterModule | "">("");

defineEmits(["update:sortValue", "update:sortValue"]);
defineProps<SortFilterModuleProps>();

function clearSort() {
  sortValue.value = "";
}

function clearFilter() {
  filterValue.value = "";
}
</script>

<template>
  <div class="sort-filter-container">
    <div class="inner-container">
      <Button
        @click="clearSort"
        variant="transparent"
        aria-label="Sort search results"
      >
        <span :class="['typcn-arrow-unsorted', { active: !!sortValue }]"></span>
      </Button>
      <Dropdown
        :options="Object.keys(sortModule)"
        placeholder="sort by"
        v-model="sortValue"
        :title="sortValue"
        class-name="sort-filter-dropdown"
      />
    </div>
    <div class="inner-container">
      <Button
        @click="clearFilter"
        variant="transparent"
        aria-label="Filter search results"
      >
        <span :class="['typcn-filter', { active: !!filterValue }]"></span>
      </Button>
      <Dropdown
        :options="Object.keys(filterModule)"
        placeholder="filter by"
        v-model="filterValue"
        :title="filterValue"
        class-name="sort-filter-dropdown"
      />
    </div>
  </div>
</template>

<style scoped>
:global(.dropdown.sort-filter-dropdown),
:global(.dropdown.sort-filter-dropdown button) {
  text-transform: lowercase;
}

:global(.dropdown.sort-filter-dropdown) {
  width: 10rem;
  --input-bg: var(--search-dropdown);
}

:global(.dropdown.sort-filter-dropdown button) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sort-filter-container {
  display: flex;
  gap: 1rem;
}

.inner-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

span[class*="typcn-"].active {
  color: var(--accent-red);
  text-decoration: line-through;
}
</style>
