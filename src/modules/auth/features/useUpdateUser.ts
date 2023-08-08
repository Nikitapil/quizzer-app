import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { i18n } from '@/main';
import { AuthService } from '@/modules/auth/AuthService';
import type { TEditUserRequest } from '@/modules/auth/domain/types';

export const useUpdateUser = () => {
  const store = useAuthStore();
  const isLoading = ref(false);

  const editUser = async (request: TEditUserRequest) => {
    try {
      isLoading.value = true;
      const { data } = await AuthService.editUser(request);
      store.updateUser(data);
      return true;
    } catch (e: any) {
      if (e?.response?.data?.message) {
        toast(i18n.global.t(e?.response?.data?.message));
        return false;
      }
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, editUser };
};
