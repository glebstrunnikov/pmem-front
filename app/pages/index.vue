<script setup lang="ts">
  const config = useRuntimeConfig();

  const { data, error, pending } = useFetch("/posts", {
    baseURL: config.public.apiBase,
  });

  watch(data, (val) => {
    console.log("Data received:", val);
  });

  onMounted(() => {
    console.log("Hydrated data:", data.value);
  });
</script>
<template>
  <div class="w-full h-full text-title-xl mt-29">Пермский Мемориал</div>
  <div class="h-10 w-10 bg-tomato"></div>
  <div v-if="data">{{ data }}</div>
</template>
