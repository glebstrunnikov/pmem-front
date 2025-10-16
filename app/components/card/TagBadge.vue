<script setup lang="ts">
  withDefaults(
    defineProps<{
      name: string;
      slug?: string;
      styleClass?: string;
    }>(),
    {
      styleClass: "bg-background border text-black",
    }
  );
</script>

<template>
  <div
    v-if="slug"
    class="px-5 py-2 rounded-2xl overflow-hidden border z-60 pointer-events-auto whitespace-nowrap"
    :class="styleClass"
  >
    <router-link :to="`/tags/${slug}`">{{ name }}</router-link>
  </div>
  <div
    v-else
    class="px-5 py-2 rounded-2xl overflow-hidden border z-60 pointer-events-auto whitespace-nowrap"
    :class="styleClass"
  >
    {{ name }}
  </div>
</template>
