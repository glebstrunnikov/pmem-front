<script setup lang="ts">
  const config = useRuntimeConfig();
  const page = ref(1);
  const allPosts = ref<Post[]>([]); // Your accumulated posts
  const showPagnator = ref(true);
  const locale = useState("locale");
  const { data, error, pending } = useFetch<StrapiResponse>(
    () =>
      `/posts?locale=${locale.value}&sort=publishedAt:desc&pagination[page]=${page.value}&pagination[pageSize]=4&populate=*`,
    {
      baseURL: config.public.apiBase,
      // This makes it reactive to page changes
      watch: [page, locale],
    }
  );

  watch(data, (val) => {
    console.log("Data received:", val);
  });
  onMounted(() => {
    console.log("Hydrated data:", data.value);
  });

  watch(locale, () => {
    page.value = 1; // Reset to first page on locale change
  });
  watch(
    data,
    (newData) => {
      console.log("fetching new data");
      console.log(newData?.data);
      console.log(newData?.data.length);
      console.log(newData?.data.length < 4);
      console.log(!!newData?.data && newData?.data.length < 4);
      if (newData?.data) {
        if (page.value === 1) {
          // First page: replace all
          allPosts.value = newData.data;
        } else {
          // Subsequent pages: concatenate
          allPosts.value = [...allPosts.value, ...newData.data];
        }
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
  <!-- <div v-if="data">{{ data }}</div> -->
  <!-- {{ showPagnator }}
  {{ `newdata: ${newData}` }}
  {{ locale }} -->
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
    <Paginator @click="loadMore" />
  </div>
</template>
