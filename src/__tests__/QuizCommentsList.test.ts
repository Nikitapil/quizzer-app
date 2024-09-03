import { vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import { quizCommentsApi } from '@/api/apiInstances';

import {
  ManyCommentsReturnDtoMock,
  QuizCommentReturnDtoMock
} from '@/api/swagger/Quizes/mock';

import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { extendQuizCommentWithClientData } from '@/modules/comments/mappers';

import { UserReturnDtoMock } from '@/api/swagger/Auth/mock';

import Pagination from '@/components/Pagination.vue';
import QuizComment from '@/modules/comments/components/QuizComment.vue';
import QuizCommentForm from '@/modules/comments/components/QuizCommentForm.vue';
import QuizCommentsList from '@/modules/comments/components/QuizCommentsList.vue';

describe('QuizCommentsList test', () => {
  const getQuizCommentsApiMock = vi.fn();
  const createQuizCommentsApiMock = vi.fn();
  const editQuizCommentsApiMock = vi.fn();
  const deleteQuizCommentsApiMock = vi.fn();

  quizCommentsApi.getQuizComments = getQuizCommentsApiMock;
  quizCommentsApi.createQuizComment = createQuizCommentsApiMock;
  quizCommentsApi.editQuizComment = editQuizCommentsApiMock;
  quizCommentsApi.deleteQuizComment = deleteQuizCommentsApiMock;

  const defaultCommentsResponseMockValue = ManyCommentsReturnDtoMock.create({
    totalCount: 8
  });

  const defaultProps = {
    quizId: '123'
  };

  let parentComment = {
    ...QuizCommentReturnDtoMock.create(),
    isEditInProgress: false
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    getQuizCommentsApiMock.mockClear();
    getQuizCommentsApiMock.mockResolvedValue(defaultCommentsResponseMockValue);

    createQuizCommentsApiMock.mockClear();
    editQuizCommentsApiMock.mockClear();
    deleteQuizCommentsApiMock.mockClear();

    parentComment = {
      ...QuizCommentReturnDtoMock.create({
        repliesCount: 1
      }),
      isEditInProgress: false
    };
  });

  it('should add isEditInProgress field to quiz comments', async () => {
    const wrapper = mount(QuizCommentsList, {
      props: defaultProps
    });

    await flushPromises();

    const comments = wrapper.findAllComponents(QuizComment);

    comments.forEach((comment) => {
      expect(comment.props('comment').isEditInProgress).toBe(false);
    });
  });

  it('should load more comments', async () => {
    const wrapper = mount(QuizCommentsList, {
      props: {
        ...defaultProps,
        parentComment
      }
    });

    await flushPromises();

    let comments = wrapper.findAllComponents(QuizComment);

    expect(comments.length).toBe(2);

    const showMoreBtn = wrapper.find('[data-testid="show-more-btn"]');

    await showMoreBtn.trigger('click');

    await flushPromises();

    comments = wrapper.findAllComponents(QuizComment);

    expect(comments.length).toBe(4);

    getQuizCommentsApiMock.mockRejectedValue('');

    await showMoreBtn.trigger('click');

    await flushPromises();

    comments = wrapper.findAllComponents(QuizComment);

    expect(comments.length).toBe(4);
  });

  it('should show empty text', async () => {
    getQuizCommentsApiMock.mockRejectedValue('');

    const wrapper = mount(QuizCommentsList, {
      props: defaultProps
    });

    await flushPromises();

    const emptyText = wrapper.find('[data-testid="empty-text"]');

    expect(emptyText.text()).toBe('No comments yet.');
  });

  it('should change page correctly', async () => {
    const wrapper = mount(QuizCommentsList, {
      props: defaultProps
    });

    await flushPromises();

    const pagination = wrapper.findComponent(Pagination);

    pagination.vm.$emit('change-page', 2);

    await flushPromises();

    expect(getQuizCommentsApiMock).toHaveBeenCalledTimes(2);

    expect(pagination.props('currentPage')).toBe(2);
  });

  it('should create quiz correctly', async () => {
    const authStore = useAuthStore();
    authStore.user = UserReturnDtoMock.create();

    const wrapper = mount(QuizCommentsList, {
      props: defaultProps
    });

    await flushPromises();

    const form = wrapper.findComponent(QuizCommentForm);

    form.vm.$emit('submit', '123');

    await flushPromises();

    expect(createQuizCommentsApiMock).toHaveBeenCalledTimes(1);

    expect(getQuizCommentsApiMock).toHaveBeenCalledTimes(2);
  });

  it('should increment parentComment repliesCount', async () => {
    const authStore = useAuthStore();
    authStore.user = UserReturnDtoMock.create();

    const wrapper = mount(QuizCommentsList, {
      props: {
        ...defaultProps,
        parentComment
      }
    });

    await flushPromises();

    const form = wrapper.findComponent(QuizCommentForm);

    form.vm.$emit('submit', '123');

    await flushPromises();

    expect(parentComment.repliesCount).toBe(2);
  });

  it('should edit quiz comment', async () => {
    const commentId = '123';

    getQuizCommentsApiMock.mockResolvedValue(
      ManyCommentsReturnDtoMock.create({
        totalCount: 12,
        comments: [
          QuizCommentReturnDtoMock.create({
            canEdit: true,
            id: commentId
          })
        ]
      })
    );

    const wrapper = mount(QuizCommentsList, {
      props: defaultProps
    });

    await flushPromises();

    const comment = wrapper.findComponent(QuizComment);

    comment.vm.$emit('edit', { id: commentId, text: '123' });

    await flushPromises();

    expect(editQuizCommentsApiMock).toHaveBeenCalledTimes(1);
  });

  it('should not edit quiz comment if comment not in the list', async () => {
    const commentId = '123';

    const wrapper = mount(QuizCommentsList, {
      props: defaultProps
    });

    await flushPromises();

    const comment = wrapper.findComponent(QuizComment);

    comment.vm.$emit('edit', { id: commentId + '123', text: '123' });

    await flushPromises();

    expect(editQuizCommentsApiMock).toHaveBeenCalledTimes(0);
  });

  it('should update comment in the list if updated', async () => {
    const commentId = '123';

    const updatedComment = QuizCommentReturnDtoMock.create();

    editQuizCommentsApiMock.mockResolvedValue(updatedComment);

    getQuizCommentsApiMock.mockResolvedValue(
      ManyCommentsReturnDtoMock.create({
        totalCount: 12,
        comments: [
          QuizCommentReturnDtoMock.create({
            canEdit: true,
            id: commentId
          })
        ]
      })
    );

    const wrapper = mount(QuizCommentsList, {
      props: defaultProps
    });

    await flushPromises();

    let comment = wrapper.findComponent(QuizComment);

    comment.vm.$emit('edit', { id: commentId, text: '123' });

    await flushPromises();

    comment = wrapper.findComponent(QuizComment);

    expect(comment.props('comment')).toEqual(
      extendQuizCommentWithClientData(updatedComment)
    );
  });

  it('should delete comment correctly', async () => {
    deleteQuizCommentsApiMock.mockResolvedValue(true);

    const wrapper = mount(QuizCommentsList, {
      props: defaultProps
    });

    await flushPromises();

    const comment = wrapper.findComponent(QuizComment);

    comment.vm.$emit('delete');

    await flushPromises();

    expect(deleteQuizCommentsApiMock).toHaveBeenCalledTimes(1);
    expect(getQuizCommentsApiMock).toHaveBeenCalledTimes(2);
  });

  it('should decrement parent repliesCount after delete comment correctly', async () => {
    deleteQuizCommentsApiMock.mockResolvedValue(true);

    const wrapper = mount(QuizCommentsList, {
      props: {
        quizId: '123',
        parentComment
      }
    });

    await flushPromises();

    const comment = wrapper.findComponent(QuizComment);

    comment.vm.$emit('delete');

    await flushPromises();

    expect(parentComment.repliesCount).toBe(0);
  });
});
