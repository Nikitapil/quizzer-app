import { createTestingPinia } from '@pinia/testing';
import { useHomeStore } from '@/modules/home/store/HomeStore';
import { flushPromises, mount } from '@vue/test-utils';
import Home from '@/modules/home/views/Home.vue';
import { i18n } from '@/main';
import router from '@/router';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { ERoutesNames } from '@/router/routes-names';

describe('Home component tests', () => {
  const pinia = createTestingPinia();

  const homeStore = useHomeStore(pinia);

  homeStore.getCategories = () => {
    homeStore.questionCategories = [
      { name: 'All', value: '' },
      { name: 'Category1', value: '1' },
      { name: 'Category2', value: '2' },
      { name: 'Category3', value: '3' },
      { name: 'Category4', value: '4' }
    ];
  };

  it('should render only generation form', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [i18n, router, pinia]
      }
    });

    await flushPromises();

    const createBtn = wrapper.find('[data-test="create-btn"]');
    const form = wrapper.find('form');

    expect(createBtn.exists()).toBe(false);
    expect(form.exists()).toBe(true);
  });

  it('should render create btn if authenticated', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [i18n, router, pinia]
      }
    });

    const authStore = useAuthStore(pinia);

    authStore.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test'
    };

    await flushPromises();

    const createBtn = wrapper.find('[data-test="create-btn"]');
    const form = wrapper.find('form');

    expect(createBtn.exists()).toBe(true);
    expect(form.exists()).toBe(true);
  });

  it('should redirect to quiz page after generating', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [i18n, router, pinia]
      }
    });

    homeStore.generateQuiz = async () => '1';

    await flushPromises();

    const form = wrapper.find('form');

    await form.trigger('submit');

    await flushPromises();

    expect(router.currentRoute.value.name).toBe(ERoutesNames.QUIZ);
  });
});
