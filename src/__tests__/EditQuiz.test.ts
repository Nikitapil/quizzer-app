import { createTestingPinia } from '@pinia/testing';
import { useQuizFormStore } from '@/modules/quizes/store/QuizFormStore';
import { mount } from '@vue/test-utils';
import EditQuiz from '@/modules/quizes/views/EditQuiz.vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import QuizForm from '@/modules/quizes/components/quiz-form/QuizForm.vue';
import { UserRolesEnum } from '@/api/swagger/Auth/data-contracts';

describe('Edit quiz page test', () => {
  it('should render loader if isQuizLoading', () => {
    const pinia = createTestingPinia();
    const store = useQuizFormStore(pinia);
    const authStore = useAuthStore(pinia);
    authStore.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: UserRolesEnum.User
    };

    store.getQuizForm = async () => {};

    store.isQuizLoading = true;

    const wrapper = mount(EditQuiz, {
      global: {
        plugins: [pinia]
      }
    });

    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBe(true);
  });

  it('should render not found message', () => {
    const pinia = createTestingPinia();
    const store = useQuizFormStore(pinia);
    const authStore = useAuthStore(pinia);
    authStore.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: UserRolesEnum.User
    };

    store.getQuizForm = async () => {};

    const wrapper = mount(EditQuiz, {
      global: {
        plugins: [pinia]
      }
    });

    const notFound = wrapper.find('[data-test="not-found"]');

    expect(notFound.exists()).toBe(true);
  });

  it('should render quizForm', () => {
    const pinia = createTestingPinia();
    const store = useQuizFormStore(pinia);
    const authStore = useAuthStore(pinia);
    authStore.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: UserRolesEnum.User
    };

    store.getQuizForm = async () => {};

    store.quizForm = {
      name: '',
      isPrivate: false,
      questions: [
        {
          question: '',
          correctAnswer: '',
          incorrectAnswers: ['']
        },
        {
          question: '',
          correctAnswer: '',
          incorrectAnswers: ['']
        },
        {
          question: '',
          correctAnswer: '',
          incorrectAnswers: ['']
        }
      ]
    };

    const wrapper = mount(EditQuiz, {
      global: {
        plugins: [pinia]
      }
    });

    const form = wrapper.findComponent(QuizForm);

    expect(form.exists()).toBe(true);
  });
});
