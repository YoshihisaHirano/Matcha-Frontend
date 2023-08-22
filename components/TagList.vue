<script setup lang="ts">

interface TagListProps {
  verbose?: boolean;
  showDelete?: boolean;
  showAdd?: boolean;
  tags: string[]
  className?: string;
}

defineProps<TagListProps>();
const emits = defineEmits(["deleteTag"]);

function removeFilterTag(tag: string) {
  emits("deleteTag", tag);
}
</script>

<template>
  <ul :class="`tags-container ${className || ''}`">
    <li v-for="tag in tags">
        <span v-if="verbose">tag:&nbsp;</span>
        {{ tag }}
        <Button v-if="showDelete" @click="() => removeFilterTag(tag)" class-name="delete-tag-btn">×</Button>
    </li>
  </ul>
</template>

<style scoped>
.tags-container {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 0.5rem;
  padding: .5rem 0;
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
  color: var(--text-white);
  background: var(--accent-red);
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
