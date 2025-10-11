// app/plugins/locale.server.ts
export default defineNuxtPlugin((nuxtApp) => {
  const event = useRequestEvent();
  const localeCookie = useCookie("locale");
  const locale = useState("locale", () => "en");

  let detectedLocale = "en"; // default fallback

  // Priority 1: Check cookie
  if (localeCookie.value) {
    detectedLocale = localeCookie.value;
  } else {
    // Priority 2: Check Accept-Language header
    const acceptLanguage = event?.node.req.headers["accept-language"];
    if (acceptLanguage) {
      // Parse "de-DE,de;q=0.9,en;q=0.8" -> "de"
      const browserLang = acceptLanguage.split(",")[0].split("-")[0];
      detectedLocale = browserLang;
    }
  }

  // Set state for SSR
  locale.value = detectedLocale;
  // Set cookie for future visits
  localeCookie.value = detectedLocale;
});
