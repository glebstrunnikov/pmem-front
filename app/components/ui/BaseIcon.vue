<script setup lang="ts">
  import LanguageIcon from "@/assets/icons/language.svg?raw";

  const props = defineProps<{
    icon: string;
    color?: string;
  }>();

  const icons = {
    language: { source: LanguageIcon, defaultColor: "#DBDBDB" },
  };

  const colorStyle = computed(() => {
    return props.color
      ? `color:${props.color}`
      : icons[props.icon as keyof typeof icons].defaultColor
      ? `color:${icons[props.icon as keyof typeof icons].defaultColor}`
      : "color:#000";
  });
</script>

<template>
  <div
    v-html="icons[icon as keyof typeof icons].source"
    :style="colorStyle"
  ></div>
</template>
