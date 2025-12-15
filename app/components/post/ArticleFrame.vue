<script setup lang="ts">
  const i18n = useI18n();
  defineProps<{
    parentClass?: string;
  }>();
</script>

<template>
  <div
    class="w-[150%] h-[2px] max-md:hidden -ml-20 bg-black absolute top-80 z-10"
  ></div>

  <div
    class="md:border md:border-[2px] rounded-4xl flex flex-col items-center md:pt-29 relative z-20 bg-background"
    :class="parentClass"
  >
    <slot></slot>
  </div>
</template>
