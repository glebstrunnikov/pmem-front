<script setup lang="ts">
  import { useRoute } from "vue-router";
  const navigate = useNavigate();
  const config = useRuntimeConfig();
  const route = useRoute();
  const slug = route.params.slug;
  const i18n = useI18n();
  const locale = useState("locale");
  import { getRandomColorStyle } from "@/utils/getRandomColorStyle";

  const { data, error, pending } = await useFetch(
    () => `/interviews?filters[slug][$eq]=${slug}&populate=*`,
    {
      baseURL: config.public.apiBase,
    }
  );

  // function updateMetatags(post: Post) {
  //   useHead({
  //     title: post.title,
  //     meta: [
  //       {
  //         name: "description",
  //         content: post.lead || post.title,
  //       },
  //       {
  //         property: "og:title",
  //         content: post.title,
  //       },
  //       {
  //         property: "og:type",
  //         content: "article",
  //       },
  //       {
  //         property: "og:url",
  //         content: `${config.public.url || ""}/posts/${post.slug}`,
  //       },
  //       {
  //         name: "twitter:card",
  //         content: "summary_large_image",
  //       },
  //       {
  //         name: "twitter:title",
  //         content: post.title,
  //       },
  //       {
  //         name: "twitter:description",
  //         content: post.lead || post.title,
  //       },
  //       ...(post.cover
  //         ? [
  //           {
  //             property: "og:image",
  //             content: config.public.url + post.cover.url,
  //           },
  //           {
  //             name: "twitter:image",
  //             content: config.public.url + post.cover.url,
  //           },
  //         ]
  //         : []),
  //     ],
  //   });
  // }
</script>

<template>
  <!-- text-indigo text-brick text-jungle text-clay text-slate -->

  <div
    v-if="data?.data.length"
    class="w-full md:pb-20 bg-background relative mt-6 md:mt-18"
  >
    <PostArticleFrame>
      <div class="w-full md:w-[60%] md:mb-20 mb-6 text-primary text-title-xl">
        {{ data.data[0]?.title }}
      </div>

      <div class="w-full md:w-[60%] mb-10 flex justify-center">
        <img
          :src="config.public.url + data.data?.[0]!.cover?.url"
          alt="Cover Image"
          class="max-h-[80dvh] object-cover"
        />
      </div>

      <PostTextArea :content="data.data[0]?.content" />

      <PostShares />
    </PostArticleFrame>
  </div>
</template>
