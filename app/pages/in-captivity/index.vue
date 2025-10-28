<script setup lang="ts">
import Shares from '~/components/post/Shares.vue';

const route = useRoute()
const i18n = useI18n()
const config = useRuntimeConfig();
const { data } = await useFetch(() => `/in-captivity`, {
  baseURL: useRuntimeConfig().public.apiBase,
});
</script>

<template>
  <!-- text-indigo text-brick text-jungle text-clay text-slate -->
  <div v-if="!!data?.data" class="w-full mt-18 pb-20 bg-background relative">
    <!-- <div class="w-full my-6 text-body-m flex justify-between items-center">
      <div class="max-w-100">{{ data.data?.[0]!.title }}</div>
      <div>{{ formattedDate }}</div>
      <router-link to="/">{{ `← ${i18n.t("toMainPage")}` }}</router-link>
    </div> -->
    <PostArticleFrame>
      <div class="w-full flex justify-center items-center max-w-[60%] mb-22 z-10">
      </div>
      <div class="w-full md:w-[60%] mb-20 text-primary text-title-xl">
        {{ data.data?.title }}
      </div>

      <PostTextArea :content="data.data?.content" />


      <PostShares />
    </PostArticleFrame>
  </div>
</template>