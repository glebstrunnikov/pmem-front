<script setup lang="ts">
  const sortOrder = useState("sortOrder", () => "publishedAt:desc");
  const route = useRoute();
  const to = useNavigate();
  const i18n = useI18n();
  function toggleSortMenu() {
    if (route.fullPath.startsWith("/search")) {
      const currentSort = route.query.sort;
      if (currentSort === "new" || !currentSort) {
        to("/search?query=" + route.query.query + "&sort=old");
      } else {
        to("/search?query=" + route.query.query + "&sort=new");
      }
    } else if (route.fullPath.startsWith("/tags")) {
      const currentSort = route.query.sort;
      if (currentSort === "new" || !currentSort) {
        to(`/tags/${route.params.slug}?sort=old`);
      } else {
        to(`/tags/${route.params.slug}?sort=new`);
      }
    }
  }
</script>
<template>
  <div class="w-full flex max-md:flex-col justify-between items-start">
    <div class="flex-3 max-md:order-1"><slot></slot></div>
    <ContentArea
      :search="true"
      class="!flex-8 max-md:order-3"
      contentClass="flex flex-col gap-14 pt-16 bg-background mb-25 max-w-207"
    />
    <div
      class="flex-3 flex justify-end items-start pt-16 max-md:order-2 max-md:flex-1 max-md:pt-6"
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
