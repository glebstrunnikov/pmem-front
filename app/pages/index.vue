<script setup lang="ts">
  const config = useRuntimeConfig();

  const { data, error, pending } = useFetch<StrapiResponse>(
    "/posts?sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=6&populate=*",
    {
      baseURL: config.public.apiBase,
    }
  );

  watch(data, (val) => {
    console.log("Data received:", val);
  });

  onMounted(() => {
    console.log("Hydrated data:", data.value);
  });
</script>
<template>
  <!-- <div v-if="data">{{ data }}</div> -->
  <div
    v-if="data"
    class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pt-16 bg-background mb-23"
  >
    <ArticleCard
      v-for="post in data.data"
      :key="post.id"
      :title="post.Title"
      :imageUrl="config.public.url + post.Cover?.formats.medium.url"
      :date="post.publishedAt"
    />
  </div>
  <div class="w-full flex justify-center mb-21">
    <Paginator />
  </div>
</template>
