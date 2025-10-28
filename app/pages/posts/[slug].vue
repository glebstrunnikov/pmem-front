<script setup lang="ts">
import { useRoute } from "vue-router";
const navigate = useNavigate();
const config = useRuntimeConfig();
const route = useRoute();
const slug = route.params.slug;
const i18n = useI18n();
const locale = useState("locale");
const tempLocale = ref(locale.value);
const localeLoopCounter = ref(0);
import { getRandomColorStyle } from "@/utils/getRandomColorStyle";

interface PostData {
  data: Post[];
}
const { data, error, pending } = useFetch<PostData>(
  () =>
    `/posts?filters[slug][$eq]=${slug}&locale=${tempLocale.value}&populate=*`,
  {
    baseURL: config.public.apiBase,
    watch: [tempLocale],
  }
);

watch(locale, (newLocale) => {
  const otherLocaleVersion = data.value?.data[0]?.localizations.find(
    (loc) => loc.locale === newLocale
  );
  if (otherLocaleVersion) {
    navigate(`/posts/${otherLocaleVersion.slug}`);
  }
  tempLocale.value = newLocale;
  localeLoopCounter.value = 0;
});

function updateMetatags(post: Post) {
  useHead({
    title: post.title,
    meta: [
      {
        name: "description",
        content: post.lead || post.title,
      },
      {
        property: "og:title",
        content: post.title,
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "og:url",
        content: `${config.public.url || ""}/posts/${post.slug}`,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: post.title,
      },
      {
        name: "twitter:description",
        content: post.lead || post.title,
      },
      ...(post.cover
        ? [
          {
            property: "og:image",
            content: config.public.url + post.cover.url,
          },
          {
            name: "twitter:image",
            content: config.public.url + post.cover.url,
          },
        ]
        : []),
    ],
  });
}

watch(
  data,
  (val) => {
    console.log("Data received:", val);
    if (val?.data && val.data?.length === 0) {
      console.log("no data");
      if (localeLoopCounter.value > 2) {
        localeLoopCounter.value = 0;
        navigate(`/404`);
        return;
      }

      switch (tempLocale.value) {
        case "en":
          tempLocale.value = "ru";
          localeLoopCounter.value++;
          break;
        case "ru":
          console.log("switching to de");
          tempLocale.value = "de";
          localeLoopCounter.value++;
          break;
        case "de":
          tempLocale.value = "en";
          localeLoopCounter.value++;
          break;
      }
    } else if (val?.data) {
      updateMetatags(val!.data[0]!);
    }
  },
  { immediate: true }
);

const formattedDate = computed(() => {
  if (!data.value.data) return "";
  const date = new Date(data.value.data?.[0]!.publishedAt || new Date());
  return `${date.getDate()}/${date.getMonth() + 1}/${date
    .getFullYear()
    .toString()
    .slice(-2)}`;
});
</script>

<template>
  <!-- text-indigo text-brick text-jungle text-clay text-slate -->
  <div v-if="data?.data.length" class="w-full pb-20 bg-background relative">
    <div class="w-full my-6 text-body-m flex justify-between items-center">
      <div class="max-w-100">{{ data.data?.[0]!.title }}</div>
      <div>{{ formattedDate }}</div>
      <router-link to="/">{{ `← ${i18n.t("toMainPage")}` }}</router-link>
    </div>
    <PostArticleFrame>
      <div class="w-full flex justify-center items-center max-w-[60%] mb-22 z-10">
      </div>
      <div class="w-full md:w-[60%] mb-20 text-primary text-title-xl">
        {{ data.data?.[0]!.title }}
      </div>
      <div class="w-full md:w-[60%] text-title-l mb-6">
        {{ data.data?.[0]!.lead }}
      </div>
      <div v-if="data.data?.[0]!.video" class="w-full md:w-[60%] mb-10 max-h-[80dvh]">
        <video :src="config.public.url + data.data?.[0]!.video?.url" controls class="max-h-[80dvh] w-full"></video>
      </div>
      <div class="w-full md:w-[60%] mb-10 max-h-[80dvh]" v-else-if="data.data?.[0]!.cover">
        <img :src="config.public.url + data.data?.[0]!.cover?.url" alt="Cover Image"
          class="max-h-[80dvh] w-full object-cover" />
      </div>

      <PostTextArea :content="data.data?.[0]!.content" />

      <div v-if="data.data?.[0]!.tags" class="w-full md:w-[60%] mt-20 mb-30">
        <div class="w-full h-[1px] bg-black mb-10"></div>
        <div class="flex flex-wrap gap-6">
          <div class="text-title-l-thick" :class="getRandomColorStyle('text-', tag.name)"
            v-for="(tag, idx) in data.data?.[0]!.tags" :key="idx">
            <router-link :to="`/tags/${tag.slug}`">
              {{ `#${tag.name}` }}</router-link>
          </div>
        </div>
      </div>

      <PostShares />
    </PostArticleFrame>
  </div>
</template>
