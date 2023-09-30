<script setup lang="ts">
import { ExtendedSignupUserData } from "~/types/global";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { sexPrefOptions } from "~/utils/getSexPref";

definePageMeta({
  layout: "empty",
});

useSeoMeta({
  title: "Sign Up | Matcha",
});

const initialState: Partial<ExtendedSignupUserData> = {
  gender: 'other',
  sexPref: 'both',
  dateOfBirth: undefined,
  tags: [],
  biography: "",
  mainImage: "",
  pictures: [],
  location: { lat: 40, lon: 40 },
};

const data = ref({ ...initialState });

function onSubmitUserInfo() {
  console.log("submit");
}

function updatePictures(pictures: string[]) {
  data.value.mainImage = pictures[0];
  data.value.pictures = pictures.slice(1);
}
</script>

<template>
  <main>
    <ThemeToggle />
    <div class="content">
      <h2>Tell us about yourself</h2>
      <div class="form-wrapper">
        <GenericForm @submit="onSubmitUserInfo">
          <div class="input-group">
            <label for="birth-date">
              <span class="date-label">Birthday</span>
              <Datepicker
                model-type="timestamp"
                :text-input="true"
                :enable-time-picker="false"
                :max-date="minus18Years()"
                name="birth-date"
                v-model="data.dateOfBirth"
                position="left"
                :clearable="false"
              />
            </label>
            <PhotoPicker
              button-text="Open photos editor"
              @update-pictures="updatePictures"
            />
          </div>
          <div class="input-group">
            <Dropdown
              :options="sexPrefOptions"
              v-model="data.sexPref"
              label="Sex preference"
            />
            <Dropdown
              :options="Object.keys(genderIcons)"
              v-model="data.gender"
              label="Gender"
            />
          </div>
          <div>
            <h3>Choose up to 10 hobbies and interests</h3>
            <TagList showAdd :tags="data.tags || []"></TagList>
          </div>
          <Input
            v-model="data.biography"
            required
            isTextarea
            id="biography"
            name="biography"
            type="text"
            label="Biography"
            icon="book"
          />
          <Button type="submit" variant="fancy">Submit</Button>
        </GenericForm>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 0.5rem;
  height: 100vh;
}

.content {
  margin: 0 auto;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-wrapper {
  padding: 2.5rem 4rem 3rem;
  border: 10px solid;
  border-image-slice: 1;
  border-width: 5px;
  border-image-source: linear-gradient(to left, #fdbb2d, #b21f1f, #1a2a6c);
  box-shadow: 0 0.5rem 0.3rem rgba(0, 0, 0, 0.15);
}

.form-content {
  display: flex;
  gap: 1rem;
}
</style>
