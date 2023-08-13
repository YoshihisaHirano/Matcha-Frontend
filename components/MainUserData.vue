<script setup lang="ts">
import { Gender, LocationCoords, SexPref } from "~/types/global";
import { getAge } from "~/utils/getAge";
import { genderIcons, getSexPref } from "~/utils/getSexPref";
import { useReverseGeocoding } from "~/composables/useReverseGeocoding";

interface MainUserInfo {
  dateOfBirth: number;
  firstName: string;
  lastName?: string;
  tags: string[];
  location: LocationCoords;
  gender: Gender;
  sexPref: SexPref;
  id: string;
  className?: string;
  online?: boolean;
  isProfile?: boolean;
}

const props = defineProps<MainUserInfo>();

const age = computed(() => getAge(props.dateOfBirth));
const genderWithIcon = computed(
  () => genderIcons[props.gender] || genderIcons.other
);
const sexPrefWithIcon = computed(() => getSexPref(props.gender, props.sexPref));
// let { address } = await useReverseGeocoding(props.location);
// watch(
//   () => props.id,
//   async () => {
//     let { address: newAddress } = await useReverseGeocoding(props.location);
//     address = newAddress;
//   }
// );
</script>

<template>
  <section :class="className">
    <!-- <p v-if="address" class="location">
      <span class="typicons-location">{{ address }}</span>
    </p> -->
    <p class="main-user-info">
      {{ firstName }}<span v-if="lastName">&nbsp;{{ lastName }}</span
      >, {{ age }}
      <ProfileUpdate v-if="isProfile"/>
      <span
        v-else-if="online !== undefined"
        :class="['online-indicator', { online }]"
        :title="`The user is ${online ? 'online' : 'offline'}`"
      ></span>
    </p>
    <ul class="tag-list">
      <li v-for="tag in tags">{{ tag }}</li>
    </ul>
    <div class="gender-info">
      <div>
        Gender:
        <p>{{ genderWithIcon }}</p>
      </div>
      <div>
        Prefers:
        <p>{{ sexPrefWithIcon }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-user-info {
  font-size: 1.75rem;
  font-weight: 500;
  margin-bottom: 0.65rem;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 0.5rem;
  padding: 0;
  padding-bottom: 0.75rem;
}

.tag-list li {
  background: var(--accent-red);
  padding: 0.08rem 0.37rem;
  border-radius: 0.55rem;
  font-weight: 400;
  font-size: 1.1rem;
  color: #fffff0;
}

p.location {
  font-weight: 400;
}

.gender-info {
  display: flex;
  gap: 2rem;
  padding-bottom: 1rem;
}

.gender-info p {
  font-weight: 600;
}

.online-indicator::before {
  content: "";
  height: 0.85rem;
  width: 0.85rem;
  border-radius: 50%;
  background: var(--offline-orange);
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.15rem;
  padding-bottom: 0.1rem;
}

.online.online-indicator::before {
  background: var(--online-green);
}
</style>
