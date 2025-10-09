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
</script>

<template>
  <div class="flex flex-col w-full bg-background z-20">
    <div v-if="scrollY > 100" class="h-[255px] relative w-full"></div>
    <div
      class="w-full flex flex-col bg-background transition-all"
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
          <div class="font-title text-title-xl text-primary">
            <router-link to="/"> Пермский Мемориал </router-link>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-28">
            <UiBaseButton
              label="События"
              :type="
                isActive('posts') || isMain
                  ? 'transparent-active'
                  : 'transparent'
              "
            />
            <UiBaseButton
              label="Проекты"
              :type="
                isActive('projects') ? 'transparent-active' : 'transparent'
              "
            />
            <UiBaseButton
              label="О нас"
              :type="isActive('about') ? 'transparent-active' : 'transparent'"
            />
          </div>
        </div>
      </div>
      <div class="h-[1px] w-full bg-black border-none"></div>
    </div>
  </div>
</template>
