import { createPinia, setActivePinia } from 'pinia';
import { flushPromises, mount } from '@vue/test-utils';

import { useQuizFormStore } from '@/modules/quizes/store/QuizFormStore';
import { useAuthStore } from '@/modules/auth/store/AuthStore';

import QuizForm from '@/modules/quizes/components/quiz-form/QuizForm.vue';
import EditQuiz from '@/modules/quizes/pages/EditQuiz.vue';
import { UserReturnDtoMock } from '@/api/swagger/Auth/mock';
import { quizApi } from '@/api/apiInstances';
import { vi } from 'vitest';
import { SingleQuizReturnDtoMock } from '@/api/swagger/Quizes/mock';
import router from '@/router';

describe('Edit quiz page test', () => {
  const user = UserReturnDtoMock.create();
  const getQuizMock = vi.fn();
  const editQuizMock = vi.fn();
  quizApi.getQuiz = getQuizMock;
  quizApi.editQuiz = editQuizMock;

  beforeEach(() => {
    getQuizMock.mockReset();
    setActivePinia(createPinia());
    const authStore = useAuthStore();
    authStore.user = user;
  });

  it('should render loader if isQuizLoading', () => {
    const store = useQuizFormStore();

    store.isQuizLoading = true;

    const wrapper = mount(EditQuiz);

    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBe(true);
  });

  it('should render not found message', () => {
    const wrapper = mount(EditQuiz);

    const notFound = wrapper.find('[data-test="not-found"]');

    expect(notFound.exists()).toBe(true);
  });

  it('should render quizForm', async () => {
    getQuizMock.mockResolvedValue(
      SingleQuizReturnDtoMock.create({
        canEdit: true
      })
    );

    const wrapper = mount(EditQuiz);

    await flushPromises();

    const form = wrapper.findComponent(QuizForm);
    expect(form.exists()).toBe(true);
  });

  it('should not redirect to user quizes if not editted after submit', async () => {
    const routerSpy = vi.spyOn(router, 'push');
    getQuizMock.mockResolvedValue(
      SingleQuizReturnDtoMock.create({
        canEdit: true
      })
    );

    const wrapper = mount(EditQuiz);

    await flushPromises();

    const form = wrapper.findComponent(QuizForm);

    await form.trigger('submit');

    await flushPromises();

    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should redirect to user quizes if editted after submit', async () => {
    const routerSpy = vi.spyOn(router, 'push');
    getQuizMock.mockResolvedValue(
      SingleQuizReturnDtoMock.create({
        canEdit: true
      })
    );
    editQuizMock.mockResolvedValue(true);

    const wrapper = mount(EditQuiz);

    await flushPromises();

    const form = wrapper.findComponent(QuizForm);

    await form.trigger('submit');

    await flushPromises();

    expect(routerSpy).toHaveBeenCalled();
  });
});
