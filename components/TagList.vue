<script setup lang="ts">
interface TagListProps {
  verbose?: boolean;
  showDelete?: boolean;
  showAdd?: boolean;
  tags: string[];
  className?: string;
  modalTitle?: string;
  canAddTags?: boolean;
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
const pendingSearch = ref(false);
const searchRef = ref<any>(null);

function removeTag(tag: string) {
  emits("deleteTag", tag);
}

function removeTagFromUpdated(tag: string) {
  updatedTags.value = updatedTags.value.filter((item) => item !== tag);
}

function addTag(tag: string) {
  if (updatedTags.value.includes(tag)) return;
  updatedTags.value = [...updatedTags.value, tag];
}

async function addNewTag(tag: string) {
  // async logic to add a tag to a tag db
  pendingSearch.value = true;
  const res = await useAddTag(tag);
  if (res.data) {
    updatedTags.value = [...updatedTags.value, tag];
    searchRes.value = null;
    searchStr.value = "";
  }
  pendingSearch.value = false;
}

function clearSearch() {
  searchRes.value = null;
  searchStr.value = "";
  pendingSearch.value = false;
  searchRef?.value?.clearSearch();
}

function updateTags() {
  if (areStringArraysEqual(props.tags, updatedTags.value)) return;
  emits("updateTags", updatedTags.value);
  clearSearch();
}

function reset() {
  updatedTags.value = [...props.tags];
  clearSearch();
  closeModal();
}

function clearRes() {
  searchRes.value = null;
  searchStr.value = "";
}

async function searchTags(searchTerm: string) {
  if (!searchTerm) return;
  pendingSearch.value = true;
  let res = await useTagSearch(searchTerm);
  // imitate no results for now
  if (Math.random() < 0.2) res.data = [];
  searchRes.value = res.data;
  if (!res.data.length) {
    searchStr.value = searchTerm;
  }
  pendingSearch.value = false;
}

watch(
  () => props.tags,
  () => {
    updatedTags.value = [...props.tags];
  }
);
</script>

<template>
  <div :class="`tags-wrapper ${className || ''}`">
    <ul class="tags-container">
      <li class="single-tag" v-for="tag in tags">
        <span v-if="verbose">tag:&nbsp;</span>
        {{ tag }}
        <Button
          v-if="showDelete"
          @click="() => removeTag(tag)"
          class-name="delete-tag-btn"
          >×</Button
        >
      </li>
      <li class="edit-btn">
        <Button v-if="showAdd" variant="round" @click="openModal">+</Button>
      </li>
    </ul>
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
        :pending="pendingSearch"
        ref="searchRef"
      >
        <span
          >No matches.
          <Button
            v-if="canAddTags && !updatedTags.includes(searchStr)"
            @click="() => addNewTag(searchStr)"
            class="add-tag-btn"
            variant="transparent"
            >Add new</Button
          ></span
        >
      </Search>
      <ul class="tags-container modal-tags">
        <li class="single-tag" v-for="tag in updatedTags">
          {{ tag }}
          <Button
            v-if="updatedTags.length > 1"
            @click="() => removeTagFromUpdated(tag)"
            class-name="delete-tag-btn"
            >×</Button
          >
        </li>
      </ul>
    </div>
    <div class="modal-controls">
      <Button @click="reset" variant="secondary">Cancel</Button>
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
  align-items: center;
}

.tags-container .single-tag {
  padding: 0.08rem 0.37rem;
  border-radius: 0.55rem;
  font-weight: 400;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.5rem;
  color: var(--text-white);
  background: var(--accent-red);
}

.delete-tag-btn {
  background: transparent;
  font-weight: 700;
  font-size: 1.1rem;
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

.edit-btn {
  margin-left: .25rem;
}
</style>
