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
});
