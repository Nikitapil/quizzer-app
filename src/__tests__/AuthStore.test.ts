import { createPinia, setActivePinia } from 'pinia';

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
import { vi } from 'vitest';
import { errorFn } from '@/__tests__/mocks/fnMocks';

describe('AuthStore tests', () => {
  const authResponse = AuthResponseDtoMock.create();
  const successMessageDtoMock = SuccessMessageDtoMock.create();
  const refreshApiMock = vi.fn();
  const signinApiMock = vi.fn();
  const signupApiMock = vi.fn();
  const logoutApiMock = vi.fn();
  const getRestorePasswordKeyApiMock = vi.fn();
  const restorePasswordKeyApiMock = vi.fn();
  const deleteUserApiMock = vi.fn();
  const editUserApiMock = vi.fn();
  authApi.refresh = refreshApiMock;
  authApi.signin = signinApiMock;
  authApi.signup = signupApiMock;
  authApi.logout = logoutApiMock;
  authApi.getRestorePasswordKey = getRestorePasswordKeyApiMock;
  authApi.restorePassword = restorePasswordKeyApiMock;
  usersApi.deleteUser = deleteUserApiMock;
  usersApi.editUser = editUserApiMock;

  beforeEach(() => {
    removeAuthToken();
    refreshApiMock.mockReset();
    signinApiMock.mockReset();
    signupApiMock.mockReset();
    setActivePinia(createPinia());
  });

  it('should refresh successfully and set Auth Data', async () => {
    refreshApiMock.mockResolvedValue(authResponse);

    const store = useAuthStore();

    await store.refresh();

    expect(store.user).toStrictEqual(authResponse.user);

    const token = getAuthToken();

    expect(token).toBe(authResponse.accessToken);
  });

  it('should go to catch block in refresh method', async () => {
    refreshApiMock.mockImplementation(errorFn);

    const store = useAuthStore();

    await store.refresh();

    expect(store.user).toStrictEqual(null);

    const token = getAuthToken();

    expect(token).toBe(null);
  });

  it('should login successfully and set Auth Data', async () => {
    signinApiMock.mockResolvedValue(authResponse);

    const store = useAuthStore();

    await store.login({
      email: 'test@test.test',
      password: '12345'
    });

    expect(store.user).toStrictEqual(authResponse.user);

    const token = getAuthToken();

    expect(token).toBe(authResponse.accessToken);
  });

  it('should go to catch block in login method', async () => {
    signinApiMock.mockImplementation(errorFn);

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
    signupApiMock.mockResolvedValue(authResponse);

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
    signupApiMock.mockImplementation(errorFn);

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
    logoutApiMock.mockResolvedValue(successMessageDtoMock);

    const store = useAuthStore();

    store.user = authResponse.user;

    setAuthToken(authResponse.accessToken);

    await store.logout();

    expect(store.user).toStrictEqual(null);

    const token = getAuthToken();

    expect(token).toBe(null);
  });

  it('should go to  catch in logout method if err', async () => {
    logoutApiMock.mockImplementation(errorFn);

    const store = useAuthStore();

    store.user = authResponse.user;

    setAuthToken(authResponse.accessToken);

    await store.logout();

    expect(store.user).toStrictEqual(authResponse.user);

    const token = getAuthToken();

    expect(token).toBe(authResponse.accessToken);
  });

  it('should call getRestorePasswordKey method successfully', async () => {
    getRestorePasswordKeyApiMock.mockResolvedValue(successMessageDtoMock);

    const store = useAuthStore();

    const result = await store.getRestorePasswordKey('');

    expect(result).toBe(true);
  });

  it('should go to catch block in getRestorePasswordKey method if error', async () => {
    getRestorePasswordKeyApiMock.mockImplementation(errorFn);

    const store = useAuthStore();

    const result = await store.getRestorePasswordKey('');

    expect(result).toBe(false);
  });

  it('should restorePassword successfully and set Auth Data', async () => {
    restorePasswordKeyApiMock.mockResolvedValue(authResponse);

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
    deleteUserApiMock.mockResolvedValue(successMessageDtoMock);

    const store = useAuthStore();

    store.user = UserReturnDtoMock.create();

    const result = await store.deleteUser();

    expect(result).toBe(true);
  });

  it('should update user', async () => {
    const newUser = UserReturnDtoMock.create();
    editUserApiMock.mockResolvedValue(newUser);

    const store = useAuthStore();

    await store.editUser({});

    expect(store.user).toStrictEqual(newUser);
  });
});
