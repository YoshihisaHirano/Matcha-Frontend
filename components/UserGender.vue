<script setup lang="ts">
import { Gender, SexPref } from "~/types/global";

interface UserGenderProps {
  gender: Gender;
  sexPref: SexPref;
  className?: string;
}

const props = defineProps<UserGenderProps>();

const genderWithIcon = computed(
  () => genderIcons[props.gender] || genderIcons.other
);
const sexPrefWithIcon = computed(() => getSexPref(props.gender, props.sexPref));
</script>

<template>
  <div :class="`gender-info ${className || ''}`">
    <div>
      Gender:
      <p>{{ genderWithIcon }}</p>
    </div>
    <div>
      Prefers:
      <p>{{ sexPrefWithIcon }}</p>
    </div>
  </div>
</template>

<style scoped>
.gender-info {
  display: flex;
  gap: 2rem;
  padding-bottom: 1rem;
}

.gender-info p {
  font-weight: 600;
}
</style>
