<script setup lang="ts">
import { useRoute } from "vue-router";
const navigate = useNavigate();
const config = useRuntimeConfig();
const route = useRoute();
const slug = route.params.slug;
const i18n = useI18n();
const locale = useState("locale");
import { getRandomColorStyle } from "@/utils/getRandomColorStyle";


const { data, error, pending } = useFetch(
  () =>
    `/interviews?filters[slug][$eq]=${slug}&populate=*`,
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
  {{ data.data[0] }}
  <div v-if="data?.data.length" class="w-full pb-20 bg-background relative mt-18">

    <PostArticleFrame>
      <div class="w-full flex justify-center items-center max-w-[60%] mb-22 z-10">
      </div>
      <div class="w-full md:w-[60%] mb-20 text-primary text-title-xl">
        {{ data.data[0]?.title }}
      </div>

      <div class="w-full md:w-[60%] mb-10 max-h-[80dvh]">
        <img :src="config.public.url + data.data?.[0]!.cover?.url" alt="Cover Image"
          class="max-h-[80dvh] w-full object-cover" />
      </div>

      <PostTextArea :content="data.data[0]?.content" />



      <PostShares />
    </PostArticleFrame>
  </div>
</template>
