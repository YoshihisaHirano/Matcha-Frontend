<script setup lang="ts">
import magnifier from "~/assets/icons/magnifier.svg";

interface SearchProps {
  results?: null | string[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  pending?: boolean;
}

const searchTerm = ref<string | null>(null);

const emits = defineEmits(["search", "clear", "select"]);
defineProps<SearchProps>();

const debouncedSearch = debounce(() => {
  emits("search", searchTerm.value);
}, 500);

function handleInputChange() {
  debouncedSearch();
}

function clearSearch() {
  searchTerm.value = null;
  emits("clear");
}

function selectOption(option: string) {
  emits("select", option);
}

defineExpose({
  clearSearch
})
</script>

<template>
  <div :class="`container ${className || ''}`">
    <label for="search">
      <input
        v-model="searchTerm"
        @input="handleInputChange"
        id="search"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled || pending"
      />
      <img
        v-if="!pending"
        class="magnifier-img"
        :src="magnifier"
        alt=""
        width="20"
        height="20"
      />
      <Loader class-name="search-loader" v-else :circle-size="5"/>
    </label>
    <Button :disabled="disabled || pending" class="clear-btn" variant="transparent" @click="clearSearch"
      >x</Button
    >
    <ul class="dropdown-list" v-if="results && !disabled">
      <li v-if="!results.length" class="no-results">
        <slot>No results</slot>
      </li>
      <li v-else v-for="res in results" @click="() => selectOption(res)">{{ res }}</li>
    </ul>
  </div>
</template>

<style scoped>
label {
  display: flex;
  gap: 0.5rem;
  color: var(--gray-stroke);
}

input {
  display: block;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 0.35rem 1rem;
  color: var(--primary-text);
  background-color: var(--input-bg);
  max-width: 100%;
  position: relative;
  z-index: 4;
}

.container {
  position: relative;
}

.clear-btn {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
  z-index: 5;
}

.magnifier-img {
  position: absolute;
  top: 0.35rem;
  right: -25px;
  z-index: 3;
}

.dropdown-list {
  position: absolute;
  list-style: none;
  z-index: 3;
  width: 100%;
  padding-left: 0;
  top: 1.8rem;
  padding-top: 0.5rem;
  overflow-y: auto;
  max-height: 7.5rem;
}

.dropdown-list li {
  padding: 0.35rem 1rem;
  color: var(--primary-text);
  background-color: var(--input-bg);
  width: 100%;
  cursor: pointer;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  font-weight: 400;
}

.dropdown-list li + li {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.dropdown-list li:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

li.no-results {
  cursor: default;
  text-align: center;
  text-transform: uppercase;
}

input:disabled,
.clear-btn:disabled {
  color: var(--disabled-gray);
  cursor: not-allowed;
}

.loader-container.search-loader {
  position: absolute;
  top: 0.35rem;
  right: -30px;
  z-index: 3;
  width: fit-content;
  height: fit-content;
}
</style>
