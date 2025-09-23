import { useRouter } from "nuxt/app";

export const useNavigate = () => {
  const router = useRouter();
  return (path: string) => router.push(path);
};
