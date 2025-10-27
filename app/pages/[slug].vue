<script setup lang="ts">
  import LogoBackground from "@/assets/images/logo-background.png";
  definePageMeta({
    layout: "wide",
  });
  const i18n = useI18n();
</script>
<template>
  <div class="w-full relative">
    <div class="w-full absolute top-30 flex justify-start">
      <div class="w-[30%]"></div>
      <img :src="LogoBackground" alt="" />
    </div>
    <div
      class="w-full flex flex-col justify-center items-center text-center h-[80dvh] relative"
    >
      <div class="text-title-mega italic text-primary-active">404</div>
      <div class="text-title-mono text-primary-active">
        {{ `(error:${i18n.t("pageNotFound")})` }}
      </div>
      <div class="text-title-xl text-primary mb-4">
        {{ i18n.t("reachOut") }}
      </div>
      <div class="text-title-xl text-primary">pmemeuropa@gmail.com</div>
    </div>
  </div>
</template>
