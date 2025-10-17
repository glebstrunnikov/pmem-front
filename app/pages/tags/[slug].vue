<script setup lang="ts">
  const i18n = useI18n();
  const route = useRoute();
  const locale = useState("locale");
  const navigate = useNavigate();
  const tagSlug = computed(() => {
    if (route.params.slug) {
      return route.params.slug as string;
    }
  });
  const { data } = await useFetch<any>(
    () =>
      `/tags?filters[slug][$eq]=${tagSlug.value}&locale=${locale.value}&populate=localizations`,
    {
      baseURL: useRuntimeConfig().public.apiBase,
    }
  );
  watch(locale, (newLocale) => {
    if (newLocale && data.value) {
      const newLocaleTag = data.value.data[0].localizations.find((loc: any) => {
        return loc.locale === newLocale;
      });
      if (newLocaleTag) {
        navigate(`/tags/${newLocaleTag.slug}`);
      }
    }
  });
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
