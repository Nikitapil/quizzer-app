import { flushPromises, mount } from '@vue/test-utils';
import type { ComponentMountingOptions } from '@vue/test-utils';
import EditableText from '@/components/inputs/EditableText.vue';
import { i18n } from '@/main';

describe('EditableText component tests', () => {
  let options: ComponentMountingOptions<typeof EditableText>;

  beforeEach(() => {
    options = {
      props: {
        text: 'test text',
        name: 'test-name',
        id: 'test-id',
        isLoading: false,
        inputType: 'text',
        rules: ''
      },
      global: {
        plugins: [i18n]
      }
    };
  });

  it('should render component with right text element', () => {
    const wrapper = mount(EditableText, options);

    const textEl = wrapper.get('p');

    expect(textEl.text()).toBe('test text');
  });

  it('should toggle form correctly', async () => {
    const wrapper = mount(EditableText, options);

    const btn = wrapper.get('[data-test="toggle-button"]');

    await btn.trigger('click');

    let staticTextEl = wrapper.find('p');
    const input = wrapper.get<HTMLInputElement>('[data-test="app-input"]');

    expect(staticTextEl.exists()).toBe(false);
    expect(input.element.value).toBe('test text');

    await btn.trigger('click');

    staticTextEl = wrapper.find('p');

    expect(staticTextEl.exists()).toBe(true);
  });

  it('should toggle form correctly outside from component', async () => {
    const wrapper = mount(EditableText, options);

    await wrapper.vm.toggleForm();

    let staticTextEl = wrapper.find('p');
    const input = wrapper.get<HTMLInputElement>('[data-test="app-input"]');

    expect(staticTextEl.exists()).toBe(false);
    expect(input.element.value).toBe('test text');

    await wrapper.vm.toggleForm();

    staticTextEl = wrapper.find('p');

    expect(staticTextEl.exists()).toBe(true);
  });

  it('should validate form', async () => {
    const wrapper = mount(EditableText, {
      props: {
        text: 'test text',
        name: 'test-name',
        id: 'test-id',
        isLoading: false,
        inputType: 'text',
        rules: 'email'
      },
      global: {
        plugins: [i18n]
      }
    });

    const toggleBtn = wrapper.get('[data-test="toggle-button"]');
    await toggleBtn.trigger('click');
    const form = wrapper.find('form');

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit-handler')).toBeFalsy();
  });

  it('should emit submit handler', async () => {
    const wrapper = mount(EditableText, {
      props: {
        text: 'test text',
        name: 'test-name',
        id: 'test-id',
        isLoading: false,
        inputType: 'text',
        rules: ''
      },
      global: {
        plugins: [i18n]
      }
    });

    const toggleBtn = wrapper.get('[data-test="toggle-button"]');
    await toggleBtn.trigger('click');
    const form = wrapper.find('form');

    await form.trigger('submit');

    await flushPromises();
    expect(wrapper.emitted('submit-handler')).toBeTruthy();
    expect(wrapper.emitted('submit-handler')?.[0]).toEqual(['test text']);
  });
});
