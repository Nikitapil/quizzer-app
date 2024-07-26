import { useAuthStore } from '@/modules/auth/store/AuthStore';
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken
} from '@/helpers/token-helpers';
import { UserRolesEnum } from '@/api/swagger/Auth/data-contracts';
import { authApi, usersApi } from '@/api/apiInstances';
import {
  AuthResponseDtoMock,
  SuccessMessageDtoMock,
  UserReturnDtoMock
} from '@/api/swagger/Auth/mock';
import { createPinia, setActivePinia } from 'pinia';

describe('AuthStore tests', () => {
  const authResponse = AuthResponseDtoMock.create();

  beforeEach(() => {
    removeAuthToken();
    setActivePinia(createPinia());
  });

  it('should refresh successfully and set Auth Data', async () => {
    authApi.refresh = async () => {
      return authResponse;
    };

    const store = useAuthStore();

    await store.refresh();

    expect(store.user).toStrictEqual(authResponse.user);

    const token = getAuthToken();

    expect(token).toBe(authResponse.accessToken);
  });

  it('should go to catch block in refresh method', async () => {
    authApi.refresh = async () => {
      throw new Error();
    };

    const store = useAuthStore();

    await store.refresh();

    expect(store.user).toStrictEqual(null);

    const token = getAuthToken();

    expect(token).toBe(null);
  });

  it('should login successfully and set Auth Data', async () => {
    const store = useAuthStore();

    authApi.signin = async () => {
      return authResponse;
    };

    await store.login({
      email: 'test@test.test',
      password: '12345'
    });

    expect(store.user).toStrictEqual(authResponse.user);

    const token = getAuthToken();

    expect(token).toBe(authResponse.accessToken);
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

    const store = useAuthStore();

    await store.login({
      email: 'test@test.test',
      password: '12345'
    });

    expect(store.user).toStrictEqual(null);

    const token = getAuthToken();

    expect(token).toBe(null);
  });

  it('should register successfully and set Auth Data', async () => {
    authApi.signup = async () => {
      return authResponse;
    };

    const store = useAuthStore();

    await store.register({
      email: 'test@test.test',
      password: '12345',
      username: 'Test user'
    });

    expect(store.user).toStrictEqual(authResponse.user);

    const token = getAuthToken();

    expect(token).toBe(authResponse.accessToken);
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

    const store = useAuthStore();

    await store.register({
      email: 'test@test.test',
      password: '12345',
      username: 'Test user'
    });

    expect(store.user).toStrictEqual(null);

    const token = getAuthToken();

    expect(token).toBe(null);
  });

  it('should logout successfully and remove Auth Data', async () => {
    authApi.logout = async () => {
      return SuccessMessageDtoMock.create();
    };

    const store = useAuthStore();

    store.user = authResponse.user;

    setAuthToken(authResponse.accessToken);

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

    const store = useAuthStore();

    store.user = authResponse.user;

    setAuthToken(authResponse.accessToken);

    await store.logout();

    expect(store.user).toStrictEqual(authResponse.user);

    const token = getAuthToken();

    expect(token).toBe(authResponse.accessToken);
  });

  it('should call getRestorePasswordKey method successfully', async () => {
    authApi.getRestorePasswordKey = async () => {
      return SuccessMessageDtoMock.create();
    };

    const store = useAuthStore();

    const result = await store.getRestorePasswordKey('');

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

    const store = useAuthStore();

    const result = await store.getRestorePasswordKey('');

    expect(result).toBe(false);
  });

  it('should restorePassword successfully and set Auth Data', async () => {
    authApi.restorePassword = async () => {
      return authResponse;
    };

    const store = useAuthStore();

    await store.restorePassword({
      key: '1234',
      password: '12345678'
    });

    expect(store.user).toStrictEqual(authResponse.user);

    const token = getAuthToken();

    expect(token).toBe(authResponse.accessToken);
    expect(store.isRestorePasswordLoading).toBe(false);
  });

  it('should correctly return getter state isAdmin', () => {
    const store = useAuthStore();

    store.user = UserReturnDtoMock.create({ role: UserRolesEnum.User });

    expect(store.isAdmin).toBe(false);

    store.user = UserReturnDtoMock.create({ role: UserRolesEnum.Admin });

    expect(store.isAdmin).toBe(true);
  });

  it('should return false if no user when delete method', async () => {
    const store = useAuthStore();

    const result = await store.deleteUser();

    expect(result).toBe(false);
  });

  it('should delete user', async () => {
    usersApi.deleteUser = async () => {
      return SuccessMessageDtoMock.create();
    };

    const store = useAuthStore();

    store.user = UserReturnDtoMock.create();

    const result = await store.deleteUser();

    expect(result).toBe(true);
  });

  it('should update user', async () => {
    const newUser = UserReturnDtoMock.create();
    usersApi.editUser = async () => {
      return newUser;
    };

    const store = useAuthStore();

    await store.editUser({});

    expect(store.user).toStrictEqual(newUser);
  });
});
