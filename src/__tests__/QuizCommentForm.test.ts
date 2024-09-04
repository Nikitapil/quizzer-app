import { flushPromises, mount } from '@vue/test-utils';
import QuizCommentForm from '@/modules/comments/components/QuizCommentForm.vue';

describe('QuizCommentForm', () => {
  it('not emit submit event if not valid', async () => {
    const wrapper = mount(QuizCommentForm, {
      props: {
        isLoading: false
      }
    });

    const form = wrapper.find('form');

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeFalsy();
  });

  it('emit submit event if valid', async () => {
    const wrapper = mount(QuizCommentForm, {
      props: {
        isLoading: false
      }
    });

    const input = wrapper.find('textarea');

    await input.setValue('123');

    const form = wrapper.find('form');

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeTruthy();
  });
});
