import { useGlobalMocks } from '@/__tests__/mocks/globalMocks';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import router from '@/router';

import { useAuthStore } from '@/modules/auth/store/AuthStore';

import App from '@/modules/app/App.vue';

useGlobalMocks();

describe('Error page tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should redirect to error page', async () => {
    const wrapper = mount(App);
    const store = useAuthStore();
    store.isLoading = false;
    await router.push('/not_existed_route');

    expect(wrapper.find('.error-page').exists()).toBeTruthy();
    expect(document.title).toBe('Quizzer | 404');
  });
});
