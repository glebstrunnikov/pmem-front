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

  watch(
    data,
    (val) => {
      console.log("Data received:", val);
      if (val?.data && val.data?.length === 0) {
        console.log("no data");
        if (localeLoopCounter.value > 2) {
          localeLoopCounter.value = 0;
          navigate(`/`);
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
      }
    },
    { immediate: true }
  );

  function getHeadingStyle(level: number) {
    switch (level) {
      case 1:
        return "text-title-xxxxl";
      case 2:
        return "text-title-xxxl";
      case 3:
        return "text-title-xxl";
      case 4:
        return "text-title-xl";
      case 5:
        return "text-title-l";
      case 6:
        return "text-title-m";
      default:
        return "text-body-m";
    }
  }

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
  <div v-if="data?.data.length" class="w-full pb-20 bg-background relative">
    <div class="w-full my-6 text-body-m flex justify-between items-center">
      <div class="max-w-100">{{ data.data?.[0]!.title }}</div>
      <div>{{ formattedDate }}</div>
      <router-link to="/">{{ `← ${i18n.t("toMainPage")}` }}</router-link>
    </div>
    <ArticleFrame>
      <div
        class="w-full flex justify-center items-center max-w-[60%] mb-22 z-10"
      >
        <CardTagCloudCard :tags="data.data?.[0]!.tags" unwrapped />
      </div>
      <div class="w-full md:w-[60%] mb-20 text-primary text-title-xxl">
        {{ data.data?.[0]!.title }}
      </div>
      <div class="w-full md:w-[60%] text-title-l mb-6">
        {{ data.data?.[0]!.lead }}
      </div>
      <div
        v-if="data.data?.[0]!.video"
        class="w-full md:w-full md:w-[60%] mb-10"
      >
        <video
          :src="config.public.url + data.data?.[0]!.video?.url"
          controls
          class="w-full"
        ></video>
      </div>

      <template v-for="(block, index) in data.data?.[0]!.content" :key="index">
        <div
          class="w-full md:w-[60%] mb-2"
          v-if="
            block.type === 'paragraph' ||
            block.type === 'heading' ||
            block.type === 'quote'
          "
        >
          <div
            v-if="block.type === 'heading'"
            :class="getHeadingStyle(block.level) + ' text-primary'"
          >
            <TextNode
              v-for="(child, index) in block.children"
              :block="child"
              :key="index"
            />
          </div>
          <p v-if="block.type === 'paragraph'" class="text-title-l-thin">
            <TextNode
              v-for="(child, index) in block.children"
              :block="child"
              :key="index"
            />
          </p>
          <div
            v-if="block.type === 'quote'"
            class="italic text-title-m text-primary-active"
          >
            <span>“</span
            ><TextNode
              v-for="(child, index) in block.children"
              :block="child"
              :key="index"
            /><span>”</span>
          </div>
        </div>
        <template v-if="block.type === 'code'">
          <div v-html="block.children[0]!.text"></div>
        </template>

        <template v-if="block.type === 'image'">
          <img
            :src="block.image.url"
            :alt="block.image.name || 'Image'"
            class="w-full md:w-full md:w-[60%] mb-2"
        /></template>

        <template v-if="block.type === 'list'">
          <ul
            v-if="block.format === 'unordered'"
            class="w-full md:w-[60%] text-start text-primary"
          >
            <li v-for="(item, idx) in block.children" :key="idx">
              <TextNode
                v-for="(child, index) in item.children"
                :block="child"
                :key="index"
              />
            </li>
          </ul>
          <ol
            v-if="block.format === 'ordered'"
            class="w-full md:w-[60%] text-start text-primary"
          >
            <li v-for="(item, idx) in block.children" :key="idx">
              <TextNode
                v-for="(child, index) in item.children"
                :block="child"
                :key="index"
              />
            </li>
          </ol>
        </template>
      </template>
      <div class="w-full h-46 mt-29 border-t p-20">
        <div class="flex justify-start items-center gap-15 text-body-m">
          <div>{{ i18n.t("share") }}</div>
        </div>
      </div>
    </ArticleFrame>
  </div>
</template>
