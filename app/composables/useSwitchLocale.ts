export const useSwitchLocale = () => {
  const locale = useState("locale");
  const localeCookie = useCookie("locale");
  const i18n = useI18n();
  return (newLocale: "ru" | "en" | "de") => {
    locale.value = newLocale;
    localeCookie.value = newLocale;
    i18n.setLocale(newLocale);
  };
};
