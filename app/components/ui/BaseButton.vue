<script setup lang="ts">
  const props = defineProps<{
    label: string;
    type: "transparent" | "transparent-active" | "contrast";
  }>();
  let styleClass;
  switch (props.type) {
    case "transparent":
      styleClass = "bg-transparent text-title-m text-primary";
      break;
    case "transparent-active":
      styleClass = "bg-transparent-active text-title-m text-primary-active";
      break;
    case "contrast":
      styleClass = "bg-transparent text-contrast text-title-m";
      break;
    default:
      styleClass = "";
  }
</script>

<template>
  <div class="cursor-pointer" :class="styleClass">{{ label }}</div>
</template>
