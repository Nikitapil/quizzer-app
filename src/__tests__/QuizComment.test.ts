import { QuizCommentReturnDtoMock } from '@/api/swagger/Quizes/mock';
import type { IQuizComment } from '@/modules/comments/domain';
import { flushPromises, mount } from '@vue/test-utils';
import QuizComment from '@/modules/comments/components/QuizComment.vue';
import QuizCommentForm from '@/modules/comments/components/QuizCommentForm.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';

describe('QuizComment', () => {
  const date = new Date('09.03.2024').toISOString();
  const comment: IQuizComment = {
    ...QuizCommentReturnDtoMock.create({
      updatedAt: date,
      canEdit: true,
      canDelete: true
    }),
    isEditInProgress: false
  };

  it('renders date correctly with updatedAt', () => {
    const wrapper = mount(QuizComment, {
      props: {
        comment
      }
    });

    const dateEl = wrapper.find('[data-testid="comment-date"]');

    expect(dateEl.text()).toBe('9/3/2024');
  });

  it('renders date correctly without updatedAt', () => {
    const wrapper = mount(QuizComment, {
      props: {
        comment: {
          ...comment,
          updatedAt: null,
          createdAt: date
        }
      }
    });

    const dateEl = wrapper.find('[data-testid="comment-date"]');

    expect(dateEl.text()).toBe('9/3/2024');
  });

  it('emit edit comment event', async () => {
    const wrapper = mount(QuizComment, {
      props: {
        comment
      }
    });

    const editBtn = wrapper.find('[data-test="edit-btn"]');

    await editBtn.trigger('click');

    wrapper.findComponent(QuizCommentForm).vm.$emit('submit');

    expect(wrapper.emitted('edit')).toBeTruthy();

    await flushPromises();

    expect(wrapper.findComponent(QuizCommentForm).exists()).toBe(false);
  });

  it('closes edit form correctly', async () => {
    const wrapper = mount(QuizComment, {
      props: {
        comment
      }
    });

    const editBtn = wrapper.find('[data-test="edit-btn"]');

    await editBtn.trigger('click');

    await wrapper.find('[data-test="close-edit-btn"]').trigger('click');

    expect(wrapper.findComponent(QuizCommentForm).exists()).toBe(false);
  });

  it('emit delete comment event', async () => {
    const wrapper = mount(QuizComment, {
      props: {
        comment
      }
    });

    const deleteBtn = wrapper.find('[data-test="delete-btn"]');

    await deleteBtn.trigger('click');

    wrapper.findComponent(ConfirmModal).vm.$emit('confirm');

    expect(wrapper.emitted('delete')).toBeTruthy();
  });

  it('opens replies correctly', async () => {
    const wrapper = mount(QuizComment, {
      props: {
        comment
      },
      global: {
        stubs: {
          QuizCommentsList: true
        }
      }
    });

    const repliesBtn = wrapper.find('[data-test="replies-btn"]');

    await repliesBtn.trigger('click');

    expect(wrapper.find('[data-test="replies"]').exists()).toBe(true);

    await repliesBtn.trigger('click');

    expect(wrapper.find('[data-test="replies"]').exists()).toBe(false);
  });
});
