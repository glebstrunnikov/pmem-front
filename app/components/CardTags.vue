<script setup lang="ts">
  defineProps<{
    tags: Tag[];
  }>();
  const tagsLongShown = ref(false);
  defineEmits<{
    (e: "tag-hovered"): void;
    (e: "tag-unhovered"): void;
  }>();
</script>
<template>
  <div
    class="card-tags flex flex-wrap gap-x-1 gap-y-4 text-body-xs pointer-events-none"
    :class="tagsLongShown ? '' : 'max-h-25 overflow-hidden'"
  >
    <template v-if="tags.length < 3 || tagsLongShown">
      <TagBadge
        v-for="(tag, idx) in tags"
        :styleClass="
          idx === 0
            ? 'bg-brick text-contrast border-none'
            : idx === 1
            ? 'bg-indigo text-contrast border-none'
            : null
        "
        :name="tag.name"
        :slug="tag.slug"
        :key="tag.slug"
        @mouseenter="$emit('tag-hovered')"
        @mouseleave="$emit('tag-unhovered')"
      >
        {{ tag.name }}
      </TagBadge></template
    >
    <template v-else>
      <TagBadge
        :name="tags[0]?.name"
        :slug="tags[0]?.slug"
        styleClass="!bg-brick !text-contrast border-none"
        @mouseenter="$emit('tag-hovered')"
        @mouseleave="$emit('tag-unhovered')"
      />

      <TagBadge
        :name="tags[1]?.name"
        :slug="tags[1]?.slug"
        styleClass="!bg-indigo !text-contrast border-none"
        @mouseenter="$emit('tag-hovered')"
        @mouseleave="$emit('tag-unhovered')"
      />
      <TagBadge
        :name="`+${tags.length - 2}`"
        @click.prevent="tagsLongShown = !tagsLongShown"
        @mouseenter="$emit('tag-hovered')"
        @mouseleave="$emit('tag-unhovered')"
        styleClass="bg-background border text-black !founded-full !p-0 flex justify-center items-center w-8 h-8"
      >
      </TagBadge>
    </template>
  </div>
</template>
