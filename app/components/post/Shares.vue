<script setup lang="ts">
  const config = useRuntimeConfig();
  const route = useRoute();
  const i18n = useI18n();
</script>

<template>
  <div
    class="w-full h-30 md:h-46 mt-10 md:mt-29 border-t-[2px] py-10 md:py-20 md:p-20"
  >
    <div class="flex justify-start items-center gap-15 text-body-m">
      <div>{{ i18n.t("share") }}</div>
      <div>
        <a
          :href="`https://www.facebook.com/sharer/sharer.php?u=${
            config.public.url + route.fullPath
          }`"
          target="_blank"
        >
          fb
        </a>
      </div>
      <div>
        <a
          :href="`https://t.me/share/url?url=${
            config.public.url + route.fullPath
          }`"
          target="_blank"
        >
          tg
        </a>
      </div>
      <div>
        <a
          :href="`https://vk.com/share.php?url=${
            config.public.url + route.fullPath
          }`"
          target="_blank"
        >
          vk
        </a>
      </div>
      <div>
        <a
          :href="`https://connect.ok.ru/offer?url=${
            config.public.url + route.fullPath
          }`"
          target="_blank"
        >
          ok
        </a>
      </div>
    </div>
  </div>
</template>
