<script setup lang="ts">
  const props = defineProps<{
    label: string;
    type: "transparent" | "transparent-active" | "contrast" | "fade";
    link?: string;
  }>();
  const styleClass = computed(() => {
    switch (props.type) {
      case "transparent":
        return "bg-transparent text-title-m text-primary";
      case "fade":
        return "bg-transparent text-title-m text-primary-fade";
      case "transparent-active":
        return "bg-transparent-active text-title-m text-primary-active";
      case "contrast":
        return "bg-transparent text-contrast text-title-m";
      default:
        return "";
    }
  });
</script>

<template>
  <router-link v-if="link" :to="link"
    ><div class="cursor-pointer" :class="styleClass">
      {{ label }}
    </div></router-link
  >
  <div v-else class="cursor-pointer" :class="styleClass">
    {{ label }}
  </div>
</template>
