<script setup lang="ts">
  import logo from "~/assets/images/logo.png";
  const route = useRoute();
  const isActive = (path: string) => {
    const segments = route.fullPath.split("/");
    return segments[1] === path;
  };
  const isMain = () => {
    route.fullPath === "/" || route.fullPath === "/index";
  };
</script>

<template>
  <div class="w-full flex justify-between items-center">
    <div class="flex items-center">
      <img class="mr-24" :src="logo" alt="" />
      <div class="font-title text-title-xl text-primary">Пермский Мемориал</div>
    </div>
    <div>
      <div class="flex items-center gap-28">
        <UiBaseButton
          label="События"
          :type="
            isActive('posts') || isMain() ? 'transparent-active' : 'transparent'
          "
        />
        <UiBaseButton
          label="Проекты"
          :type="isActive('projects') ? 'transparent-active' : 'transparent'"
        />
        <UiBaseButton
          label="О нас"
          :type="isActive('about') ? 'transparent-active' : 'transparent'"
        />
      </div>
    </div>
  </div>
  <div class="mt-34 h-[1px] w-full bg-black"></div>
</template>
