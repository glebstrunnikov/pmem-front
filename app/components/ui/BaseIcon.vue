<script setup lang="ts">
  import LanguageIcon from "@/assets/icons/language.svg?raw";
  import LookingGlassIcon from "@/assets/icons/looking-glass.svg?raw";
  import Cross from "@/assets/icons/cross.svg?raw";
  import Arrows from "@/assets/icons/arrows.svg?raw";
  import ArrowBack from "@/assets/icons/arrow-back.svg?raw";

  const props = defineProps<{
    icon: string;
    color?: string;
  }>();

  const icons = {
    language: { source: LanguageIcon, defaultColor: "#DBDBDB" },
    lookingGlass: { source: LookingGlassIcon, defaultColor: "#4C474C" },
    cross: { source: Cross, defaultColor: "#4C474C" },
    arrows: { source: Arrows, defaultColor: "#4C474C" },
    arrowBack: { source: ArrowBack, defaultColor: "#4C474C" },
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
