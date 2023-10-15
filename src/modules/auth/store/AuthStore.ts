import { defineStore } from 'pinia';
import type {
  IAuthResponse,
  IAuthStoreActions,
  IAuthStoreState,
  IBaseAuthRequest,
  IRestorePasswordRequest,
  ISignUpAuthRequest,
  IUser,
  TAuthStoreGetters
} from '@/modules/auth/domain/types';
import { AuthService } from '@/modules/auth/AuthService';
import { removeAuthToken, setAuthToken } from '@/helpers/token-helpers';
import { toast } from 'vue3-toastify';
import { i18n } from '@/main';

export const useAuthStore = defineStore<
  'auth-store',
  IAuthStoreState,
  TAuthStoreGetters,
  IAuthStoreActions
>('auth-store', {
  state: () => {
    return {
      user: null,
      isLoading: true,
      isRestorePasswordLoading: false
    };
  },
  getters: {
    isAdmin(state: IAuthStoreState): boolean {
      return state.user?.role === 'Admin';
    }
  },
  actions: {
    setAuthData(data: IAuthResponse) {
      this.user = data.user;
      setAuthToken(data.accessToken);
    },
    updateUser(user: IUser) {
      this.user = user;
    },
    async refresh() {
      try {
        this.isLoading = true;
        const { data } = await AuthService.refresh();
        this.setAuthData(data);
      } catch (e) {
        this.user = null;
      } finally {
        this.isLoading = false;
      }
    },
    async login(request: IBaseAuthRequest) {
      try {
        this.isLoading = true;
        const { data } = await AuthService.signIn(request);
        this.setAuthData(data);
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(i18n.global.t(e?.response?.data?.message));
        }
      } finally {
        this.isLoading = false;
      }
    },
    async register(request: ISignUpAuthRequest) {
      try {
        this.isLoading = true;
        const { data } = await AuthService.signUp(request);
        this.setAuthData(data);
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(i18n.global.t(e?.response?.data?.message));
        }
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      try {
        this.isLoading = true;
        await AuthService.logout();
        this.user = null;
        removeAuthToken();
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(i18n.global.t(e?.response?.data?.message));
        }
      } finally {
        this.isLoading = false;
      }
    },
    async getRestorePasswordKey(email: string) {
      try {
        this.isRestorePasswordLoading = true;
        await AuthService.getRestoreKey(email);
        return true;
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(i18n.global.t(e?.response?.data?.message));
        }
        return false;
      } finally {
        this.isRestorePasswordLoading = false;
      }
    },
    async restorePassword({ key, password }: IRestorePasswordRequest) {
      try {
        this.isRestorePasswordLoading = true;
        const { data } = await AuthService.restorePassword(key, password);
        this.setAuthData(data);
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(i18n.global.t(e?.response?.data?.message));
        }
      } finally {
        this.isRestorePasswordLoading = false;
      }
    },

    async deleteUser() {
      if (!this.user?.id) {
        return false;
      }
      try {
        await AuthService.deleteUser(this.user.id);
        this.user = null;
        removeAuthToken();
        return true;
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(i18n.global.t(e?.response?.data?.message));
        }
        return false;
      }
    }
  }
});
