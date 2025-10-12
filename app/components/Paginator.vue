<script setup lang="ts">
  defineProps<{
    isLoading: boolean;
  }>();
  const i18n = useI18n();
</script>

<template>
  <div class="border rounded-4xl flex justify-center items-center px-25 py-8">
    <div class="text-indigo text-title-l">
      {{ isLoading ? i18n.t("loading") : i18n.t("loadMore") }}
    </div>
  </div>
</template>
