<script setup lang="ts">
  const i18n = useI18n();
</script>

<template>
  <SearchTagsPage>
    <router-link to="/tags"
      ><div
        class="flex justify-start items-center text-title-m text-primary mt-18"
      >
        <div>{{ i18n.t("backToTags") }}</div>
        <UiBaseIcon icon="arrowBack" class="ml-5" /></div
    ></router-link>
  </SearchTagsPage>
</template>
