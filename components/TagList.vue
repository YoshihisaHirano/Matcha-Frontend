<script setup lang="ts">
interface TagListProps {
  verbose?: boolean;
  showDelete?: boolean;
  showAdd?: boolean;
  tags: string[];
  className?: string;
  modalTitle?: string;
}

const props = defineProps<TagListProps>();
const emits = defineEmits(["deleteTag", "updateTags"]);

const modalOpen = ref(false);

function openModal() {
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}

const updatedTags = ref<string[]>([...props.tags]);
const searchRes = ref<null | string[]>(null);
const searchStr = ref<string>("");
const submitBtnActive = computed(() =>
  areStringArraysEqual(props.tags, updatedTags.value)
);
const disableSearch = computed(() => updatedTags.value.length > 9);

function removeTag(tag: string) {
  emits("deleteTag", tag);
}

function removeTagFromUpdated(tag: string) {
  updatedTags.value = updatedTags.value.filter((item) => item !== tag);
}

function addTag(tag: string) {
  updatedTags.value = [...updatedTags.value, tag];
}

function addNewTag(tag: string) {
  // async logic to add a tag to a tag db
  updatedTags.value = [...updatedTags.value, tag];
}

function updateTags() {
  if (!updatedTags.value.length) return;
  emits("updateTags", updatedTags.value);
}

function cancelUpdate() {
  updatedTags.value = [...props.tags];
  searchRes.value = null;
  searchStr.value = "";
  closeModal();
}

function clearRes() {
  searchRes.value = null;
  searchStr.value = "";
}

function searchTags(searchTerm: string) {
  console.log(searchTerm);
  if (!searchTerm) return;
  const res = Math.random() > 0.5 ? [] : ["anime", "music", "food"]; // async logic to fetch tags by search
  searchRes.value = res;
  if (!res.length) {
    searchStr.value = searchTerm;
  }
}
</script>

<template>
  <div :class="`tags-wrapper ${className || ''}`">
    <ul class="tags-container">
      <li v-for="tag in tags">
        <span v-if="verbose">tag:&nbsp;</span>
        {{ tag }}
        <Button
          v-if="showDelete"
          @click="() => removeTag(tag)"
          class-name="delete-tag-btn"
          >×</Button
        >
      </li>
    </ul>
    <Button variant="round" @click="openModal">+</Button>
  </div>
  <Modal
    :modalTitle="`${modalTitle || 'Add tags'}`"
    @close-modal="closeModal"
    :isOpen="modalOpen"
    class-name="tags-modal"
  >
    <div class="modal-content">
      <span class="tag-counter">{{ updatedTags.length }} / 10</span>
      <Search
        @select="addTag"
        @search="searchTags"
        @clear="clearRes"
        class-name="tag-search"
        :results="searchRes"
        :disabled="disableSearch"
      >
        <span
          >No matches.
          <Button
            v-if="!updatedTags.includes(searchStr)"
            @click="() => addNewTag(searchStr)"
            class="add-tag-btn"
            variant="transparent"
            >Add new</Button
          ></span
        >
      </Search>
      <ul class="tags-container modal-tags">
        <li v-for="tag in updatedTags">
          {{ tag }}
          <Button
            @click="() => removeTagFromUpdated(tag)"
            class-name="delete-tag-btn"
            >×</Button
          >
        </li>
      </ul>
    </div>
    <div class="modal-controls">
      <Button @click="cancelUpdate" variant="secondary">Cancel</Button>
      <Button @click="updateTags" variant="primary" :disabled="submitBtnActive"
        >Submit</Button
      >
    </div>
  </Modal>
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
  padding: 0.3rem 0.5rem;
  color: var(--text-white);
  background: var(--accent-red);
}

.delete-tag-btn {
  background: transparent;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 0;
  padding-left: 0.5rem;
  color: var(--text-white);
}

.tags-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.modal-tags {
  padding: 2rem 0 0;
}

.tag-search {
  margin-top: 2rem;
  flex: 0 0 auto;
  min-width: 18rem;
}

.dialog-box.tags-modal {
  max-width: 820px;
}

.modal-controls {
  display: flex;
  width: fit-content;
  gap: 0.5rem;
}

.modal-content {
  display: flex;
  min-height: 150px;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
}

.modal-content > ul {
  flex: 0 0 50%;
}

.add-tag-btn {
  text-transform: uppercase;
  display: inline;
  font-weight: 600;
}

.add-tag-btn:hover {
  text-decoration: underline;
}

.tag-counter {
  position: absolute;
  top: 0;
  right: 0;
  font-weight: 500;
  color: var(--disabled-gray);
  font-size: 0.9rem;
}
</style>
