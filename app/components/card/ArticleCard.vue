<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      imageUrl: string;
      title: string;
      description?: string | null;
      date: string;
      link?: string;
      tags: Tag[];
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
  const hoverAreaOn = ref(false);
  const hoverTagOn = ref(false);
  function toggleAreaHover(state: boolean) {
    hoverAreaOn.value = state;
  }
  function toggleTagHover(state: boolean) {
    hoverTagOn.value = state;
  }
  const hoverOn = computed(() => hoverAreaOn.value && !hoverTagOn.value);
</script>

<template>
  <div>
    <router-link
      class="w-full flex h-83 z-30"
      v-if="link"
      :to="link"
      @mouseenter="toggleAreaHover(true)"
      @mouseleave="toggleAreaHover(false)"
    >
      <div
        class="w-[44%] h-full border rounded-tl-4xl rounded-bl-4xl overflow-hidden"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          alt=""
          class="w-full h-full object-cover"
        />
      </div>
      <div
        class="w-[56%] h-full flex justify-center items-center relative rounded-tr-4xl rounded-br-4xl border border-l-0"
        :class="hoverOn ? 'bg-contrast' : 'bg-background'"
      >
        <div class="flex flex-col items-start w-[70%] h-[80%] z-10">
          <div class="text-title-l mb-3 w-full text-left">
            {{ title }}
          </div>
          <div class="text-body-xxs mb-5 w-full text-left">
            {{ formattedDate }}
          </div>
          <div
            v-if="description"
            class="text-body-xxs line-clamp-4 mb-3 w-full text-left"
          >
            {{ description }}
          </div>
          <div class="relative w-full">
            <CardTagCloudCard
              class="absolute top-0 flex flex-wrap z-50"
              @tag-hovered="toggleTagHover(true)"
              @tag-unhovered="toggleTagHover(false)"
              :tags="tags"
            />
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
