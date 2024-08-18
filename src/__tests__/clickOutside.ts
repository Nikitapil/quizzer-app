import { useGlobalMocks } from '@/__tests__/mocks/globalMocks';
import { flushPromises, mount } from '@vue/test-utils';
import App from '@/modules/app/App.vue';
import LangSwitcher from '@/modules/app/components/LangSwitcher.vue';
import { createPinia, setActivePinia } from 'pinia';

useGlobalMocks();

describe('useClickOutside', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should work useClickOutside', async () => {
    const wrapper = mount(App, {
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
