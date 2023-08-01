import { mount } from '@vue/test-utils';
import App from '@/modules/app/App.vue';
import { i18n } from '@/main';
import router from '@/router';
import { useAuthStore } from '@/modules/auth/store/AuthStore';

describe('Error page tests', () => {
  it('should redirect to error page', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [i18n, router]
      }
    });
    const store = useAuthStore();
    store.isLoading = false;
    await router.push('/not_existed_route');

    expect(wrapper.find('.error-page').exists()).toBeTruthy();
    expect(document.title).toBe('Quizzer | 404');
  });
});
