<script setup lang="ts">
  import { useRoute } from "vue-router";
  const navigate = useNavigate();
  const config = useRuntimeConfig();
  const route = useRoute();
  const slug = route.params.slug;
  const i18n = useI18n();
  interface PostData {
    data: Post[];
  }
  const { data, error, pending } = useFetch<PostData>(
    `/posts?filters[slug][$eq]=${slug}&populate=*`,
    {
      baseURL: config.public.apiBase,
    }
  );

  watch(
    data,
    (val) => {
      console.log("Data received:", val);
      if (val?.data && val.data?.length === 0) {
        navigate("/");
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
</script>

<template>
  <div v-if="data?.data.length" class="w-full">
    <div class="w-full py-6 text-body-m flex justify-between items-center">
      <div class="max-w-100">{{ data.data?.[0]!.title }}</div>
      <router-link to="/">{{ `← ${i18n.t("toMainPage")}` }}</router-link>
    </div>
    <div class="border flex flex-col items-center py-29">
      <div class="w-[60%] mb-20 text-primary text-title-xxl">
        {{ data.data?.[0]!.title }}
      </div>
      <div class="w-[60%] text-title-l text-primary">
        {{ data.data?.[0]!.lead }}
      </div>
      <div v-if="data.data?.[0]!.video" class="w-[85%] mb-10">
        <video
          :src="config.public.url + data.data?.[0]!.video?.url"
          controls
          class="w-full"
        ></video>
      </div>

      <template v-for="(block, index) in data.data?.[0]!.content" :key="index">
        <div
          class="w-[60%] mb-2"
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
          <p v-if="block.type === 'paragraph'" class="text-body-m">
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
            class="w-[85%] mb-2"
        /></template>

        <template v-if="block.type === 'list'">
          <ul
            v-if="block.format === 'unordered'"
            class="w-[60%] text-start text-primary"
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
            class="w-[60%] text-start text-primary"
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
    </div>
  </div>
</template>
