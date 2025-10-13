<script setup lang="ts">
  const config = useRuntimeConfig();
  const page = ref(1);
  // const allPosts = useState<Post[]>("allPosts", () => []);
  const additionalPosts = ref<Post[]>([]);
  const showPagnator = useState("showPagnator", () => true);
  const locale = useState("locale");
  const i18n = useI18n();
  const { data, error, pending } = useFetch<StrapiResponse>(
    () =>
      `/posts?locale=${locale.value}&sort=publishedAt:desc&pagination[page]=${page.value}&pagination[pageSize]=4&populate=*`,
    {
      baseURL: config.public.apiBase,
      // This makes it reactive to page changes
      watch: [page, locale],
    }
  );
  const allPosts = computed(() => {
    if (page.value === 1) {
      return data.value?.data || [];
    } else {
      return [...(data.value?.data || []), ...additionalPosts.value];
    }
  });
  watch(locale, () => {
    page.value = 1; // Reset to first page on locale change
  });
  watch(data, (newData) => {
    if (newData?.data && page.value > 1) {
      additionalPosts.value = [...additionalPosts.value, ...newData.data];
    }
    if (!!newData?.data && newData?.data.length < 4) {
      showPagnator.value = false;
    } else {
      showPagnator.value = true;
    }
  });

  const loadMore = () => {
    page.value++;
  };
</script>
<template>
  <!-- <div v-if="data">{{ data }}</div> -->
  <!-- {{ showPagnator }}
  {{ `newdata: ${newData}` }}
  {{ locale }} -->
  <!-- {{ i18n.t("about") }} -->

  <div
    v-if="data"
    class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pt-16 bg-background mb-43"
  >
    <ArticleCard
      v-for="post in allPosts"
      :key="post.id"
      :title="post.Title"
      :imageUrl="config.public.url + post.Cover?.formats?.medium.url"
      :date="post.publishedAt"
      :link="'/posts/' + post.slug"
    />
  </div>
  <div v-if="showPagnator" class="w-full flex justify-center mb-41">
    <Paginator @click="loadMore" :isLoading="pending" />
  </div>
</template>
