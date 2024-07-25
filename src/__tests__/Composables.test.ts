import { useDocTitle } from '@/composables/useDocTitle';
import { flushPromises, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import App from '@/modules/app/App.vue';
import LangSwitcher from '@/modules/app/components/LangSwitcher.vue';

describe('Composables', () => {
  it.skip('should work useDocTitle composable', async () => {
    useDocTitle('Hello');
    const document = window.document;

    expect(document.title).toBe('Quizzer | Hello');
  });

  it('should work useClickOutside', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia()]
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
