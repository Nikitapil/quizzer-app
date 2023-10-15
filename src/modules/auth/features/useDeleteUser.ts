import { ref } from 'vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { useRouter } from 'vue-router';
import { ERoutesNames } from '@/router/routes-names';

export const useDeleteUser = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const isDeleteInProgress = ref(false);

  const deleteUser = async () => {
    isDeleteInProgress.value = true;
    const isDeleted = await authStore.deleteUser();
    isDeleteInProgress.value = false;
    if (isDeleted) {
      await router.push({ name: ERoutesNames.HOME });
    }
  };

  return { isDeleteInProgress, deleteUser };
};
