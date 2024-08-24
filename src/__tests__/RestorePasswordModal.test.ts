import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import RestorePasswordModal from '@/modules/auth/components/restore-form/RestorePasswordModal.vue';
import RestorePasswordEmailStep from '@/modules/auth/components/restore-form/RestorePasswordEmailStep.vue';
import RestorePasswordStep from '@/modules/auth/components/restore-form/RestorePasswordStep.vue';
import { vi } from 'vitest';
import { authApi } from '@/api/apiInstances';

describe('RestorePasswordModal component tests', () => {
  const getRestorePasswordKeyResponseMock = vi.fn();

  authApi.getRestorePasswordKey = getRestorePasswordKeyResponseMock;

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render change steps inside modal', async () => {
    getRestorePasswordKeyResponseMock.mockResolvedValue(true);
    const wrapper = mount(RestorePasswordModal, {
      props: {
        modelValue: true
      }
    });

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

  it('should not change steps inside modal if error in get restore key request', async () => {
    getRestorePasswordKeyResponseMock.mockRejectedValue('');

    const wrapper = mount(RestorePasswordModal, {
      props: {
        modelValue: true
      }
    });

    await flushPromises();

    const firstStep = wrapper.findComponent(RestorePasswordEmailStep);

    const emailForm = firstStep.get('form');

    const emailInput = firstStep.get('[data-test="app-input"]');

    await emailInput.setValue('test@test.test');

    await emailForm.trigger('submit');

    await flushPromises();

    const secondStep = wrapper.findComponent(RestorePasswordStep);
    expect(secondStep.exists()).toBe(false);
  });
});
