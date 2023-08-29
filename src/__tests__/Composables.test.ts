import { useDocTitle } from '@/composables/useDocTitle';
import { flushPromises, mount } from '@vue/test-utils';
import Profile from '@/modules/profile/views/Profile.vue';
import { i18n } from '@/main';
import { createTestingPinia } from '@pinia/testing';
import router from '@/router';
import { ERoutesNames } from '@/router/routes-names';

describe('Composables', () => {
  it('should work useDocTitle composable', () => {
    const document = window.document;

    useDocTitle('Hello');

    expect(document.title).toBe('Quizzer | Hello');
  });

  it('should work useAuthRedirect', async () => {
    mount(Profile, {
      global: {
        plugins: [i18n, createTestingPinia(), router]
      }
    });

    await flushPromises();

    expect(router.currentRoute.value.name).toBe(ERoutesNames.SIGN_IN);
  });
});
