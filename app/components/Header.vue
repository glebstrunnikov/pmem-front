<script setup lang="ts">
  import logo from "~/assets/images/logo.png";
  import { useWindowScroll } from "@vueuse/core";

  const route = useRoute();
  const isActive = (path: string) => {
    const segments = route.fullPath.split("/");
    return segments[1] === path;
  };
  const isMain = computed(() => {
    return route.fullPath === "/" || route.fullPath === "/index";
  });
  const { y: scrollY } = useWindowScroll();
  const i18n = useI18n();
</script>

<template>
  <div class="flex flex-col w-full bg-background z-20">
    <div v-if="scrollY > 100" class="h-[255px] relative w-full"></div>
    <div
      class="w-full flex flex-col bg-background transition-all z-20"
      :class="scrollY > 100 ? 'fixed top-0' : 'relative '"
    >
      <div
        class="flex justify-between items-center w-full flex px-18"
        :class="scrollY > 100 ? ' pt-5 h-[155px] pb-9' : 'pt-17 pb-29'"
      >
        <div class="flex items-center">
          <router-link to="/">
            <img class="mr-24" :src="logo" alt="" />
          </router-link>
          <div class="font-title text-title-xxl text-primary">
            <router-link to="/">{{ i18n.t("orgName") }}</router-link>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-28">
            <UiBaseButton
              :label="i18n.t('news')"
              :type="
                isActive('posts') || isMain
                  ? 'transparent-active'
                  : 'transparent'
              "
              link="/"
            />
            <UiBaseButton
              :label="i18n.t('projects')"
              :type="
                isActive('projects') ? 'transparent-active' : 'transparent'
              "
              link="/projects"
            />
            <UiBaseButton
              :label="i18n.t('about')"
              :type="isActive('about') ? 'transparent-active' : 'transparent'"
              link="/about"
            />
          </div>
        </div>
      </div>
      <div class="h-[1px] w-full bg-black border-none"></div>
    </div>
  </div>
</template>
