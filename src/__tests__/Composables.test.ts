import { useDocTitle } from '@/composables/useDocTitle';
import { flushPromises, mount } from '@vue/test-utils';
import Profile from '@/modules/profile/views/Profile.vue';
import { createTestingPinia } from '@pinia/testing';
import router from '@/router';
import { ERoutesNames } from '@/router/routes-names';
import App from '@/modules/app/App.vue';
import LangSwitcher from '@/modules/app/components/LangSwitcher.vue';

describe('Composables', () => {
  it('should work useDocTitle composable', () => {
    const document = window.document;

    useDocTitle('Hello');

    expect(document.title).toBe('Quizzer | Hello');
  });

  it('should work useAuthRedirect', async () => {
    mount(Profile, {
      global: {
        plugins: [createTestingPinia(), router]
      }
    });

    await flushPromises();

    expect(router.currentRoute.value.name).toBe(ERoutesNames.SIGN_IN);
  });

  it('should work useClickOutside', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia(), router]
      },
      attachTo: document.body
    });

    const langSwitcher = wrapper.getComponent(LangSwitcher);

    const langSwitherTrigger = langSwitcher.get('svg');

    await langSwitherTrigger.trigger('click');

    let langButtons = langSwitcher.findAll('button');

    expect(langButtons.length).toBe(2);

    const loader = wrapper.find('[data-test="round-loader"]');

    await loader.trigger('click');

    await flushPromises();

    langButtons = langSwitcher.findAll('button');

    expect(langButtons.length).toBe(0);
  });
});
