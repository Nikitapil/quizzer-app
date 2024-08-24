import { vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import { useQuizzesStore } from '@/modules/quizes/store/QuizzesStore';
import { useAuthStore } from '@/modules/auth/store/AuthStore';

import { quizApi } from '@/api/apiInstances';

import { QuizDtoMock } from '@/api/swagger/Quizes/mock';
import { UserReturnDtoMock } from '@/api/swagger/Auth/mock';

import QuizzesList from '@/modules/quizes/components/QuizzesList.vue';
import QuizzesListItem from '@/modules/quizes/components/QuizzesListItem.vue';
import Pagination from '@/components/Pagination.vue';

describe('QuizzesList component tests', () => {
  const title = 'Test list';
  const defaultGetQuizesPayload = { page: 1, limit: 10, search: '' };

  quizApi.getAllQuizes = vi.fn();

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should emit get-quizzes event on mount', () => {
    const wrapper = mount(QuizzesList, {
      props: { title }
    });

    expect(wrapper.emitted('get-quizzes')).toBeTruthy();
    expect(wrapper.emitted('get-quizzes')?.[0]).toEqual([
      defaultGetQuizesPayload
    ]);
  });

  it('should not render search form if no quizzes and not searched', () => {
    const wrapper = mount(QuizzesList, {
      props: { title }
    });

    const form = wrapper.find('form');

    expect(form.exists()).toBe(false);
  });

  it('should not render search form if quizzes loading', () => {
    const store = useQuizzesStore();

    const wrapper = mount(QuizzesList, {
      props: { title }
    });

    store.getAllQuizes(defaultGetQuizesPayload);

    const form = wrapper.find('form');

    expect(form.exists()).toBe(false);
  });

  it('should render form if quizzes length and not loading', () => {
    const store = useQuizzesStore();
    store.quizzes = QuizDtoMock.createMany();

    const wrapper = mount(QuizzesList, {
      props: { title }
    });

    const form = wrapper.find('form');

    expect(form.exists()).toBe(true);
  });

  it('should render form if no quizzes length but isSearched', async () => {
    const searchValue = 'test';
    const store = useQuizzesStore();
    store.quizzes = QuizDtoMock.createMany();

    const wrapper = mount(QuizzesList, {
      props: { title }
    });

    const form = wrapper.find('form');
    const input = form.get('input');
    const submitBtn = form.get('[data-test="search"]');

    await input.setValue(searchValue);

    await submitBtn.trigger('click');

    store.quizzes = [];

    await flushPromises();

    expect(wrapper.emitted('get-quizzes')?.[1]).toEqual([
      {
        ...defaultGetQuizesPayload,
        search: searchValue
      }
    ]);

    const formUpdated = wrapper.find('form');
    expect(formUpdated.exists()).toBe(true);
  });

  it('should render loader if quizzes is loading', () => {
    const store = useQuizzesStore();
    store.getAllQuizes(defaultGetQuizesPayload);
    const wrapper = mount(QuizzesList, {
      props: { title }
    });

    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBe(true);
  });

  it('should render no quizzes block', () => {
    const wrapper = mount(QuizzesList, {
      props: { title }
    });

    const noQuizzes = wrapper.find('[data-test="no-quizzes"]');

    expect(noQuizzes.exists()).toBe(true);
  });

  it('should render quizzes list', () => {
    const store = useQuizzesStore();
    store.quizzes = QuizDtoMock.createMany();

    const wrapper = mount(QuizzesList, {
      props: { title }
    });

    const quizzesItems = wrapper.findAllComponents(QuizzesListItem);

    expect(quizzesItems.length).toBe(1);
  });

  it('should emit get-quizzes on paginate', async () => {
    const store = useQuizzesStore();
    store.quizzes = QuizDtoMock.createMany();
    store.totalCount = 21;

    const wrapper = mount(QuizzesList, {
      props: { title }
    });

    const pagination = wrapper.getComponent(Pagination);

    const pagesBtns = pagination.findAll('button');

    await pagesBtns[1].trigger('click');

    expect(wrapper.emitted('get-quizzes')?.[1]).toEqual([
      {
        ...defaultGetQuizesPayload,
        page: 2
      }
    ]);
  });

  it('should call delete quiz method and get quizes after', async () => {
    const deleteRequestMock = vi.fn();
    quizApi.deleteQuiz = deleteRequestMock;
    const store = useQuizzesStore();
    store.quizzes = QuizDtoMock.createMany();

    const wrapper = mount(QuizzesList, {
      props: { title }
    });

    await wrapper.findComponent(QuizzesListItem).vm.$emit('delete', 1);

    expect(deleteRequestMock).toHaveBeenCalled();
  });

  it('should get userId from auth store', () => {
    const user = UserReturnDtoMock.create();
    const authStore = useAuthStore();

    const quizzesstore = useQuizzesStore();
    quizzesstore.quizzes = QuizDtoMock.createMany();
    authStore.user = user;

    const wrapper = mount(QuizzesList, { props: { title } });

    expect(wrapper.findComponent(QuizzesListItem).props('userId')).toBe(
      user.id
    );
  });
});
