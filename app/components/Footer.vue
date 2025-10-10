<script setup lang="ts">
  import logo from "@/assets/images/logo-white.png";
  const navigate = useNavigate();
</script>

<template>
  <div class="w-full px-22 py-17 bg-black">
    <div class="flex justify-between items-center">
      <div class="flex flex-col items-start">
        <UiBaseButton
          class="mt-3"
          label="События"
          type="contrast"
          @click="navigate('/posts')"
        />
        <UiBaseButton
          class="mt-3"
          label="Проекты"
          type="contrast"
          @click="navigate('/projects')"
        />
        <UiBaseButton
          class="mt-3"
          label="О нас"
          type="contrast"
          @click="navigate('/about')"
        />
        <div class="flex items-center mt-12 text-contrast text-title-m">
          <UiBaseIcon icon="language" class="mr-4" />
          <UiBaseButton label="рус" type="contrast" />
          <div class="mx-2">/</div>
          <UiBaseButton label="eng" type="contrast" />
          <div class="mx-2">/</div>
          <UiBaseButton label="deu" type="contrast" />
        </div>
      </div>
      <div class="flex max-w-[40%]">
        <div class="w-full flex items-start gap-14">
          <img :src="logo" alt="Logo" class="w-[110px]" />
          <div class="flex flex-col">
            <div class="text-title-m text-contrast mb-7">
              © ПРБОО «Центр исторической памяти», © 2025 г.
            </div>
            <div class="text-body-m text-contrast">
              Данный веб-ресурс ранее принадлежал общественной организации
              «Пермское краевое отделение общества «Мемориал» (ликвидирована
              российскими властями в апреле 2022 года; это решение обжалуется в
              суде). Исключительные авторские права на опубликованные
              информационные материалы переданы ПРБОО «Центр исторической
              памяти»
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
