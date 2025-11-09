<script setup lang="ts">
  import GulagMap from "@/assets/images/gulag-map.png";
  import OralHistory from "@/assets/images/oral-history.png";
  import InCaptivity from "@/assets/images/in-captivity.png";
  const config = useRuntimeConfig();
  const locale = useState("locale");
  definePageMeta({
    layout: "wide",
  });
  const i18n = useI18n();
  const { data } = await useFetch(
    () => `/projects?locale=${locale.value}&sort=num&populate=*`,
    {
      baseURL: config.public.apiBase,
    }
  );
</script>

<template>
  <div v-if="data" class="w-full h-full flex flex-col">
    <div class="w-full pl-4 md:pl-18 mt-20 md:mt-26 mb-20 md:mb-40 relative">
      <img :src="config.public.url + data.data[0].cover.url" alt="" />
      <div class="max-md:pl-4 md:absolute left-[20%] bottom-[5%] text-title-m">
        <a href="https://map.pmem-europa.de">{{
          `${i18n.t("toProjectPage")} →`
        }}</a>
      </div>
    </div>
    <div class="w-full pl-14 pr-8 md:pl-68 md:pr-35 mb-20 md:mb-40 relative">
      <img
        class="w-full"
        :src="config.public.url + data.data[2].cover.url"
        alt=""
      />
      <div class="max-md:-ml-6 md:absolute right-[30%] bottom-0 text-title-m">
        <a
          href="https://www.youtube.com/watch?v=XDivoFPNs80&list=PLRVpD1oy68rc4HISAx4h2AOC57gLck_vC"
          >{{ `${i18n.t("toProjectPage")} →` }}</a
        >
      </div>
    </div>
    <div class="ml-9 mr-8 md:ml-38 md:mr-40 mb-20 md:mb-40 relative">
      <img
        class="w-full"
        :src="config.public.url + data.data[1].cover.url"
        alt=""
      />
      <div class="md:absolute left-[18%] bottom-[15%] text-title-m">
        <router-link to="/in-captivity">{{
          `${i18n.t("toProjectPage")} →`
        }}</router-link>
      </div>
    </div>
    <template v-for="(project, i) in data.data">
      <div v-if="i > 2" class="mx-8 md:mx-50 mb-20 md:mb-50 relative">
        <img
          class="w-full"
          :src="config.public.url + project.cover.url"
          alt=""
        />
        <div class="text-title-m md:mt-10">
          <a :href="project.link">{{ `${i18n.t("toProjectPage")} →` }}</a>
        </div>
      </div>
    </template>
  </div>
  {{ data }}
</template>
