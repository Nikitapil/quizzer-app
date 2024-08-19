import { vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import router from '@/router';

import { useGameStore } from '@/modules/game/store/GameStore';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { useGlobalMocks } from '@/__tests__/mocks/globalMocks';

import { quizApi } from '@/api/apiInstances';

import { ERoutesNames } from '@/router/routes-names';

import {
  CorrectAnswerReturnDtoMock,
  PlayQuizDtoMock
} from '@/api/swagger/Quizes/mock';
import { UserReturnDtoMock } from '@/api/swagger/Auth/mock';

import GameQuestion from '@/modules/game/components/GameQuestion.vue';
import Game from '@/modules/game/pages/Game.vue';

useGlobalMocks();

const getGameApiMock = vi.fn().mockImplementation(() => {});
const getCorrectAnswerApiMock = vi.fn().mockImplementation(() => {});

describe('Game component tests', () => {
  const userButtonSelector = '[data-test="user-btns"]';
  const mockGame = PlayQuizDtoMock.create();
  let store: ReturnType<typeof useGameStore>;

  beforeEach(() => {
    quizApi.getPlayQuiz = getGameApiMock;
    quizApi.getCorrectAnswer = getCorrectAnswerApiMock;
    getGameApiMock.mockReset();
    setActivePinia(createPinia());
    store = useGameStore();
  });

  it('should render loader while getting game', () => {
    const wrapper = mount(Game);
    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBe(true);
  });

  it('should render not found text', async () => {
    const wrapper = mount(Game);

    store.isPageLoading = false;

    await flushPromises();

    const errorText = wrapper.find('[data-test="error-text"]');

    expect(errorText.exists()).toBe(true);
  });

  it('should render current question', async () => {
    getGameApiMock.mockResolvedValue(mockGame);

    await router.replace({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game);

    await flushPromises();

    const questionComponent = wrapper.findComponent(GameQuestion);

    expect(questionComponent.exists()).toBe(true);
  });

  it('should answer questions and should restart game', async () => {
    getGameApiMock.mockResolvedValue(mockGame);
    getCorrectAnswerApiMock.mockResolvedValue(
      CorrectAnswerReturnDtoMock.create({
        answer: mockGame.questions[0].answers[0]
      })
    );
    vi.useFakeTimers({ shouldAdvanceTime: true });

    await router.replace({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game);

    await flushPromises();

    const totalInfo = wrapper.get('[data-test="total-info"]');

    const questionComponent = wrapper.findComponent(GameQuestion);

    expect(questionComponent.exists()).toBe(true);
    expect(totalInfo.text()).toBe(`1/${mockGame.questions.length}`);

    const answers = questionComponent.findAll('button');

    await answers[0].trigger('click');

    await flushPromises();

    await vi.runAllTimersAsync();

    const questionComponent2 = wrapper.findComponent(GameQuestion);

    console.log(store.currentQuestionIndex, 'CURRENT CURRENT');

    expect(questionComponent2.exists()).toBe(true);

    const answers2 = questionComponent2.findAll('button');

    await answers2[0].trigger('click');

    await vi.runAllTimersAsync();

    await flushPromises();

    const resultText = wrapper.find('[data-test="result-text"]');

    expect(resultText.text()).toBe(
      `Your result: 1/${mockGame.questions.length}`
    );

    const restartBtn = wrapper.find('[data-test="restart-btn"]');

    await restartBtn.trigger('click');

    const currentGameQuestion = wrapper.findComponent(GameQuestion);

    expect(currentGameQuestion.exists()).toBe(true);
  });

  it('should not render user btns if not authenticated', async () => {
    await router.push({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game);

    await flushPromises();

    const userBtns = wrapper.find(userButtonSelector);

    expect(userBtns.exists()).toBe(false);
  });

  it('should render user btns if is authenticated', async () => {
    getGameApiMock.mockResolvedValue(PlayQuizDtoMock.create({ questions: [] }));
    const authStore = useAuthStore();
    authStore.user = UserReturnDtoMock.create();

    await router.push({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game);

    await flushPromises();

    const userBtns = wrapper.find(userButtonSelector);

    expect(userBtns.exists()).toBe(true);
  });

  it('should be text "Remove from favourites" on favourites btn', async () => {
    getGameApiMock.mockResolvedValue(
      PlayQuizDtoMock.create({
        isInFavourites: true,
        questions: []
      })
    );
    const authStore = useAuthStore();
    authStore.user = UserReturnDtoMock.create();

    await router.push({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game);

    await flushPromises();

    const favBtn = wrapper.find('[data-test="fav-btn-text"]');

    expect(favBtn.text()).toBe('Remove from favourites');
  });
});
