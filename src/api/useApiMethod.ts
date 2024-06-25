import { ref } from 'vue';
import { toast } from 'vue3-toastify';

export const useApiMethod = <T extends (...args: any) => any>(
  method: T,
  settings: { initialLoading: boolean } = {
    initialLoading: false
  }
) => {
  const isLoading = ref(settings.initialLoading);

  const call = async (
    ...args: Parameters<typeof method>
  ): Promise<ReturnType<T> | null> => {
    try {
      isLoading.value = true;
      return await method(...(args as any));
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error');
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, call };
};
