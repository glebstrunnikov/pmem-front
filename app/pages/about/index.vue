<script setup lang="ts">
  const locale = useState("locale");
  const { data } = await useFetch(() => `/about?locale=${locale.value}`, {
    baseURL: useRuntimeConfig().public.apiBase,
    watch: [locale],
  });
</script>

<template>
  <div v-if="data.data" class="w-full relative whitespace-pre-line">
    <div
      class="w-[150%] h-[2px] -ml-20 bg-black absolute top-80 z-10 max-md:hidden"
    ></div>
    <div
      class="w-full flex justify-center items-center md:border-[2px] rounded-4xl my-8 bg-background z-20 relative"
    >
      <div
        class="w-full flex flex-col md:py-34 items-center [&>div:last-child]:text-right [&>div:first-child]:mb-4 gap-2"
      >
        <PostTextArea :content="data.data.contentTop" />
      </div>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div
        class="flex flex-col justify-center items-center md:border-[2px] rounded-4xl md:py-23"
        v-for="topIdx in 2"
        :key="topIdx"
      >
        <PostTextArea
          :content="
            topIdx === 1 ? data.data.contentLeft : data.data.contentRight
          "
        />
      </div>
    </div>
  </div>
</template>
