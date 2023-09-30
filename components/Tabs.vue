<script setup lang="ts">
interface TabsProps {
  tabs: Array<{ label: string; slotName: string }>;
  className?: string;
}

const activeTab = ref(0);

defineProps<TabsProps>();

function setActiveTab(index: number) {
  activeTab.value = index;
}
</script>

<template>
  <div :class="className">
    <div class="tab-buttons">
      <Button
        v-for="(tab, index) in tabs"
        :key="`tab-${index}`"
        :className="`${activeTab === index ? 'active-tab' : ''}`"
        @click="() => setActiveTab(index)"
        variant="transparent"
      >
        {{ tab.label }}
      </Button>
    </div>
    <div class="tab-content">
      <slot :name="tabs[activeTab].slotName"></slot>
    </div>
  </div>
</template>

<style scoped>
.tab-buttons {
  display: flex;
  gap: .35rem;
  margin-bottom: 1.75rem;
  border-radius: 8px;
  padding: 0.15rem 0.15rem;
  width: fit-content;
  font-size: 1.2rem;
  background-color: var(--tag-gray-bg);
}

button[data-variant="transparent"] {
  padding: 0.5rem 0.95rem;
  border-radius: 8px;
}

:global(button[data-variant="transparent"].active-tab) {
  color: var(--accent-red);
  font-weight: 500;
  background: var(--primary-background);
  box-shadow: 0 0.15rem 0.3rem rgba(0, 0, 0, 0.15);
}
</style>
