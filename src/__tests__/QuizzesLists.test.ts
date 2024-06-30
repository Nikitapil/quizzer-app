import { flushPromises, mount } from '@vue/test-utils';
import QuizzesList from '@/modules/quizes/components/QuizzesList.vue';
import { i18n } from '@/main';
import { createTestingPinia } from '@pinia/testing';
import { useQuizzesStore } from '@/modules/quizes/store/QuizzesStore';
import QuizzesListItem from '@/modules/quizes/components/QuizzesListItem.vue';
import Pagination from '@/components/Pagination.vue';

describe('QuizzesList component tests', () => {
  it('should emit get-quizzes event on mount', () => {
    const wrapper = mount(QuizzesList, {
      global: {
        plugins: [i18n, createTestingPinia()]
      },
      props: {
        title: 'Test list'
      }
    });

    expect(wrapper.emitted('get-quizzes')).toBeTruthy();
    expect(wrapper.emitted('get-quizzes')?.[0]).toEqual([
      {
        page: 1,
        limit: 10,
        search: ''
      }
    ]);
  });

  it('should not render search form if no quizzes and not searched', () => {
    const wrapper = mount(QuizzesList, {
      global: {
        plugins: [i18n, createTestingPinia()]
      },
      props: {
        title: 'Test list'
      }
    });

    const form = wrapper.find('form');

    expect(form.exists()).toBe(false);
  });

  it.skip('should not render search form if quizzes loading', () => {
    const pinia = createTestingPinia();
    const store = useQuizzesStore();
    store.quizzes = [
      {
        id: 'string-id',
        createdAt: '',
        updatedAt: '',
        name: 'Test quiz',
        isPrivate: false,
        userId: 1,
        isInFavourites: false,
        questionsCount: 4,
        author: 'Test user',
        rating: null
      }
    ];

    const wrapper = mount(QuizzesList, {
      global: {
        plugins: [i18n, pinia]
      },
      props: {
        title: 'Test list'
      }
    });

    const form = wrapper.find('form');

    expect(form.exists()).toBe(false);
  });

  it('should render form if quizzes length and not loading', () => {
    const pinia = createTestingPinia();
    const store = useQuizzesStore();
    store.quizzes = [
      {
        id: 'string-id',
        createdAt: '',
        updatedAt: '',
        name: 'Test quiz',
        isPrivate: false,
        userId: 1,
        isInFavourites: false,
        questionsCount: 4,
        author: 'Test user',
        rating: null
      }
    ];

    const wrapper = mount(QuizzesList, {
      global: {
        plugins: [i18n, pinia]
      },
      props: {
        title: 'Test list'
      }
    });

    const form = wrapper.find('form');

    expect(form.exists()).toBe(true);
  });

  it('should render form if no quizzes length but isSearched', async () => {
    const pinia = createTestingPinia();
    const store = useQuizzesStore();
    store.quizzes = [
      {
        id: 'string-id',
        createdAt: '',
        updatedAt: '',
        name: 'Test quiz',
        isPrivate: false,
        userId: 1,
        isInFavourites: false,
        questionsCount: 4,
        author: 'Test user',
        rating: null
      }
    ];

    const wrapper = mount(QuizzesList, {
      global: {
        plugins: [i18n, pinia]
      },
      props: {
        title: 'Test list'
      }
    });

    const form = wrapper.find('form');
    const input = form.get('input');
    const submitBtn = form.get('[data-test="search"]');

    input.setValue('blah blah blah');

    await submitBtn.trigger('click');

    store.quizzes = [];

    await flushPromises();

    expect(wrapper.emitted('get-quizzes')?.[1]).toEqual([
      {
        page: 1,
        limit: 10,
        search: 'blah blah blah'
      }
    ]);

    const formUpdated = wrapper.find('form');
    expect(formUpdated.exists()).toBe(true);
  });

  it.skip('should render loader if quizzes is loading', () => {
    const pinia = createTestingPinia();

    const wrapper = mount(QuizzesList, {
      global: {
        plugins: [i18n, pinia]
      },
      props: {
        title: 'Test list'
      }
    });

    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBe(true);
  });

  it('should render no quizzes block', () => {
    const pinia = createTestingPinia();

    const wrapper = mount(QuizzesList, {
      global: {
        plugins: [i18n, pinia]
      },
      props: {
        title: 'Test list'
      }
    });

    const noQuizzes = wrapper.find('[data-test="no-quizzes"]');

    expect(noQuizzes.exists()).toBe(true);
  });

  it('should render quizzes list', () => {
    const pinia = createTestingPinia();
    const store = useQuizzesStore();
    store.quizzes = [
      {
        id: 'string-id',
        createdAt: '',
        updatedAt: '',
        name: 'Test quiz',
        isPrivate: false,
        userId: 1,
        isInFavourites: false,
        questionsCount: 4,
        author: 'Test user',
        rating: null
      }
    ];

    const wrapper = mount(QuizzesList, {
      global: {
        plugins: [i18n, pinia]
      },
      props: {
        title: 'Test list'
      }
    });

    const quizzesItems = wrapper.findAllComponents(QuizzesListItem);

    expect(quizzesItems.length).toBe(1);
  });

  it('should emit get-quizzes on paginate', async () => {
    const pinia = createTestingPinia();
    const store = useQuizzesStore();
    store.quizzes = [
      {
        id: 'string-id',
        createdAt: '',
        updatedAt: '',
        name: 'Test quiz',
        isPrivate: false,
        userId: 1,
        isInFavourites: false,
        questionsCount: 4,
        author: 'Test user',
        rating: null
      }
    ];

    store.totalCount = 21;

    const wrapper = mount(QuizzesList, {
      global: {
        plugins: [i18n, pinia]
      },
      props: {
        title: 'Test list'
      }
    });

    const pagination = wrapper.getComponent(Pagination);

    const pagesBtns = pagination.findAll('button');

    await pagesBtns[1].trigger('click');

    expect(wrapper.emitted('get-quizzes')?.[1]).toEqual([
      {
        page: 2,
        limit: 10,
        search: ''
      }
    ]);
  });
});
