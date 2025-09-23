<script setup lang="ts">
  import { useRoute } from "vue-router";
  const navigate = useNavigate();
  const config = useRuntimeConfig();
  const route = useRoute();
  const slug = route.params.slug;
  const { data, error, pending } = useFetch(
    `/posts?filters[slug][$eq]=${slug}`,
    {
      baseURL: config.public.apiBase,
    }
  );
</script>

<template>
  <div v-if="data" class="w-full">
    <div class="w-full py-6 text-body-s flex justify-between items-center">
      <div class="max-w-100">{{ data.data?.[0].Title }}</div>
      <div class="cursor-pointer" @click="navigate('/')">← на главную</div>
    </div>
    <div class="border flex flex-col items-center py-29">
      <div class="w-[60%] mb-20 text-primary text-title-xl">
        {{ data.data?.[0].Title }}
      </div>
      <template v-for="block in data.data?.[0].BlockText" :key="block">
        <div
          class="w-[60%] mb-6"
          v-if="
            block.type === 'paragraph' ||
            block.type === 'heading' ||
            block.type === 'quote'
          "
        >
          <template v-for="child in block.children" :key="child">
            <span v-if="child.type === 'text'">{{ child.text }}</span>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
