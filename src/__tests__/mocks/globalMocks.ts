import { vi } from 'vitest';
import { authApi } from '@/api/apiInstances';

const refreshAuthMock = vi.fn();
authApi.refresh = refreshAuthMock;

export const useGlobalMocks = () => {
  return refreshAuthMock;
};
