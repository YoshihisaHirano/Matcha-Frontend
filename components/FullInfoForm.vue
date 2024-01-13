<script setup lang="ts">
import { ExtendedSignupUserData } from "~/types/global";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { sexPrefOptions } from "~/utils/getSexPref";

const initialState: Partial<ExtendedSignupUserData> = {
  gender: "other",
  sexPref: "both",
  dateOfBirth: undefined,
  tags: [],
  biography: "",
  mainImage: "",
  pictures: [],
  location: { lat: 40, lon: 44 },
};

const data = ref({ ...initialState });
const firstStepOver = computed(() => {
  return !!data.value.dateOfBirth && !!data.value.mainImage;
});

const secondStepOver = computed(() => {
  return !!data.value.tags?.length;
});

const formSteps = computed(() => {
  return [
    {
      label: "Sort out the basics",
      slotName: "basicInfo",
      enableNext: firstStepOver.value,
    },
    {
      label: "Highlight your personality",
      slotName: "interests",
      enableNext: secondStepOver.value,
    },
    {
      label: "Tell your unique story",
      slotName: "bio",
      enableNext: !!data.value.biography,
    },
  ];
});

async function onSubmitUserInfo() {
  // upload pictures to cloudinary
  let uploadedPics: any = null;
  if (data.value.mainImage && data.value.pictures) {
    uploadedPics = await useNewPictures([data.value.mainImage], []);
  }
  if (uploadedPics) {
    data.value.mainImage = uploadedPics.mainImage;
    data.value.pictures = uploadedPics.pictures;
  }
  await useUpdateUser(data.value);
}

function updatePictures(pictures: string[]) {
  data.value.mainImage = pictures[0];
  data.value.pictures = pictures.slice(1);
}

function resetPictures() {
  data.value.mainImage = "";
  data.value.pictures = [];
}

function addTag(tag: string) {
  data.value.tags = [...(data.value?.tags || []), tag];
}

onMounted(() => {
  // geolocation logic
});
</script>

<template>
    <div class="content">
      <h2>First, tell us about yourself</h2>
      <div class="form-wrapper">
        <MultiStepForm :step-data="formSteps" @submit="onSubmitUserInfo">
          <template #basicInfo>
            <div class="input-group">
              <Dropdown
                :options="sexPrefOptions"
                v-model="data.sexPref"
                label="Sex preference*"
                container-class-name="top-dropdown"
              />
              <Dropdown
                :options="Object.keys(genderIcons)"
                v-model="data.gender"
                label="Gender*"
              />
            </div>
            <div class="input-group">
              <label for="birth-date">
                <span class="date-label">Birthday*</span>
                <Datepicker
                  model-type="timestamp"
                  :text-input="true"
                  :enable-time-picker="false"
                  :max-date="minus18Years()"
                  :start-date="minus18Years()"
                  name="birth-date"
                  v-model="data.dateOfBirth"
                  position="left"
                  :clearable="false"
                  :teleport="true"
                />
              </label>
              <PhotoPicker
                @reset="resetPictures"
                close-on-submit
                :label="`Choose at least 1 photo ${data.mainImage ? '✓' : '✗'}`"
                button-text="Open photos editor"
                @update-pictures="updatePictures"
              />
            </div>
          </template>
          <template #interests>
            <div>
              <h3>Choose up to 10 hobbies and interests</h3>
              <TagList
                @add-tag="addTag"
                noModal
                :tags="data.tags || []"
              ></TagList>
            </div>
          </template>
          <template #bio>
            <div>
              <Input
                v-model="data.biography"
                required
                isTextarea
                id="biography"
                name="biography"
                type="text"
                label="Write a short bio"
                icon="book"
                :rows="5"
              />
              <WordCount
                :text="data.biography || ''"
                :maxlength="300"
                class-name="word-count"
              />
            </div>
          </template>
        </MultiStepForm>
      </div>
    </div>
</template>

<style scoped>

.content {
  margin: 0 auto;
  width: 95vw;
  height: 95%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
}

.content h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.form-wrapper {
  width: 100%;
  padding: 1.5rem 1rem 1.5rem;
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

label {
  font-weight: 500;
}

.input-group {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
}

.input-group + .input-group {
  margin-top: 2.5rem;
}

.input-group label,
:global(.input-group .dropdown-label),
:global(.input-group .label) {
  font-size: 1.25rem;
  font-weight: 500;
  width: 100%;
}

.top-dropdown {
  position: relative;
  z-index: 5;
}

@media screen and (min-width: 768px) {
  .content {
    width: 70vw;
  }

  main {
    height: 100vh;
  }

  .form-wrapper {
    height: 500px;
    padding: 2.5rem 4rem 3rem;
  }

  .input-group {
    flex-wrap: nowrap;
    gap: 1.5rem;
  }

  .input-group + .input-group {
    margin-top: 1.5rem;
  }
  .input-group > * {
    flex: 0 0 47%;
  }
}
</style>
