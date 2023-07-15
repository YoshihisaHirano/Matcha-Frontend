<script setup lang="ts">
import { useFiltersStore } from "~/stores/filtersStore";

interface TagListProps {
  verbose?: boolean;
}

defineProps<TagListProps>();

const filters = useFiltersStore();

function removeFilterTag(tag: string) {
    filters.deleteTag(tag)
}
</script>

<template>
  <ul class="tags-container">
    <li v-for="tag in filters.tags">
        <span v-if="verbose">tag:&nbsp;</span>
        {{ tag }}
        <Button @click="() => removeFilterTag(tag)" class-name="delete-tag-btn">×</Button>
    </li>
  </ul>
</template>

<style scoped>
.tags-container {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 0.5rem;
  padding: 0;
}

.tags-container li {
  padding: 0.08rem 0.37rem;
  border-radius: 0.55rem;
  font-weight: 400;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  line-height: 1;
  padding: .3rem .5rem;
  background: var(--tag-gray-bg);
}

.delete-tag-btn {
    background: transparent;
    font-weight: 700;
    font-size: 1.5rem;
    padding: 0;
    padding-left: .5rem;
    color: var(--primary-text);
}
</style>
