<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      imageUrl: string;
      title: string;
      description?: string;
      date: string;
      link?: string;
    }>(),
    {
      imageUrl: "",
      title: "Post name",
      description:
        "Post description lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "2025-09-23T18:12:15.374Z",
      link: "",
    }
  );
  const formattedDate = computed(() => {
    if (!props.date) return "";
    const date = new Date(props.date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date
      .getFullYear()
      .toString()
      .slice(-2)}`;
  });
</script>

<template>
  <div>
    <router-link
      class="w-full flex h-83 border rounded-4xl overflow-hidden hover:bg-contrast"
      v-if="link"
      :to="link"
    >
      <div class="w-[44%] h-full border-r">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          alt=""
          class="w-full h-full object-cover"
        />
      </div>
      <div class="w-[56%] h-full px-18 pt-12">
        <div class="flex flex-col items-start">
          <div class="text-title-l mb-3">{{ title }}</div>
          <div class="text-body-xxs mb-6">{{ formattedDate }}</div>
          <div v-if="description" class="text-body-xxs">{{ description }}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>
