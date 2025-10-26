<script setup lang="ts">
  defineProps<{ content: contentNode[] }>();

  function getHeadingStyle(level: number) {
    switch (level) {
      case 1:
        return "text-title-xxxxxl text-primary-active";
      case 2:
        return "text-title-xxxxxl text-primary";
      case 3:
        return "text-title-xxxxl text-primary";
      case 4:
        return "text-title-xxxl text-primary";
      case 5:
        return "text-title-xxl text-primary";
      case 6:
        return "text-title-l text-primary";
      default:
        return "";
    }
  }
</script>
<template>
  <template v-for="(block, index) in content" :key="index">
    <div
      class="w-full md:w-[60%] mb-2"
      v-if="
        block.type === 'paragraph' ||
        block.type === 'heading' ||
        block.type === 'quote'
      "
    >
      <div
        v-if="block.type === 'heading'"
        :class="getHeadingStyle(block.level)"
      >
        <PostTextNode
          v-for="(child, index) in block.children"
          :block="child"
          :key="index"
        />
      </div>
      <p v-if="block.type === 'paragraph'" class="text-title-l-thin">
        <PostTextNode
          v-for="(child, index) in block.children"
          :block="child"
          :key="index"
        />
      </p>
      <div
        v-if="block.type === 'quote'"
        class="italic text-title-m text-primary-active"
      >
        <span>“</span
        ><PostTextNode
          v-for="(child, index) in block.children"
          :block="child"
          :key="index"
        /><span>”</span>
      </div>
    </div>
    <template v-if="block.type === 'code'">
      <div v-html="block.children[0]!.text"></div>
    </template>

    <template v-if="block.type === 'image'">
      <img
        :src="block.image.url"
        :alt="block.image.name || 'Image'"
        class="w-full md:w-[80%] mb-2 max-h-[80dvh] object-contain"
    /></template>

    <template v-if="block.type === 'list'">
      <ul
        v-if="block.format === 'unordered'"
        class="w-full md:w-[60%] text-start text-primary"
      >
        <li v-for="(item, idx) in block.children" :key="idx">
          <PostTextNode
            v-for="(child, index) in item.children"
            :block="child"
            :key="index"
          />
        </li>
      </ul>
      <ol
        v-if="block.format === 'ordered'"
        class="w-full md:w-[60%] text-start text-primary"
      >
        <li v-for="(item, idx) in block.children" :key="idx">
          <PostTextNode
            v-for="(child, index) in item.children"
            :block="child"
            :key="index"
          />
        </li>
      </ol>
    </template>
  </template>
</template>
