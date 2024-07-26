import { type Ref, watch } from 'vue';
import { ERoutesNames } from '@/router/routes-names';
import type { UserReturnDto } from '@/api/swagger/Auth/data-contracts';
import { useRouter } from 'vue-router';

export const useUserWatchRedirect = (user: Ref<UserReturnDto | null>) => {
  const router = useRouter();

  watch(
    user,
    () => {
      if (user.value) {
        router.push({ name: ERoutesNames.HOME });
      }
    },
    { immediate: true }
  );
};
