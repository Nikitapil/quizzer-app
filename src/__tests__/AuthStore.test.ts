import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { getAuthToken, removeAuthToken } from '@/helpers/token-helpers';
import { flushPromises } from '@vue/test-utils';
import { AuthService } from '@/modules/auth/AuthService';

describe('AuthStore tests', () => {
  beforeEach(() => {
    removeAuthToken();
  });

  it('should set Auth Data', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    store.setAuthData({
      user: {
        id: 1,
        username: 'Test user',
        email: 'test@test.test',
        role: 'User'
      },
      accessToken: '12345'
    });

    await flushPromises();

    expect(store.user).toStrictEqual({
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: 'User'
    });

    const token = getAuthToken();

    expect(token).toBe('12345');
  });

  it('should refresh successfully and set Auth Data', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    AuthService.refresh = async () => {
      return {
        data: {
          user: {
            id: 1,
            username: 'Test user',
            email: 'test@test.test',
            role: 'User'
          },
          accessToken: '12345'
        }
      } as any;
    };

    await store.refresh();

    await flushPromises();

    expect(store.user).toStrictEqual({
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: 'User'
    });

    const token = getAuthToken();

    expect(token).toBe('12345');
  });

  it('should go to catch block in refresh method', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    AuthService.refresh = async () => {
      throw new Error();
    };

    await store.refresh();

    await flushPromises();

    expect(store.user).toStrictEqual(null);

    const token = getAuthToken();

    expect(token).toBe(null);
  });
});
