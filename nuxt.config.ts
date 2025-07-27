// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["pmem-europa.de"],
    },
  },
  css: ["~/assets/css/tailwind.css"],
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
});
