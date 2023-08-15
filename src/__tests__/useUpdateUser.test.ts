import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { AuthService } from '@/modules/auth/AuthService';
import { useUpdateUser } from '@/modules/auth/features/useUpdateUser';
import { flushPromises } from '@vue/test-utils';

describe('useUpdateUser test', () => {
  it('should work', async () => {
    const pinia = createTestingPinia({
      stubActions: false
    });

    const store = useAuthStore(pinia);

    expect(store.user).toBe(null);

    AuthService.editUser = async () => ({
      data: {
        id: 1,
        username: 'test user',
        email: 'test@test.test'
      }
    });

    await flushPromises();

    const { editUser } = useUpdateUser();

    await editUser({
      username: 'hello'
    });

    await flushPromises();

    expect(store.user).toEqual({
      id: 1,
      username: 'test user',
      email: 'test@test.test'
    });
  });
});
