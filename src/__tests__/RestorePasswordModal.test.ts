import { flushPromises, mount } from '@vue/test-utils';
import RestorePasswordModal from '@/modules/auth/components/restore-form/RestorePasswordModal.vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import RestorePasswordEmailStep from '@/modules/auth/components/restore-form/RestorePasswordEmailStep.vue';
import RestorePasswordStep from '@/modules/auth/components/restore-form/RestorePasswordStep.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('RestorePasswordModal component tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render change steps inside modal', async () => {
    const wrapper = mount(RestorePasswordModal, {
      props: {
        modelValue: true
      }
    });
    const store = useAuthStore();

    store.getRestorePasswordKey = async () => true;
    await flushPromises();

    const loader = wrapper.find('[data-test="round-loader"]');
    expect(loader.exists()).toBe(false);

    const firstStep = wrapper.findComponent(RestorePasswordEmailStep);
    expect(firstStep.exists()).toBe(true);

    const emailForm = firstStep.get('form');

    const emailInput = firstStep.get('[data-test="app-input"]');

    await emailInput.setValue('test@test.test');

    await emailForm.trigger('submit');

    await flushPromises();

    const secondStep = wrapper.findComponent(RestorePasswordStep);
    expect(secondStep.exists()).toBe(true);
  });
});
