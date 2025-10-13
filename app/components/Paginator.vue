<script setup lang="ts">
  defineProps<{
    isLoading: boolean;
  }>();
  const i18n = useI18n();
</script>

<template>
  <div
    class="border rounded-4xl flex justify-center items-center px-25 py-8 cursor-pointer"
    :class="
      isLoading
        ? 'hover:bg-contrast bg-contrast'
        : 'hover:bg-indigo  text-indigo hover:text-contrast'
    "
  >
    <div :class="isLoading ? 'text-title-xxxl' : 'text-title-l'">
      {{ isLoading ? i18n.t("loading") : i18n.t("loadMore") }}
    </div>
  </div>
</template>
