import { mount } from '@vue/test-utils';
import AppModal from '@/components/AppModal.vue';

describe('AppModal component tests', () => {
  it('should render modal with correct title', () => {
    const wrapper = mount(AppModal, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        title: 'Test title'
      }
    });

    const title = wrapper.get('h1');

    expect(title.text()).toBe('Test title');
  });

  it('should close modal on click outside', async () => {
    const wrapper = mount(AppModal, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        title: 'Test title'
      }
    });

    const overlay = wrapper.get('[data-test="overlay"]');

    await overlay.trigger('click');

    const modal = wrapper.find('[data-test="modal"]');
    expect(modal.exists()).toBeFalsy();
  });

  it('should close modal on click close btn', async () => {
    const wrapper = mount(AppModal, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        title: 'Test title'
      }
    });

    const closeBtn = wrapper.get('button');

    await closeBtn.trigger('click');

    const modal = wrapper.find('[data-test="modal"]');
    expect(modal.exists()).toBeFalsy();
  });
});
