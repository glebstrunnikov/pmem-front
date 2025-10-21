// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Manrope:wght@200;300;400;500;600;700;800&display=swap",
        },
      ],
      meta: [
        { name: "description", content: "Perm Memorial — Europa" },
        {
          name: "keywords",
          content:
            "Премь, Мемориал, Европа, история, память, репрессии, Россия, память",
        },
        { property: "og:site_name", content: "Perm Memorial — Europa" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/logo.png" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["pmem-europa.de"],
      hmr: {
        host: "pmem-europa.de",
      },
    },
  },

  css: ["~/assets/css/tailwind.css"],

  devServer: {
    // host: 0.0.0.0,
    host: "localhost",
    port: 3000,
    https: false,
  },

  runtimeConfig: {
    public: {
      apiBase: `${process.env.NUXT_PUBLIC_URL}/api`,
      url: process.env.NUXT_PUBLIC_URL,
    },
  },

  modules: ["@nuxtjs/i18n"],
  i18n: {
    locales: [
      { code: "ru", language: "ru-RU", file: "ru.json" },
      { code: "en", language: "en-US", file: "en.json" },
      { code: "de", language: "de-DE", file: "de.json" },
    ],
    defaultLocale: "ru",
    strategy: "no_prefix",
  },
});
