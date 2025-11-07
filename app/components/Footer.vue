<script setup lang="ts">
import logo from "@/assets/images/logo-white.png";
const i18n = useI18n();
</script>

<template>
  <div class="w-full px-22 py-17 bg-black">
    <div class="flex flex-col md:flex-row justify-between gap-12">
      <div class="flex flex-col items-start">
        <UiBaseButton class="mt-3" :label="i18n.t('news')" type="contrast" link="/" />
        <UiBaseButton class="mt-3" :label="i18n.t('projects')" type="contrast" link="/projects" />
        <UiBaseButton class="mt-3" :label="i18n.t('about')" type="contrast" link="/about" />
        <!-- <LanguageSwitcher /> -->
      </div>
      <div class="flex flex-col justify-between items-start md:items-end">
        <div class="text-title-m text-contrast mb-12 md:mb-7">
          © Perm Memorial - Europa e.V., 2025
        </div>
        <img :src="logo" alt="Logo" class="w-[110px]" />
      </div>
    </div>
  </div>
</template>
