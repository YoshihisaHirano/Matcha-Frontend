<script setup lang="ts">
import { sortModule, filterModule } from "~/utils/sortFilterModule";

const sortValue = ref<keyof typeof sortModule | "">("");
const filterValue = ref<keyof typeof filterModule | "">("");

const emits = defineEmits(["applySort", "applyFilter"]);

function clearSort() {
  sortValue.value = "";
}

function clearFilter() {
  filterValue.value = "";
}

watch(
  () => sortValue.value,
  (val) => {
    emits("applySort", val);
  }
);

watch(
  () => filterValue.value,
  (val) => {
    emits("applyFilter", val);
  }
);
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
  cursor: pointer;
}

span[class*="typcn-"] {
  cursor: default;
}

span[class*="typcn-"]:hover {
  color: var(--primary-text);
}
</style>
