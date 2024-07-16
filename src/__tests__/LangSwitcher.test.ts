import { mount } from '@vue/test-utils';
import LangSwitcher from '@/modules/app/components/LangSwitcher.vue';
import { i18n } from '@/plugins/i18n';

describe('LangSwitcher tests', () => {
  const wrapper = mount(LangSwitcher);

  it('should not show buttons on initial render', () => {
    const buttons = wrapper.findAll('button');

    expect(buttons.length).toBe(0);
  });

  it('should open', async () => {
    const switcher = wrapper.get('svg');
    await switcher.trigger('click');
    const buttons = wrapper.findAll('button');

    expect(buttons.length).toBe(2);
  });

  it('should change lang', async () => {
    const switcher = wrapper.get('svg');
    await switcher.trigger('click');
    const buttons = wrapper.findAll('button');

    await buttons[1]?.trigger('click');
    expect(i18n.global.locale.value).toBe('rus');

    await buttons[0]?.trigger('click');
    expect(i18n.global.locale.value).toBe('eng');
  });
});
