<script setup lang="ts">
  const props = defineProps<{
    letter: string;
    tags: Array<{ id: number; name: string; slug: string }>;
  }>();
</script>
<template>
  <div
    v-if="letter && tags.length"
    class="w-full flex flex-col items-start mb-8"
  >
    <div class="text-title-xl text-primary mb-5">
      {{ letter + letter.toLowerCase() }}
    </div>
    <div class="flex flex-wrap gap-y-10 gap-x-3">
      <UiBaseBadge v-for="tag in props.tags" :key="tag.id">
        <router-link :to="`/tags/${tag.slug}`"> {{ tag.name }}</router-link>
      </UiBaseBadge>
    </div>
  </div>
</template>
