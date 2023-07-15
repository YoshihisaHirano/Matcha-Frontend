import { Filters } from "~/types/global";

type SearchFilters = Omit<Filters, "pageNo" | "limit">;

export const useFiltersStore = defineStore("filters", () => {
  const initialFilters = {
    pageNo: 1,
    limit: 10,
    tags: ["anime", "food", "sleep"],
  };
  const filters = ref<Filters>(initialFilters);

  const searchFilters = computed<SearchFilters>(() => {
    const searchF: Partial<Filters> = { ...filters.value };
    delete searchF.pageNo;
    delete searchF.limit;
    return searchF;
  });
  const tags = computed(() => filters.value.tags)

  function $reset() {
    filters.value = { ...initialFilters };
  }

  function setSearchFilter<K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) {
    filters.value = { ...filters.value, [key]: value };
  }

  function setFilters(updatedFilters: SearchFilters) {
    filters.value = { ...filters.value, ...updatedFilters };
  }

  function addTag(tag: string) {
    const tagsCopy = filters.value.tags?.slice() || [];
    tagsCopy.push(tag);
    filters.value = { ...filters.value, tags: [...tagsCopy] };
  }

  function deleteTag(tag: string) {
    const tagsCopy = filters.value.tags?.slice() || [];
    const tagIdx = tagsCopy.findIndex((item) => item === tag);
    if (tagIdx > -1) {
      tagsCopy.splice(tagIdx, 1);
      filters.value = { ...filters.value, tags: [...tagsCopy] };
    }
  }

  return {
    filters,
    searchFilters,
    tags,
    $reset,
    setSearchFilter,
    setFilters,
    addTag,
    deleteTag,
  };
});
