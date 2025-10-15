<script setup lang="ts">
  import { abc } from "@/utils/abc";
  const config = useRuntimeConfig();
  const i18n = useI18n();
  const locale = useState("locale") as Ref<"en" | "ru" | "de" | undefined>;
  const { data } = await useFetch(
    () => `/tags?pagination[pageSize]=999&locale=${locale.value}`,
    {
      baseURL: config.public.apiBase,
      watch: [locale],
    }
  );
  function getTagsByFirstLetter(letter: string, tags: any[]) {
    return tags.filter(
      (tag) => tag.name[0].toLowerCase() === letter.toLowerCase()
    );
  }
</script>
<template>
  <div v-if="locale && data.data" class="w-full flex flex-col items-start">
    <div class="text-title-m text-primary mb-10 mt-18">
      {{ i18n.t("tagsList") }}
    </div>
    <TagsBlock
      v-for="letter in [...abc.ru, ...abc.en]"
      :letter="letter"
      :tags="getTagsByFirstLetter(letter, data.data)"
      :key="letter"
    />
  </div>
</template>
