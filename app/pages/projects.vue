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
    <div class="w-full pl-4 md:pl-18 mt-20 md:mt-26 mb-20 md:mb-40 relative">
      <img :src="GulagMap" alt="" />
      <div class="md:absolute left-[20%] bottom-[5%] text-title-m">
        <a href="https://map.pmem-europa.de">{{ `${i18n.t("toProjectPage")} →` }}</a>
      </div>
    </div>
    <div class="w-full pl-14 pr-8 md:pl-70 md:pr-40 mb-20 md:mb-40 relative">
      <img class="w-full" :src="OralHistory" alt="" />
      <div class="md:absolute right-[30%] bottom-0 text-title-m">
        <a href="https://www.youtube.com/watch?v=XDivoFPNs80&list=PLRVpD1oy68rc4HISAx4h2AOC57gLck_vC">{{
          `${i18n.t("toProjectPage")} →` }}</a>
      </div>
    </div>
    <div class="ml-9 mr-8 md:ml-45 md:mr-40 mb-20 md:mb-40 relative">
      <img class="w-full" :src="InCaptivity" alt="" />
      <div class="md:absolute left-[18%] bottom-[15%] text-title-m">
        <!-- <router-link to="/in-captivity">{{ `${i18n.t("toProjectPage")} →` }}</router-link> -->
        <a href="http://pmem.ru/index.php?id=9803">{{
          `${i18n.t("toProjectPage")} →` }}</a>

      </div>
    </div>
  </div>
</template>
