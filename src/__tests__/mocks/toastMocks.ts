import { vi } from 'vitest';
import { toast } from 'vue3-toastify';

export const getErrorToastSpy = () => {
  return vi.spyOn(toast, 'error');
};
