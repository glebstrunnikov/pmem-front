<script setup lang="ts">
  const sortOrder = useState("sortOrder", () => "publishedAt:desc");
  const route = useRoute();
  const to = useNavigate();
  const i18n = useI18n();
  function toggleSortMenu() {
    const currentSort = route.query.sort;
    if (currentSort === "new" || !currentSort) {
      to("/search?query=" + route.query.query + "&sort=old");
    } else {
      to("/search?query=" + route.query.query + "&sort=new");
    }
  }
</script>
<template>
  <div class="w-full flex justify-between items-start">
    <div class="flex-3"></div>
    <ContentArea
      :search="true"
      class="!flex-8"
      contentClass="flex flex-col gap-14 pt-16 bg-background mb-43 max-w-207"
    />
    <div
      class="flex-3 flex justify-end items-start pt-16"
      @click="toggleSortMenu"
    >
      <div class="flex justify-end items-center cursor-pointer">
        <div class="text-title-m text-primary text-right">
          {{
            route.query.sort === "old" ? i18n.t("oldFirst") : i18n.t("newFirst")
          }}
        </div>
        <UiBaseIcon icon="arrows" class="ml-4" />
      </div>
    </div>
  </div>
</template>
