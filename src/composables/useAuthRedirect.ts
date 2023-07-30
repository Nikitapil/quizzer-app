import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { ERoutesNames } from '@/router/routes-names';

export const useAuthRedirect = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  watch(
    () => authStore.isLoading,
    () => {
      if (!authStore.isLoading && !authStore.user) {
        router.push({ name: ERoutesNames.SIGN_IN });
      }
    }
  );
};
