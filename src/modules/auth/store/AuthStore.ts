import { defineStore } from 'pinia';
import type {
  IAuthStoreActions,
  IAuthStoreState,
  IBaseAuthRequest,
  ISignUpAuthRequest,
  TAuthStoreGetters
} from '@/modules/auth/types';
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
      isLoading: false
    };
  },
  actions: {
    async refresh() {
      try {
        this.isLoading = true;
        const { data } = await AuthService.refresh();
        this.user = data.user;
        setAuthToken(data.accessToken);
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
        this.user = data.user;
        setAuthToken(data.accessToken);
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
        this.user = data.user;
        setAuthToken(data.accessToken);
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
    }
  }
});
