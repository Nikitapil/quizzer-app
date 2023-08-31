import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { AuthService } from '@/modules/auth/AuthService';
import { useUpdateUser } from '@/modules/auth/features/useUpdateUser';
import { flushPromises } from '@vue/test-utils';
import type { AxiosResponse } from 'axios';
import type { IUser } from '@/modules/auth/domain/types';

describe('useUpdateUser test', () => {
  it('should edit user', async () => {
    const pinia = createTestingPinia({
      stubActions: false
    });

    const store = useAuthStore(pinia);

    expect(store.user).toBe(null);

    AuthService.editUser = async () =>
      ({
        data: {
          id: 1,
          username: 'test user',
          email: 'test@test.test'
        }
      } as AxiosResponse<IUser>);

    await flushPromises();

    const { editUser, isLoading } = useUpdateUser();

    await editUser({
      username: 'hello'
    });

    await flushPromises();

    expect(store.user).toEqual({
      id: 1,
      username: 'test user',
      email: 'test@test.test'
    });
    expect(isLoading.value).toBe(false);
  });

  it('should go catch block', async () => {
    AuthService.editUser = async () => {
      return Promise.reject({
        response: {
          data: {
            message: 'Hello'
          }
        }
      });
    };

    await flushPromises();

    const { editUser, isLoading } = useUpdateUser();

    const result = editUser({
      username: 'hello'
    });

    expect(isLoading.value).toBe(true);

    result.then((value) => {
      expect(value).toBe(false);
      expect(isLoading.value).toBe(false);
    });
  });
});
