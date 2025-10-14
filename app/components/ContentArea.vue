<script setup lang="ts">
  const config = useRuntimeConfig();
  const page = ref(1);
  const firstPosts = ref<Post[]>([]);
  const additionalPosts = ref<Post[]>([]);
  const showPagnator = useState("showPagnator", () => true);
  const locale = useState("locale");
  const route = useRoute();
  const i18n = useI18n();
  const props = withDefaults(
    defineProps<{
      contentClass?: string;
    }>(),
    {
      contentClass:
        "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pt-16 bg-background mb-43",
    }
  );
  const query = computed(() => {
    return route.query.query as string;
  });

  const sort = computed(() => {
    const currentSort = route.query.sort;
    if (currentSort === "new" || !currentSort) {
      return "publishedAt:desc";
    } else {
      return "publishedAt:asc";
    }
  });

  const tagSlug = computed(() => {
    if (route.fullPath.startsWith("/tags/") && route.params.slug) {
      return route.params.slug as string;
    }
  });

  const { data, error, pending } = await useFetch<StrapiResponse>(
    () =>
      `/posts?locale=${locale.value}${
        query.value
          ? `&filters[$or][0][title][$containsi]=${query.value}&filters[$or][1][content][$containsi]=${query.value}`
          : ""
      }${tagSlug.value ? `&filters[tags][slug][$eq]=${tagSlug.value}` : ""}${
        sort.value ? `&sort=${sort.value}` : ""
      }&pagination[page]=${page.value}&pagination[pageSize]=4&populate=*`,
    {
      baseURL: config.public.apiBase,
      watch: [page, locale, query, sort],
    }
  );
  const allPosts = computed(() => {
    if (page.value === 1) {
      return data.value?.data || [];
    } else {
      return [...firstPosts.value, ...additionalPosts.value];
    }
  });
  watch(locale, () => {
    page.value = 1;
  });
  watch(query, () => {
    page.value = 1;
  });
  watch(sort, () => {
    page.value = 1;
  });
  watch(
    data,
    (newData) => {
      if (!!newData?.data && page.value === 1) {
        firstPosts.value = newData.data;
      }
      if (newData?.data && page.value > 1) {
        additionalPosts.value = [...additionalPosts.value, ...newData.data];
      }
      if (!!newData?.data && newData?.data.length < 4) {
        showPagnator.value = false;
      } else {
        showPagnator.value = true;
      }
    },
    { immediate: true }
  );

  const loadMore = () => {
    page.value++;
  };
</script>
<template>
  <div class="w-full flex flex-col">
    <!-- <div v-if="data">{{ data }}</div> -->
    <!-- {{ showPagnator }}
  {{ `newdata: ${newData}` }}
  {{ locale }} -->
    <!-- {{ i18n.t("about") }} -->
    <!-- {{ route }} -->
    <!-- <br /> -->
    <!-- {{ tagSlug }} -->

    <div
      v-if="(query || tagSlug) && !data?.data.length"
      class="w-full flex flex-col items-center text-center mt-18"
    >
      <div class="text-title-xxxl text-tomato mb-11">Ничего не нашлось</div>
      <div class="text-title-xxxl text-primary mb-4">
        Вы можете связаться с нами для уточнения информации:
      </div>
      <div class="text-title-xxxl text-primary">pmemeuropa@gmail.com</div>
    </div>
    <div v-if="data" :class="contentClass">
      <ArticleCard
        v-for="post in allPosts"
        :key="post.id"
        :title="post.title"
        :description="post.lead"
        :imageUrl="config.public.url + post.cover?.formats?.medium.url"
        :date="post.publishedAt"
        :link="'/posts/' + post.slug"
      />
    </div>
    <div v-if="data && showPagnator" class="w-full flex justify-center mb-41">
      <Paginator @click="loadMore" :isLoading="pending" />
    </div>
  </div>
</template>
