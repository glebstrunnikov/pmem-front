<script setup lang="ts">
  const locale = useState("locale");
  const { data } = await useFetch(() => `/about?locale=${locale.value}`, {
    baseURL: useRuntimeConfig().public.apiBase,
    watch: [locale],
  });
</script>

<template>
  <div v-if="data.data" class="w-full relative whitespace-pre-line">
    <div class="w-[150%] h-[1px] -ml-20 bg-black absolute top-80 z-10"></div>
    <div
      class="w-full flex justify-center items-center border rounded-4xl my-8 bg-background z-20 relative"
    >
      <div class="w-[60%] py-34">
        <div
          v-for="(pg, idx) in data.data.contentTop"
          :key="idx"
          :class="
            idx === 0
              ? 'text-title-xxxl text-primary mb-17'
              : idx === data.data.contentTop.length - 1
              ? 'text-title-l-thin mb-6 text-right'
              : 'text-title-l-thin mb-6'
          "
        >
          {{ pg.children[0].text }}
        </div>
      </div>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div
        class="flex justify-center items-center border rounded-4xl"
        v-for="topIdx in 2"
        :key="topIdx"
      >
        <div class="w-[60%] py-34">
          <div
            v-for="(pg, idx) in topIdx === 1
              ? data.data.contentLeft
              : data.data.contentRight"
            :block="pg"
            :key="idx"
            class="mb-6"
          >
            <PostTextNode
              v-for="(child, i) in pg.children"
              :key="i"
              :block="child"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
