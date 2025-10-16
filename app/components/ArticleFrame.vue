<script setup lang="ts">
  const i18n = useI18n();
</script>

<template>
  <div class="w-[150%] h-[1px] -ml-20 bg-black absolute top-80 z-10"></div>

  <div
    class="md:border rounded-4xl flex flex-col items-center pt-29 relative z-20 bg-background"
  >
    <slot></slot>
  </div>
</template>
