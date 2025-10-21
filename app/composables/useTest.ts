const counter = useState<number>("counter", () => 0); // не очень понятно, что именно должен инкрементить или декрементить этот useCounter, но предположим, что это Nuxt и мы инициализируем глобальный стейт в SSR

export const useCounter = () => {
  return {
    increment: () => counter.value++,
    decrement: () => counter.value--,
    reset: () => (counter.value = 0),
  };
};

// Опять же, не очень понятно, какая архитектура у проекта и где мы ловим ошибки, но снова, предположим, что это Nuxt

// useHandleApiError.ts:
export const useHandleApiError = () => {
  const handleError = (err: any) => {
    console.log("API error: ", err);
  };
  return { handleError };
};

//Компонент:
const { handleError } = useHandleApiError();
const someParam = ref("");
const { data, error } = await useFetch(() => `/api/endpoint/${someParam}`);
if (error.value) {
  handleError(error.value);
}
