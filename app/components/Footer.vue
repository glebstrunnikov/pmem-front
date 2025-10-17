<script setup lang="ts">
  import logo from "@/assets/images/logo-white.png";
  const locale = useState("locale");
  const i18n = useI18n();
  const switchLocale = (newLocale: "ru" | "en" | "de") => {
    const locale = useState("locale");
    const localeCookie = useCookie("locale");
    locale.value = newLocale;
    localeCookie.value = newLocale;
    i18n.setLocale(newLocale);
  };
</script>

<template>
  <div class="w-full px-22 py-17 bg-black">
    <div class="flex flex-col md:flex-row justify-between gap-12">
      <div class="flex flex-col items-start">
        <UiBaseButton
          class="mt-3"
          :label="i18n.t('news')"
          type="contrast"
          link="/posts"
        />
        <UiBaseButton
          class="mt-3"
          :label="i18n.t('projects')"
          type="contrast"
          link="/projects"
        />
        <UiBaseButton
          class="mt-3"
          :label="i18n.t('about')"
          type="contrast"
          link="/about"
        />
        <div class="flex items-center mt-12 text-contrast text-title-m">
          <UiBaseIcon icon="language" class="mr-4" />
          <UiBaseButton
            label="рус"
            type="contrast"
            @click="switchLocale('ru')"
          />
          <div class="mx-2">/</div>
          <UiBaseButton
            label="eng"
            type="contrast"
            @click="switchLocale('en')"
          />
          <div class="mx-2">/</div>
          <UiBaseButton
            label="deu"
            type="contrast"
            @click="switchLocale('de')"
          />
        </div>
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
