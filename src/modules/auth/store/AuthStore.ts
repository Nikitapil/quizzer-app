import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {
  type AuthResponseDto,
  type CreateUserDto,
  type LoginUserDto,
  type RestorePasswordDto,
  type UserReturnDto,
  UserRolesEnum
} from '@/api/swagger/Auth/data-contracts';
import { useApiMethod } from '@/api/useApiMethod';
import { authApi, usersApi } from '@/api/apiInstances';
import { removeAuthToken, setAuthToken } from '@/helpers/token-helpers';
import { toast } from 'vue3-toastify';
import type { EditUserDto } from '@/api/swagger/Users/data-contracts';

export const useAuthStore = defineStore('AuthStore', () => {
  const user = ref<UserReturnDto | null>(null);
  const isLoading = ref(true);

  const { call: restorePasswordApi, isLoading: isRestorePasswordApiLoading } =
    useApiMethod(authApi.restorePassword);

  const {
    call: getRestorePasswordKeyApi,
    isLoading: isGetRestorePaswordKeyLoading
  } = useApiMethod(authApi.getRestorePasswordKey);

  const { call: logoutApi } = useApiMethod(authApi.logout);

  const { call: deleteUserApi } = useApiMethod(usersApi.deleteUser);

  const { call: editUserApi, isLoading: isUpdateUserInProgress } = useApiMethod(
    usersApi.editUser
  );

  const isAdmin = computed(() => user.value?.role === UserRolesEnum.Admin);

  const isRestorePasswordLoading = computed(
    () =>
      isRestorePasswordApiLoading.value || isGetRestorePaswordKeyLoading.value
  );

  const getApiData = async (
    method: () => Promise<AuthResponseDto>,
    errorMethod = console.error
  ) => {
    try {
      isLoading.value = true;
      const { accessToken, user: userFromApi } = await method();
      user.value = userFromApi;
      setAuthToken(accessToken);
    } catch (e: any) {
      errorMethod(e?.response?.data?.message || 'Error');
    } finally {
      isLoading.value = false;
    }
  };

  const refresh = async () => {
    return getApiData(() => authApi.refresh());
  };

  const login = async (request: LoginUserDto) => {
    return getApiData(() => authApi.signin(request), toast.error);
  };

  const register = async (request: CreateUserDto) => {
    return getApiData(() => authApi.signup(request), toast.error);
  };

  const logout = async () => {
    const isSuccess = await logoutApi();
    if (isSuccess) {
      user.value = null;
      removeAuthToken();
    }
  };

  const getRestorePasswordKey = async (email: string) => {
    const isSuccess = await getRestorePasswordKeyApi({ email });
    return !!isSuccess;
  };

  const restorePassword = async (request: RestorePasswordDto) => {
    const response = await restorePasswordApi(request);
    if (response) {
      user.value = response.user;
      setAuthToken(response.accessToken);
    }
  };

  const deleteUser = async () => {
    if (!user.value) {
      return false;
    }
    const isSuccess = await deleteUserApi(user.value.id);

    if (isSuccess) {
      user.value = null;
      removeAuthToken();
    }

    return !!isSuccess;
  };

  const editUser = async (request: EditUserDto) => {
    const updatedUser = await editUserApi(request);
    if (updatedUser) {
      user.value = updatedUser;
    }
    return !!updatedUser;
  };

  return {
    user,
    isAdmin,
    isLoading,
    isRestorePasswordLoading,
    isUpdateUserInProgress,
    refresh,
    login,
    register,
    logout,
    getRestorePasswordKey,
    restorePassword,
    deleteUser,
    editUser
  };
});
