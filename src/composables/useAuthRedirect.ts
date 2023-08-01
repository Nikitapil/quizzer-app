import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ERoutesNames } from '@/router/routes-names';

export const useAuthRedirect = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  onMounted(() => {
    if (!authStore.user) {
      router.push({ name: ERoutesNames.SIGN_IN });
      return;
    }
  });
};
