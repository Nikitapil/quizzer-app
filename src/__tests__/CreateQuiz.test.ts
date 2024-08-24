import { quizApi } from '@/api/apiInstances';
import { beforeEach, vi } from 'vitest';
import { SuccessMessageDtoMock } from '@/api/swagger/Quizes/mock';
import { flushPromises, mount } from '@vue/test-utils';
import CreateQuiz from '@/modules/quizes/pages/CreateQuiz.vue';
import { createPinia, setActivePinia } from 'pinia';
import QuizForm from '@/modules/quizes/components/quiz-form/QuizForm.vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { UserReturnDtoMock } from '@/api/swagger/Auth/mock';

describe('CreateQuiz tests', () => {
  const createQuizFnMock = vi.fn();
  quizApi.createQuiz = createQuizFnMock;

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Should create a Quiz', async () => {
    createQuizFnMock.mockResolvedValue(SuccessMessageDtoMock.create());
    const authStore = useAuthStore();
    authStore.user = UserReturnDtoMock.create();
    const wrapper = mount(CreateQuiz);
    wrapper.findComponent(QuizForm).vm.$emit('submit');

    await flushPromises();

    expect(createQuizFnMock).toHaveBeenCalled();
  });
});
