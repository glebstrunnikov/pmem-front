<script setup lang="ts">
  import Shares from "~/components/post/Shares.vue";

  const route = useRoute();
  const i18n = useI18n();
  const config = useRuntimeConfig();
  const { data } = await useFetch(() => `/in-captivity`, {
    baseURL: config.public.apiBase,
  });
  const postsData = await useFetch(
    () =>
      `/interviews?fields[0]=title&fields[1]=publishedAt&fields[2]=id&fields[3]=slug&populate=cover`,
    {
      baseURL: config.public.apiBase,
    }
  ).data;
</script>

<template>
  <!-- text-indigo text-brick text-jungle text-clay text-slate -->
  <div v-if="!!data?.data" class="w-full mt-18 pb-20 bg-background relative">
    <!-- <div class="w-full my-6 text-body-m flex justify-between items-center">
      <div class="max-w-100">{{ data.data?.[0]!.title }}</div>
      <div>{{ formattedDate }}</div>
      <router-link to="/">{{ `← ${i18n.t("toMainPage")}` }}</router-link>
    </div> -->
    <PostArticleFrame parent-class="pb-25">
      <div class="w-full md:w-[60%] mb-20 text-primary text-title-xl">
        {{ data.data?.title }}
      </div>

      <PostTextArea :content="data.data?.content" />
    </PostArticleFrame>
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pt-16 bg-background mb-25"
      v-if="postsData"
    >
      <CardArticleCard
        v-for="post in postsData.data"
        :key="post.id"
        :title="post.title"
        :imageUrl="config.public.url + post.cover?.url"
        :date="post.publishedAt"
        :link="'/in-captivity/interview/' + post.slug"
        :tags="post.tags"
      />
    </div>
  </div>
</template>
