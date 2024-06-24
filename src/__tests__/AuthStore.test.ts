import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken
} from '@/helpers/token-helpers';
import { flushPromises } from '@vue/test-utils';
import { UserRolesEnum } from '@/api/Auth/data-contracts';
import { authApi } from '@/api/apiInstances';

describe('AuthStore tests', () => {
  beforeEach(() => {
    removeAuthToken();
  });

  it('should refresh successfully and set Auth Data', async () => {
    authApi.refresh = async () => {
      return {
        user: {
          id: 1,
          username: 'Test user',
          email: 'test@test.test',
          role: UserRolesEnum.User
        },
        accessToken: '12345'
      };
    };

    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

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
    authApi.refresh = async () => {
      throw new Error();
    };

    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    await store.refresh();

    await flushPromises();

    expect(store.user).toStrictEqual(null);

    const token = getAuthToken();

    expect(token).toBe(null);
  });

  it('should login successfully and set Auth Data', async () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    authApi.signin = async () => {
      return {
        user: {
          id: 1,
          username: 'Test user',
          email: 'test@test.test',
          role: UserRolesEnum.User
        },
        accessToken: '12345'
      };
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
    authApi.signin = async () => {
      throw {
        response: {
          data: {
            message: 'error'
          }
        }
      };
    };

    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

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
    authApi.signup = async () => {
      return {
        user: {
          id: 1,
          username: 'Test user',
          email: 'test@test.test',
          role: UserRolesEnum.User
        },
        accessToken: '12345'
      };
    };

    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

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
    authApi.signup = async () => {
      throw {
        response: {
          data: {
            message: 'error'
          }
        }
      };
    };
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

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
    authApi.logout = async () => {
      return { message: 'success' };
    };

    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    store.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: UserRolesEnum.User
    };

    setAuthToken('1234');

    expect(store.user).toStrictEqual({
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: 'User'
    });

    await store.logout();

    expect(store.user).toStrictEqual(null);

    const token = getAuthToken();

    expect(token).toBe(null);
  });

  it('should go to  catch in logout method if err', async () => {
    authApi.logout = async () => {
      throw {
        response: {
          data: {
            message: 'Error'
          }
        }
      };
    };

    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    store.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: UserRolesEnum.User
    };

    setAuthToken('1234');

    expect(store.user).toStrictEqual({
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: 'User'
    });

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
    authApi.getRestorePasswordKey = async () => {
      return { message: 'success' };
    };

    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    const result = await store.getRestorePasswordKey('test@test.test');

    expect(result).toBe(true);
  });

  it('should go to catch block in getRestorePasswordKey method if error', async () => {
    authApi.getRestorePasswordKey = async () => {
      throw {
        response: {
          data: {
            message: 'Error'
          }
        }
      };
    };
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    const result = await store.getRestorePasswordKey('test@test.test');

    expect(result).toBe(false);
  });

  it('should restorePassword successfully and set Auth Data', async () => {
    authApi.restorePassword = async () => {
      return {
        user: {
          id: 1,
          username: 'Test user',
          email: 'test@test.test',
          role: UserRolesEnum.User
        },
        accessToken: '12345'
      };
    };

    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

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

  it('should correctly return getter state isAdmin', () => {
    const pinia = createTestingPinia({ stubActions: false });
    const store = useAuthStore(pinia);

    store.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: UserRolesEnum.User
    };

    expect(store.isAdmin).toBe(false);

    store.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: UserRolesEnum.Admin
    };

    expect(store.isAdmin).toBe(true);
  });
});
