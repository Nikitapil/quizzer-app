import { flushPromises, mount } from '@vue/test-utils';
import Game from '@/modules/game/views/Game.vue';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import { useGameStore } from '@/modules/game/store/GameStore';
import GameQuestion from '@/modules/game/components/GameQuestion.vue';
import { ERoutesNames } from '@/router/routes-names';
import { vi } from 'vitest';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { UserRolesEnum } from '@/api/swagger/Auth/data-contracts';
import { PlayQuizDtoMock } from '@/api/swagger/Quizes/mock';

describe('Game component tests', () => {
  const mockGame = PlayQuizDtoMock.create();

  it('should render loader while getting game', () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);

    store.init = async () => {};

    const wrapper = mount(Game, {
      global: {
        plugins: [pinia]
      }
    });

    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBe(true);
  });

  it('should render not found text', async () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);

    store.init = async () => {};

    const wrapper = mount(Game, {
      global: {
        plugins: [pinia]
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

    store.init = async () => {
      store.game = mockGame;
      store.isPageLoading = false;
    };

    // await router.push({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    await router.replace({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game, {
      global: {
        plugins: [pinia]
      }
    });

    await flushPromises();

    const questionComponent = wrapper.findComponent(GameQuestion);

    expect(questionComponent.exists()).toBe(true);
  });

  it.skip('should answer questions and should restart game', async () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);
    vi.useFakeTimers();

    store.init = async () => {
      store.game = mockGame;
      store.isPageLoading = false;
    };

    await router.push({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game, {
      global: {
        plugins: [pinia]
      }
    });

    await flushPromises();

    const totalInfo = wrapper.get('[data-test="total-info"]');

    const questionComponent = wrapper.findComponent(GameQuestion);

    expect(questionComponent.exists()).toBe(true);
    expect(totalInfo.text()).toBe(`1/${mockGame.questions.length}`);

    const answers = questionComponent.findAll('button');

    await answers[0].trigger('click');

    vi.runAllTimers();

    await flushPromises();

    const questionComponent2 = wrapper.findComponent(GameQuestion);

    expect(questionComponent2.exists()).toBe(true);
    expect(totalInfo.text()).toBe(`2/${mockGame.questions.length}`);

    const answers2 = questionComponent.findAll('button');

    await answers2[0].trigger('click');

    vi.runAllTimers();

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
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);

    store.init = async () => {
      store.game = mockGame;
      store.isPageLoading = false;
    };

    await router.push({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game, {
      global: {
        plugins: [pinia]
      }
    });

    await flushPromises();

    const userBtns = wrapper.find('user-btns');

    expect(userBtns.exists()).toBe(false);
  });

  it('should render user btns if is authenticated', async () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);

    const authStore = useAuthStore(pinia);
    authStore.user = {
      id: 1,
      email: 'test@test.test',
      username: 'Test user',
      role: UserRolesEnum.User
    };

    store.init = async () => {
      store.game = PlayQuizDtoMock.create({ questions: [] });
      store.isPageLoading = false;
    };

    await router.push({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game, {
      global: {
        plugins: [pinia]
      }
    });

    await flushPromises();

    const userBtns = wrapper.find('[data-test="user-btns"]');

    expect(userBtns.exists()).toBe(true);
  });

  it('should be text "Remove from favourites" on favourites btn', async () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);

    const authStore = useAuthStore(pinia);
    authStore.user = {
      id: 1,
      email: 'test@test.test',
      username: 'Test user',
      role: UserRolesEnum.User
    };

    store.init = async () => {
      store.game = PlayQuizDtoMock.create({
        isInFavourites: true,
        questions: []
      });
      store.isPageLoading = false;
    };

    await router.push({ name: ERoutesNames.QUIZ, params: { id: 1 } });

    const wrapper = mount(Game, {
      global: {
        plugins: [pinia]
      }
    });

    await flushPromises();

    const favBtn = wrapper.find('[data-test="fav-btn-text"]');

    expect(favBtn.text()).toBe('Remove from favourites');
  });
});
