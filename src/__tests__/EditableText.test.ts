import { flushPromises, mount } from '@vue/test-utils';
import EditableText from '@/components/inputs/EditableText.vue';

describe('EditableText component tests', () => {
  const toggleButtonSelector = '[data-test="toggle-button"]';
  const appInputSelector = '[data-test="app-input"]';
  const props = {
    modelValue: false,
    text: 'test text',
    name: 'test-name',
    id: 'test-id',
    isLoading: false,
    inputType: 'text',
    rules: ''
  } as const;

  const wrapper = mount(EditableText, {
    props
  });

  beforeEach(async () => {
    await wrapper.setProps(props);
  });

  it('should render component with right text element', () => {
    const textEl = wrapper.get('p');

    expect(textEl.text()).toBe('test text');
  });

  it('should toggle form correctly', async () => {
    const btn = wrapper.get(toggleButtonSelector);

    await btn.trigger('click');

    let staticTextEl = wrapper.find('p');
    const input = wrapper.get<HTMLInputElement>(appInputSelector);

    expect(staticTextEl.exists()).toBe(false);
    expect(input.element.value).toBe('test text');

    await btn.trigger('click');

    staticTextEl = wrapper.find('p');

    expect(staticTextEl.exists()).toBe(true);
  });

  it('should toggle form correctly outside from component', async () => {
    await wrapper.setProps({ modelValue: true });

    let staticTextEl = wrapper.find('p');
    const input = wrapper.get<HTMLInputElement>(appInputSelector);

    expect(staticTextEl.exists()).toBe(false);
    expect(input.element.value).toBe('test text');

    await wrapper.setProps({ modelValue: false });

    staticTextEl = wrapper.find('p');

    expect(staticTextEl.exists()).toBe(true);
  });

  it('should validate form', async () => {
    await wrapper.setProps({
      rules: 'email'
    });

    const toggleBtn = wrapper.get(toggleButtonSelector);
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
      }
    });

    const toggleBtn = wrapper.get(toggleButtonSelector);
    await toggleBtn.trigger('click');
    const form = wrapper.find('form');

    await form.trigger('submit');

    await flushPromises();
    expect(wrapper.emitted('submit-handler')).toBeTruthy();
    expect(wrapper.emitted('submit-handler')?.[0]).toEqual(['test text']);
  });
});
