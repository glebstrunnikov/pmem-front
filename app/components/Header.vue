<script setup lang="ts">
  import logo from "~/assets/images/logo.png";
  import { set, useWindowScroll } from "@vueuse/core";
  const to = useNavigate();
  const searchInput = ref<HTMLInputElement | null>(null);

  const route = useRoute();
  const isActive = (path: string) => {
    const segments = route.fullPath.split("/");
    return segments[1] === path;
  };
  const isMain = computed(() => {
    return route.fullPath === "/" || route.fullPath === "/index";
  });
  const { y: scrollY } = useWindowScroll();
  const i18n = useI18n();
  const searchMode = ref(false);
  const searchQuery = ref("");
  const lastSearchQuery = computed(() => route.query.query);
  const hideSearchResults = ref(false);
  function jumpToSearch() {
    if (!searchMode.value) {
      searchMode.value = true;
      nextTick(() => {
        searchInput.value?.focus();
      });
    } else {
      searchMode.value = false;
    }
  }
  function search() {
    console.log(searchQuery.value);
    to("/search?query=" + searchQuery.value);
    searchMode.value = false;
  }
  watch(route, () => {
    if (!lastSearchQuery.value) {
      hideSearchResults.value = false;
    }
    searchMode.value = false;
  });
</script>

<template>
  <div class="flex flex-col w-full bg-background z-20">
    <div v-if="scrollY > 100" class="h-[300px] relative w-full"></div>
    <div
      class="w-full flex flex-col justify-between bg-background transition-all z-20"
      :class="
        scrollY > 100 && !searchMode
          ? 'fixed top-0 h-[115px]'
          : scrollY > 100 && searchMode
          ? 'fixed top-0 h-[300px]'
          : 'relative h-[300px]'
      "
    >
      <div></div>
      <div class="flex justify-between items-center w-full px-18">
        <div class="flex items-center">
          <router-link to="/">
            <img class="mr-24" :src="logo" alt="" />
          </router-link>
          <div class="font-title text-title-xxl text-primary">
            <router-link to="/">{{ i18n.t("orgName") }}</router-link>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-28">
            <UiBaseButton
              :label="i18n.t('news')"
              :type="
                isActive('posts') || isMain
                  ? 'transparent-active'
                  : 'transparent'
              "
              link="/"
            />
            <UiBaseButton
              :label="i18n.t('projects')"
              :type="
                isActive('projects') ? 'transparent-active' : 'transparent'
              "
              link="/projects"
            />
            <UiBaseButton
              :label="i18n.t('about')"
              :type="isActive('about') ? 'transparent-active' : 'transparent'"
              link="/about"
            />
            <UiBaseIcon
              :icon="searchMode ? 'cross' : 'lookingGlass'"
              class="cursor-pointer"
              @click="jumpToSearch"
            />
          </div>
        </div>
      </div>
      <div v-if="!searchMode && !lastSearchQuery"></div>
      <div
        v-if="!searchMode && lastSearchQuery && !hideSearchResults"
        class="w-full"
      >
        <div class="w-full flex flex-col items-center px-18 bg-background">
          <div class="w-full flex items-center mb-7">
            <div class="flex-1 flex justify-start">
              <div class="text-title-m text-primary">
                {{ i18n.t("searchResults") }}
              </div>
            </div>
            <div class="flex-1 flex justify-center">
              <div class="text-title-m text-tomato">
                {{ lastSearchQuery }}
              </div>
            </div>
            <div class="flex-1 flex justify-end">
              <UiBaseIcon
                icon="cross"
                class="cursor-pointer"
                @click="hideSearchResults = true"
              />
            </div>
          </div>
          <div class="w-full h-[3px] bg-black"></div>
        </div>
      </div>
      <div v-if="searchMode" class="w-full flex flex-col items-center px-18">
        <form
          @submit.prevent="search"
          class="w-full flex gap-10 items-center mb-7"
        >
          <div class="text-title-m text-primary flex-999">
            <input
              v-model="searchQuery"
              ref="searchInput"
              type="text"
              :placeholder="i18n.t('searchDefault') + '...'"
              class="w-full focus:outline-none focus:border-primary focus:border-[1px]"
            />
          </div>
          <UiBaseBadge
            ><router-link to="/tags">{{
              i18n.t("searchByTag")
            }}</router-link></UiBaseBadge
          >
          <UiBaseIcon
            icon="lookingGlass"
            class="cursor-pointer"
            @click="search"
          />
        </form>
        <div class="w-full h-[3px] bg-black"></div>
      </div>
      <div class="h-[1px] w-full bg-black border-none"></div>
    </div>
  </div>
</template>
