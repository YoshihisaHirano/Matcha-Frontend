<script setup lang="ts">
import { LocationSearchRes } from "~/types/global";

const searchRef = ref<any>(null);
const resultsDict = ref<LocationSearchRes>({});
const searchResults = computed(() => {
    const keys = Object.keys(resultsDict.value)
    return keys.length ? keys : null;
})
const pendingSearch = ref(false);
const emits = defineEmits(["selectPlace"]);

function clearSearch() {
  resultsDict.value = {};
  pendingSearch.value = false;
}

function handleSelect(res: string) {
  emits("selectPlace", resultsDict.value[res]);
}

async function searchPlace(query: string) {
    pendingSearch.value = true;
    const res = await useLocationSearch(query)
    if (res) {
        resultsDict.value = res
    } else {
        resultsDict.value = {}
    }
    pendingSearch.value = false;
}
</script>

<template>
  <Search
    @select="handleSelect"
    @search="searchPlace"
    @clear="clearSearch"
    :results="searchResults"
    :pending="pendingSearch"
    ref="searchRef"
    placeholder="Search for a place"
  />
</template>
