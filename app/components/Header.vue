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

  const onTagPage = computed(() => {
    return route.fullPath.startsWith("/tags/") && !!route.params.slug;
  });
  // const { y: scrollY } = useWindowScroll();
  // const scrolled = ref(false);
  // watch(scrollY, (newY) => {
  //   if (newY > 140) {
  //     scrolled.value = true;
  //   } else if (newY === 0) {
  //     scrolled.value = false;
  //   }
  // });
  const scrolled = true;
  const i18n = useI18n();
  const searchMode = ref(false);
  const searchQuery = ref("");
  const lastSearchQuery = computed(() => route.query.query);
  const hideSearchResults = ref(false);
  const showMobileMenu = ref(false);
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
    to("/search?query=" + searchQuery.value);
    searchMode.value = false;
  }
  watch(route, async () => {
    if (!lastSearchQuery.value) {
      hideSearchResults.value = false;
    }
    if (!onTagPage.value) {
      searchMode.value = false;
    }
    showMobileMenu.value = false;
  });
</script>

<template>
  <div class="flex flex-col w-full bg-background z-30 sticky top-0">
    <div class="w-full flex flex-col justify-between bg-background z-30">
      <div
        class="flex justify-between w-full px-6 sm:px-12 lg:px-18 transition-all duration-300 pt-5 pb-9 items-center"
        :class="scrolled ? '' : 'lg:pt-20 lg:pb-29'"
      >
        <div class="flex items-center">
          <router-link to="/">
            <img class="mr-6 h-15" :src="logo" alt="" />
          </router-link>
          <div class="font-title text-title-l text-primary hidden lg:block">
            <router-link to="/">{{ i18n.t("orgName") }}</router-link>
          </div>
        </div>
        <div class="flex-grow"></div>
        <div
          class="lg:hidden flex justify-end"
          :class="showMobileMenu ? 'mb-6' : ''"
        >
          <UiBaseIcon
            :icon="showMobileMenu ? 'cross' : 'burger'"
            class="cursor-pointer"
            :class="showMobileMenu ? 'max-lg:hidden' : ''"
            @click="showMobileMenu = !showMobileMenu"
          />
        </div>
        <div
          class="lg:w-full flex flex-col lg:flex-row items-end justify-between lg:items-center transition-all duration-300 lg:opacity-100 lg:max-h-96 max-w-200"
          :class="
            showMobileMenu
              ? 'opacity-100 max-h-96 max-lg:gap-6'
              : 'opacity-0 max-h-0 w-0 overflow-hidden lg:flex'
          "
        >
          <UiBaseIcon
            icon="cross"
            class="cursor-pointer"
            :class="showMobileMenu ? 'lg:hidden' : 'hidden'"
            @click="showMobileMenu = !showMobileMenu"
          />
          <UiBaseButton
            :label="i18n.t('news')"
            :type="
              isActive('posts') || isMain ? 'transparent-active' : 'transparent'
            "
            link="/"
          />
          <UiBaseButton
            :label="i18n.t('projects')"
            :type="isActive('projects') ? 'transparent-active' : 'transparent'"
            link="/projects"
          />
          <UiBaseButton
            :label="i18n.t('about')"
            :type="isActive('about') ? 'transparent-active' : 'transparent'"
            link="/about"
          />
          <LanguageSwitcher />
          <UiBaseIcon
            :icon="searchMode ? 'cross' : 'lookingGlass'"
            class="cursor-pointer"
            @click="jumpToSearch"
          />
        </div>
      </div>
      <div v-if="!searchMode && !lastSearchQuery"></div>
      <div
        v-if="
          !searchMode && !hideSearchResults && (!!lastSearchQuery || onTagPage)
        "
        class="w-full"
      >
        <div class="w-full flex flex-col items-center bg-background">
          <div class="w-full flex items-center mb-7 px-6 sm:px-12 lg:px-18">
            <div class="flex-1 flex justify-start items-baseline">
              <div v-if="lastSearchQuery" class="text-title-m text-primary">
                {{ i18n.t("searchResults") }}
              </div>
              <div v-if="onTagPage">
                <UiBaseBadge class="text-title-m !text-contrast bg-indigo">
                  {{ route.params.slug }}
                </UiBaseBadge>
              </div>
              <div v-if="onTagPage" class="px-1">—</div>
              <div
                v-if="onTagPage"
                class="text-title-m text-primary whitespace-nowrap"
              >
                {{ i18n.t("allPostsByTag") }}
              </div>
            </div>
            <div class="flex-1 flex justify-center">
              <div v-if="lastSearchQuery" class="text-title-m text-tomato">
                {{ lastSearchQuery }}
              </div>
              <div v-if="onTagPage" class="text-title-m text-primary">#</div>
            </div>
            <div class="flex-1 flex justify-end items-center">
              <div v-if="onTagPage">
                <UiBaseBadge
                  class="mr-10 cursor-pointer"
                  @click="jumpToSearch"
                  >{{ i18n.t("searchDefault") }}</UiBaseBadge
                >
              </div>
              <UiBaseIcon
                icon="cross"
                class="cursor-pointer"
                @click="hideSearchResults = true"
              />
            </div>
          </div>
          <div class="w-full h-[2px] bg-black"></div>
        </div>
      </div>
      <div v-if="searchMode" class="w-full flex flex-col items-center">
        <form
          @submit.prevent="search"
          class="w-full flex gap-10 items-center mb-8 px-6 sm:px-12 lg:px-18"
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
          <UiBaseBadge class="hidden lg:block"
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
        <UiBaseBadge class="block lg:hidden mb-6"
          ><router-link to="/tags">{{
            i18n.t("searchByTag")
          }}</router-link></UiBaseBadge
        >
        <div class="w-[88%] h-[2px] bg-black mb-19 max-md:hidden"></div>
      </div>

      <div class="h-[2px] w-full bg-black border-none"></div>
    </div>
  </div>
</template>
