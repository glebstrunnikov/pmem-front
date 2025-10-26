<script setup lang="ts">
  const switchLang = useSwitchLocale();
  const locale = useState("locale");
</script>

<template>
  <div class="flex justify-centeritems-center text-primary-fade text-title-m">
    <UiBaseIcon icon="language" color="rgba(76, 71, 76, 0.5)" class="mr-4" />
    <UiBaseButton
      label="рус"
      :type="locale === 'ru' ? 'transparent' : 'fade'"
      @click="switchLang('ru')"
    />
    <div class="mx-2">/</div>
    <UiBaseButton
      :class="locale === 'en' ? '' : 'text-primary'"
      label="eng"
      :type="locale === 'en' ? 'transparent' : 'fade'"
      @click="switchLang('en')"
    />
    <div class="mx-2">/</div>
    <UiBaseButton
      :class="locale === 'de' ? '' : 'text-primary'"
      label="deu"
      :type="locale === 'de' ? 'transparent' : 'fade'"
      @click="switchLang('de')"
    />
  </div>
</template>
