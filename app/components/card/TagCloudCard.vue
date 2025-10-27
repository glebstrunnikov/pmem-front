<script setup lang="ts">
  const props = defineProps<{
    tags: Tag[];
    unwrapped?: boolean;
  }>();
  const tagsLongShown = ref(props.unwrapped ? true : false);
  defineEmits<{
    (e: "tag-hovered"): void;
    (e: "tag-unhovered"): void;
  }>();
  function getBgStyle(tagName: string) {
    if (["статья", "article", "artikel"].includes(tagName.toLowerCase())) {
      return "bg-indigo";
    }
    if (["видео", "video"].includes(tagName.toLowerCase())) {
      return "bg-brick";
    }
    const palette = [
      "bg-indigo",
      "bg-brick",
      "bg-jungle",
      "bg-clay",
      "bg-slate",
    ];
    const letterNumber = tagName!.charCodeAt(0) % palette.length;
    return palette[letterNumber];
  }
</script>

<template>
  <div
    class="card-tags flex flex-wrap gap-x-1 gap-y-4 text-body-xs pointer-events-none"
    :class="tagsLongShown ? '' : 'max-h-25 overflow-hidden'"
  >
    <template v-if="tags.length < 3 || tagsLongShown">
      <CardTagBadge
        v-for="(tag, idx) in tags"
        :styleClass="getBgStyle(tag.name) + ' text-contrast border-none'"
        :name="tag.name"
        :slug="tag.slug"
        :key="tag.slug"
        @mouseenter="$emit('tag-hovered')"
        @mouseleave="$emit('tag-unhovered')"
      >
        {{ tag.name }}
      </CardTagBadge>
      <CardTagBadge
        v-if="tagsLongShown"
        @click.prevent="tagsLongShown = !tagsLongShown"
        @mouseenter="$emit('tag-hovered')"
        @mouseleave="$emit('tag-unhovered')"
        styleClass="bg-white border text-black !rounded-full !p-0 flex justify-center items-center w-8 h-8  border-none"
      >
        <UiBaseIcon
          class="w-[10px] flex justify-center text-center"
          color="#000"
          icon="cross"
        />
      </CardTagBadge>
    </template>
    <template v-else>
      <CardTagBadge
        :name="tags[0]!.name"
        :slug="tags[0]!.slug"
        class="text-contrast border-none"
        :class="getBgStyle(tags[0]!.name)"
        @mouseenter="$emit('tag-hovered')"
        @mouseleave="$emit('tag-unhovered')"
      />

      <CardTagBadge
        :name="tags[1]!.name"
        :slug="tags[1]!.slug"
        class="text-contrast border-none"
        :class="getBgStyle(tags[1]!.name)"
        @mouseenter="$emit('tag-hovered')"
        @mouseleave="$emit('tag-unhovered')"
      />
      <CardTagBadge
        :name="`+${tags.length - 2}`"
        @click.prevent="tagsLongShown = !tagsLongShown"
        @mouseenter="$emit('tag-hovered')"
        @mouseleave="$emit('tag-unhovered')"
        styleClass="bg-background border text-black !rounded-full !p-0 flex justify-center items-center w-8 h-8"
      >
      </CardTagBadge>
    </template>
  </div>
</template>
