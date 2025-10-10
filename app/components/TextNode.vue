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
    let result = "";
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
</template>
