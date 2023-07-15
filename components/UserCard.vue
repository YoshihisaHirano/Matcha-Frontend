<script setup lang="ts">
import { useReverseGeocoding } from "~/composables/useReverseGeocoding";
import { UserCardInfo } from "~/types/global";
import { getAge } from "~/utils/getAge";
import { genderIcons, getSexPref } from "~/utils/getSexPref";

interface UserCardProps {
  user: UserCardInfo;
}

const props = defineProps<UserCardProps>();

const age = computed(() => getAge(props.user.dateOfBirth));
const gender = computed(() => genderIcons[props.user.gender] || genderIcons.other);
const sexPref = computed(() => getSexPref(props.user.gender, props.user.sexPref))
let {address} = await useReverseGeocoding(props.user.location);
watch(() => props.user.id, async () => {
  let {address: newAddress} = await useReverseGeocoding(props.user.location);
  address = newAddress
})
</script>

<template>
  <figure>
    <img
      :src="user.image"
      alt="User profile picture"
      class="profile-pic"
    />
  </figure>
  <div class="card-info">
    <p v-if="address" class="location">
      <span class="typicons-location">{{ address }}</span>
    </p>
    <p class="main-user-info">{{ user.firstName }}, {{ age }}</p>
    <ul class="tag-list">
      <li v-for="tag in user.tags">{{ tag }}</li>
    </ul>
    <div class="gender-info">
      <div>Gender:
        <p>{{ gender }}</p>
      </div>
      <div>Prefers:
        <p>{{ sexPref }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-pic {
  position: relative;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: none;
}

figure {
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
  pointer-events: none;
  box-shadow: 0px -145px 153px 12px rgba(104, 23, 23, 0.85) inset;
}

.card-info {
  position: relative;
  z-index: 3;
  color: #fffff0;
  padding: 0.5rem 0.85rem;
}

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
}

p.location {
  font-weight: 400;
}

p.location span::before {
  color: #fffff0;
}

.gender-info {
  display: flex;
  gap: 2rem;
  padding-bottom: 1rem;
}

.gender-info p {
  font-weight: 600;
}
</style>
