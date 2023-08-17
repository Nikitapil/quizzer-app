import { flushPromises, mount } from '@vue/test-utils';
import Game from '@/modules/game/views/Game.vue';
import { i18n } from '@/main';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import { useGameStore } from '@/modules/game/store/GameStore';
import GameQuestion from '@/modules/game/components/GameQuestion.vue';
import { ERoutesNames } from '@/router/routes-names';
import { vi } from 'vitest';

describe('Game component tests', () => {
  const mockGame = {
    id: '1234',
    isPrivate: false,
    name: 'Quiz 1',
    questions: [
      {
        id: '5678',
        question: 'Super question',
        answers: ['not corr', 'correct', 'very not corr']
      },
      {
        id: '9012',
        question: 'Super question 2',
        answers: ['correct', 'incorrect']
      },
      {
        id: '3456',
        question: 'Super question 3',
        answers: ['incorrect', 'correct']
      }
    ]
  };

  it('should render loader while getting game', () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);

    store.getGame = async () => {};

    const wrapper = mount(Game, {
      global: {
        plugins: [i18n, router, pinia]
      }
    });

    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBe(true);
  });

  it('should render not found text', async () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);

    store.getGame = async () => {};

    const wrapper = mount(Game, {
      global: {
        plugins: [i18n, router, pinia]
      }
    });

    store.isPageLoading = false;

    await flushPromises();

    const errorText = wrapper.find('[data-test="error-text"]');

    expect(errorText.exists()).toBe(true);
  });

  it('should render current question', async () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);

    store.getGame = async () => {
      store.game = mockGame;
      store.isPageLoading = false;
    };

    await router.push({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game, {
      global: {
        plugins: [i18n, router, pinia]
      }
    });

    await flushPromises();

    const questionComponent = wrapper.findComponent(GameQuestion);

    expect(questionComponent.exists()).toBe(true);
  });

  it('should render current question', async () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);

    store.getGame = async () => {
      store.game = mockGame;
      store.isPageLoading = false;
    };

    await router.push({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game, {
      global: {
        plugins: [i18n, router, pinia]
      }
    });

    await flushPromises();

    const questionComponent = wrapper.findComponent(GameQuestion);

    expect(questionComponent.exists()).toBe(true);
  });

  it('should answer questions', async () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);
    vi.useFakeTimers();

    store.getGame = async () => {
      store.game = mockGame;
      store.isPageLoading = false;
    };

    store.getCorrectAnswer = async () => 'correct';

    await router.push({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game, {
      global: {
        plugins: [i18n, router, pinia]
      }
    });

    await flushPromises();

    const totalInfo = wrapper.get('[data-test="total-info"]');

    const questionComponent = wrapper.findComponent(GameQuestion);
    const title = questionComponent.get('h3');

    expect(questionComponent.exists()).toBe(true);
    expect(title.text()).toBe('Super question');
    expect(totalInfo.text()).toBe('1/3');

    const answers = questionComponent.findAll('button');

    await answers[0].trigger('click');

    vi.runAllTimers();

    await flushPromises();

    const questionComponent2 = wrapper.findComponent(GameQuestion);
    const title2 = questionComponent.get('h3');

    expect(questionComponent2.exists()).toBe(true);
    expect(title2.text()).toBe('Super question 2');
    expect(totalInfo.text()).toBe('2/3');

    const answers2 = questionComponent.findAll('button');

    await answers2[0].trigger('click');

    vi.runAllTimers();

    await flushPromises();

    const questionComponent3 = wrapper.findComponent(GameQuestion);
    const title3 = questionComponent.get('h3');

    expect(questionComponent3.exists()).toBe(true);
    expect(title3.text()).toBe('Super question 3');
    expect(totalInfo.text()).toBe('3/3');

    const answers3 = questionComponent.findAll('button');

    await answers3[0].trigger('click');

    vi.runAllTimers();

    await flushPromises();

    const resultText = wrapper.find('[data-test="result-text"]');

    expect(resultText.text()).toBe('Your result: 1/3');
  });
});
