<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()
const i18n = useI18n()
</script>

<template>

    <div class="w-full h-46 mt-29 border-t p-20">
        <div class="flex justify-start items-center gap-15 text-body-m">
            <div>{{ i18n.t("share") }}</div>
            <div><a :href="`https://www.facebook.com/sharer/sharer.php?u=${config.public.url + route.fullPath}`"
                    target="_blank">
                    fb
                </a>
            </div>
            <div><a :href="`https://t.me/share/url?url=${config.public.url + route.fullPath}`" target="_blank">
                    tg
                </a>
            </div>
        </div>
    </div>
</template>