<script setup lang="ts">
  import GulagMap from "@/assets/images/gulag-map.png";
  import OralHistory from "@/assets/images/oral-history.png";
  import InCaptivity from "@/assets/images/in-captivity.png";
  definePageMeta({
    layout: "wide",
  });
  const i18n = useI18n();
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-full pl-18 mt-26 mb-47 relative">
      <img :src="GulagMap" alt="" />
      <div class="absolute left-[20%] bottom-[5%] text-title-m">
        <a href="#">{{ `${i18n.t("toProjectPage")} →` }}</a>
      </div>
    </div>
    <div class="w-full pl-70 pr-40 mb-41 relative">
      <img class="w-full" :src="OralHistory" alt="" />
      <div class="absolute right-[30%] bottom-0 text-title-m">
        <a href="#">{{ `${i18n.t("toProjectPage")} →` }}</a>
      </div>
    </div>
    <div class="ml-45 mr-40 mb-40 relative">
      <img class="w-full" :src="InCaptivity" alt="" />
      <div class="absolute left-[18%] bottom-[15%] text-title-m">
        <a href="#">{{ `${i18n.t("toProjectPage")} →` }}</a>
      </div>
    </div>
  </div>
</template>
