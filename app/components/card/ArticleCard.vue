<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      imageUrl: string;
      title: string;
      description?: string | null;
      date: string;
      link?: string;
      tags?: Tag[];
    }>(),
    {
      imageUrl: "",
      title: "Post name",
      date: "2025-09-23T18:12:15.374Z",
      link: "",
    },
  );
  const formattedDate = computed(() => {
    if (!props.date) return "";
    const date = new Date(props.date);
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date
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
  const titleElement = ref<HTMLElement | null>(null);
  const dateElement = ref<HTMLElement | null>(null);
  const tagsElement = ref<HTMLElement | null>(null);
  const lines = computed(() => {
    if (!titleElement.value || !dateElement.value) return 0;
    const contentHeight = 83 * 0.8 * 4;
    const titleHeight = titleElement.value.offsetHeight;
    const dateHeight = dateElement.value.offsetHeight;
    const tagsHeight = tagsElement.value ? tagsElement.value.offsetHeight : 0;
    const remainingHeight =
      contentHeight - titleHeight - dateHeight - tagsHeight;
    return Math.floor(remainingHeight / 14.85) > 4
      ? 4
      : Math.floor(remainingHeight / 14.85) < 0
        ? 0
        : Math.floor(remainingHeight / 14.85);
  });
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
        class="w-[44%] h-full border border-[2px] rounded-tl-4xl rounded-bl-4xl overflow-hidden"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          alt=""
          class="w-full h-full object-cover"
        />
      </div>
      <div
        class="w-[56%] h-full flex justify-center items-center relative rounded-tr-4xl rounded-br-4xl border border-[2px] border-l-0"
        :class="hoverOn ? 'bg-contrast' : 'bg-background'"
      >
        <div class="flex flex-col items-start w-[70%] h-[80%] z-10">
          <div class="text-title-l pb-3 w-full text-left" ref="titleElement">
            {{ title }}
          </div>
          <div
            class="text-body-xxs text-primary pb-3 w-full text-left"
            ref="dateElement"
          >
            {{ formattedDate }}
          </div>
          <div
            v-if="description && lines > 0"
            class="text-body-xxs w-full text-left overflow-hidden"
            :style="`display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: ${lines}`"
          >
            {{ description }}
          </div>
          <div class="relative w-full">
            <CardTagCloudCard
              v-if="tags"
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
