<script setup lang="ts">
  const config = useRuntimeConfig();
  const page = ref(1);
  const allPosts = ref<Post[]>([]); // Your accumulated posts
  const showPagnator = ref(true);
  const { data, error, pending } = useFetch<StrapiResponse>(
    () =>
      `/posts?sort=publishedAt:desc&pagination[page]=${page.value}&pagination[pageSize]=6&populate=*`,
    {
      baseURL: config.public.apiBase,
      // This makes it reactive to page changes
      watch: [page],
    }
  );

  watch(data, (val) => {
    console.log("Data received:", val);
  });

  onMounted(() => {
    console.log("Hydrated data:", data.value);
  });
  watch(
    data,
    (newData) => {
      if (newData?.data) {
        if (page.value === 1) {
          // First page: replace all
          allPosts.value = newData.data;
        } else {
          // Subsequent pages: concatenate
          allPosts.value = [...allPosts.value, ...newData.data];
        }
      }
      if (!newData?.data.length || newData?.data.length < 6) {
        showPagnator.value = false;
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
