<script setup lang="ts">
import SearchFilters from "~/components/SearchFilters.vue";

useSeoMeta({
  title: "Search | Matcha",
});

const { data, pending, error } = await useSearch("647jbfbjf");

const cardIdx = ref(0);
const currentCard = computed(() => data.value[cardIdx.value]);

function handleNext(e: Event) {
  if (cardIdx.value < data.value.length) {
    cardIdx.value = cardIdx.value + 1;
  }
}
</script>

<template>
  <SearchFilters />
  <Suspense>
    <section class="search-section">
      <Button class-name="search-btn"
        ><span class="typicons-thumbsDown"></span
      ></Button>
      <div class="cards-collection">
        <div class="outlined-card"></div>
        <CustomLink :href="`/users/${currentCard.id}`">
          <article class="outlined-card main-card">
            <Loader v-if="pending" />
            <p v-else-if="error">Something went wrong...</p>
            <UserCard v-else :user="currentCard" />
          </article>
        </CustomLink>
        <div class="outlined-card"></div>
      </div>
      <Button class-name="search-btn" @click="handleNext"
        ><span class="typicons-heart"></span
      ></Button>
    </section>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
</template>

<style scoped>
.search-section {
  height: 92%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.cards-collection {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: 2rem;
  position: relative;
  width: 100%;
}

.outlined-card {
  width: clamp(350px, 26vw, 26vw);
  aspect-ratio: var(--photo-aspect-ratio);
  border-radius: 0.75rem;
}

div.outlined-card {
  position: absolute;
  box-shadow: 0px 6px 165px 36px rgba(178, 31, 31, 0.55) inset;
  background: var(--card-pattern);
}

div.outlined-card:first-of-type {
  left: 0;
  z-index: 1;
  transform: rotate(-10deg) translate(10vw, -0.3rem) scale(0.9);
}

div.outlined-card:last-of-type {
  right: 0;
  transform: rotate(13deg) translate(-12vw, 1rem) scale(0.92);
}

.main-card {
  position: relative;
  z-index: 2;
  background-color: var(--primary-background);
  box-shadow: 0px 6px 35px 16px rgba(178, 31, 31, 0.55) inset;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.search-btn {
  background: var(--accent-red);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: absolute;
  z-index: 3;
  top: 50%;
  transform: translateY(-50%);
}

.search-btn:first-of-type {
  left: 0;
  filter: brightness(90%);
}

.search-btn:last-of-type {
  right: 0;
  filter: brightness(120%);
}

.search-btn span {
  font-size: 1.5rem;
  line-height: 1;
}

.search-btn span::before {
  margin: 0;
  color: var(--primary-background);
}
</style>
