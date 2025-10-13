<script setup lang="ts">
  const config = useRuntimeConfig();

  const { data, error, pending } = useFetch<StrapiResponse>(() => `/posts`, {
    baseURL: config.public.apiBase,
  });
  const allPosts = ref<Post[]>(data.value?.data || []);
  watch(
    data,
    (newData) => {
      if (newData?.data) {
        allPosts.value = newData.data;
      }
    },
    { immediate: true }
  );
</script>
<template>
  <div
    v-if="data"
    class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pt-16 bg-background mb-43"
  >
    <ArticleCard v-for="post in data?.data || []" :key="post.id" />
  </div>
</template>
