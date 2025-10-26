<script setup lang="ts">
  withDefaults(
    defineProps<{
      block: any;
    }>(),
    {
      block: {},
    }
  );
  function getStringClass(child: TextNode) {
    let result = "whitespace-pre-line";
    if (child.bold) result += " font-bold";
    if (child.italic) result += " italic";
    if (child.underline) result += " underline";
    if (child.strikethrough) result += " line-through";
    return result.trim();
  }
</script>

<template>
  <span :class="getStringClass(block)" v-if="block.type === 'text'">{{
    block.text
  }}</span>
  <span v-else-if="block.type === 'link'">
    <a
      :href="block.url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-indigo hover:underline"
    >
      <TextNode v-for="(child, i) in block.children" :key="i" :block="child" />
    </a>
  </span>
  <slot></slot>
</template>
