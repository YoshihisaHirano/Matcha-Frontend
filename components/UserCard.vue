<script setup lang="ts">
import { UserCardInfo } from "~/types/global";
import { getAge } from "~/utils/getAge";

interface UserCardProps {
  user: UserCardInfo;
}

const props = defineProps<UserCardProps>();

const age = getAge(props.user.dateOfBirth);
console.log(age, props.user.dateOfBirth);
</script>

<template>
  <figure>
    <img
      src="https://res.cloudinary.com/dbg2mpr1s/image/upload/v1579982715/zoYaXsiENqY.jpg_cmhoi8.jpg"
      alt="User profile picture"
      class="profile-pic"
    />
  </figure>
  <div class="card-info">
    <p class="main-user-info">{{ user.firstName }}, {{ age }}</p>
    <ul class="tag-list">
        <li v-for="tag in user.tags">{{ tag }}</li>
    </ul>
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
  box-shadow: 0px -115px 153px 12px rgba(104, 23, 23, 0.85) inset;
}

.card-info {
    position: relative;
    z-index: 3;
    color: #fffff0;
    padding: 0.5rem 0.85rem;
}

.main-user-info {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: .85rem;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    gap: .5rem;
    padding: 0;
    padding-bottom: .75rem;
}

.tag-list li {
    background: var(--accent-red);
    padding: 0.08rem 0.37rem;
    border-radius: .55rem;
    font-weight: 400;
    font-size: 1.1rem;
}
</style>
