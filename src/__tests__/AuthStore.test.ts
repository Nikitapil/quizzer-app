import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken
} from '@/helpers/token-helpers';
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

  it('should login successfully and set Auth Data', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    AuthService.signIn = async () => {
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

    await store.login({
      email: 'test@test.test',
      password: '12345'
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

  it('should go to catch block in login method', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    AuthService.signIn = async () => {
      throw {
        response: {
          data: {
            message: 'error'
          }
        }
      };
    };

    await store.login({
      email: 'test@test.test',
      password: '12345'
    });

    await flushPromises();

    expect(store.user).toStrictEqual(null);

    const token = getAuthToken();

    expect(token).toBe(null);
  });

  it('should register successfully and set Auth Data', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    AuthService.signUp = async () => {
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

    await store.register({
      email: 'test@test.test',
      password: '12345',
      username: 'Test user'
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

  it('should go to catch block in register method', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    AuthService.signUp = async () => {
      throw {
        response: {
          data: {
            message: 'error'
          }
        }
      };
    };

    await store.register({
      email: 'test@test.test',
      password: '12345',
      username: 'Test user'
    });

    await flushPromises();

    expect(store.user).toStrictEqual(null);

    const token = getAuthToken();

    expect(token).toBe(null);
  });

  it('should logout successfully and remove Auth Data', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    store.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: 'User'
    };

    setAuthToken('1234');

    expect(store.user).toStrictEqual({
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: 'User'
    });

    AuthService.logout = async () => {};

    await store.logout();

    expect(store.user).toStrictEqual(null);

    const token = getAuthToken();

    expect(token).toBe(null);
  });

  it('should go to  catch in logout method if err', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    store.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: 'User'
    };

    setAuthToken('1234');

    expect(store.user).toStrictEqual({
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: 'User'
    });

    AuthService.logout = async () => {
      throw {
        response: {
          data: {
            message: 'Error'
          }
        }
      };
    };

    await store.logout();

    expect(store.user).toStrictEqual({
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: 'User'
    });

    const token = getAuthToken();

    expect(token).toBe('1234');
  });

  it('should call getRestorePasswordKey method successfully', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);
    AuthService.getRestoreKey = async () => {};

    const result = await store.getRestorePasswordKey('test@test.test');

    expect(result).toBe(true);
  });

  it('should go to catch block in getRestorePasswordKey method if error', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);
    AuthService.getRestoreKey = async () => {
      throw {
        response: {
          data: {
            message: 'Error'
          }
        }
      };
    };

    const result = await store.getRestorePasswordKey('test@test.test');

    expect(result).toBe(false);
  });

  it('should restorePassword successfully and set Auth Data', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    AuthService.restorePassword = async () => {
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

    await store.restorePassword({
      key: '1234',
      password: '12345678'
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
    expect(store.isRestorePasswordLoading).toBe(false);
  });

  it('should go to catch block in restorePassword method', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    AuthService.restorePassword = async () => {
      throw {
        response: {
          data: {
            message: 'error'
          }
        }
      };
    };

    await store.restorePassword({
      key: '1234',
      password: '12345678'
    });

    await flushPromises();

    expect(store.user).toStrictEqual(null);

    const token = getAuthToken();

    expect(token).toBe(null);
    expect(store.isRestorePasswordLoading).toBe(false);
  });

  it('should correctly return getter state isAdmin', () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    store.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: 'User'
    };

    expect(store.isAdmin).toBe(false);

    store.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: 'Admin'
    };

    expect(store.isAdmin).toBe(true);
  });
});
