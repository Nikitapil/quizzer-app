import { createTestingPinia } from '@pinia/testing';
import { useGameStore } from '@/modules/game/store/GameStore';
import { vi } from 'vitest';
import { toast } from 'vue3-toastify';
import { quizApi } from '@/api/apiInstances';

describe('GameStore tests', () => {
  const mockGame = {
    id: '1234',
    isPrivate: false,
    name: 'Untitled',
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
    ],
    isInFavourites: false
  };

  const toastMock = vi.spyOn(toast, 'error').mockImplementation((): any => {});

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should set default quiz name', () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);
    store.game = mockGame;

    expect(store.quizName).toBe('Generated Quiz');
  });

  it('should work getGame', async () => {
    quizApi.getPlayQuiz = async () => {
      return mockGame;
    };
    const pinia = createTestingPinia({
      stubActions: false
    });
    const store = useGameStore(pinia);

    await store.getGame('1');

    expect(store.game).toStrictEqual(mockGame);
    expect(store.isPageLoading).toBe(false);
  });

  it('should go to catch block in getGame method if error', async () => {
    quizApi.getPlayQuiz = async () => {
      throw new Error();
    };
    const pinia = createTestingPinia({
      stubActions: false
    });
    const store = useGameStore(pinia);

    await store.getGame('1');

    expect(store.game).toStrictEqual(null);
    expect(store.isPageLoading).toBe(false);
  });

  it('should work getCorrectAnswer method', async () => {
    quizApi.getCorrectAnswer = async () => {
      return {
        answer: '1234'
      };
    };
    const pinia = createTestingPinia({
      stubActions: false
    });
    const store = useGameStore(pinia);

    const answer = await store.getCorrectAnswer('1');

    expect(answer).toBe('1234');
    expect(store.isAnswerLoading).toBe(false);
  });

  it('should go to catch bock if error in getCorrectAnswer method', async () => {
    quizApi.getCorrectAnswer = async () => {
      throw new Error();
    };
    const pinia = createTestingPinia({
      stubActions: false
    });
    const store = useGameStore(pinia);

    const answer = await store.getCorrectAnswer('1');

    expect(answer).toBe('');
    expect(store.isAnswerLoading).toBe(false);
  });

  it('should not rate quiz if no game', async () => {
    const serviceMock = vi
      .spyOn(quizApi, 'rateQuiz')
      .mockImplementation(async () => {
        return {} as any;
      });
    const pinia = createTestingPinia({
      stubActions: false
    });
    const store = useGameStore(pinia);

    await store.rateQuiz(5);

    expect(serviceMock).not.toHaveBeenCalled();
  });

  it('should rate quiz successfully', async () => {
    const serviceMock = vi
      .spyOn(quizApi, 'rateQuiz')
      .mockImplementation(async () => {
        return {} as any;
      });
    const pinia = createTestingPinia({
      stubActions: false
    });
    const store = useGameStore(pinia);

    store.game = mockGame;

    await store.rateQuiz(5);

    expect(serviceMock).toHaveBeenCalled();
    expect(store.isRateInProgress).toBe(false);
  });

  it('should go to catch block', async () => {
    const serviceMock = vi
      .spyOn(quizApi, 'rateQuiz')
      .mockImplementation(async () => {
        throw {
          response: {
            data: {
              message: 'error'
            }
          }
        };
      });
    const pinia = createTestingPinia({
      stubActions: false
    });
    const store = useGameStore(pinia);

    store.game = mockGame;

    await store.rateQuiz(5);

    expect(serviceMock).toHaveBeenCalled();
    expect(toastMock).toHaveBeenCalled();
    expect(store.isRateInProgress).toBe(false);
  });

  describe('toggleFavouriteQuiz tests', () => {
    const addToFavouritesMock = vi
      .spyOn(quizApi, 'addQuizToFavourites')
      .mockImplementation(async () => {
        return {} as any;
      });
    const removeFromFavouritesMock = vi
      .spyOn(quizApi, 'removeQuizFromFavourites')
      .mockImplementation(async () => {
        return {} as any;
      });

    it('should not toggleFavourite if no game', async () => {
      const pinia = createTestingPinia({
        stubActions: false
      });
      const store = useGameStore(pinia);

      await store.toggleFavouriteQuiz();

      expect(addToFavouritesMock).not.toHaveBeenCalled();
      expect(removeFromFavouritesMock).not.toHaveBeenCalled();
    });

    it('should add tofavourites and remove', async () => {
      const pinia = createTestingPinia({
        stubActions: false
      });
      const store = useGameStore(pinia);

      store.game = mockGame;

      await store.toggleFavouriteQuiz();

      expect(addToFavouritesMock).toHaveBeenCalled();
      expect(store.game.isInFavourites).toBe(true);

      await store.toggleFavouriteQuiz();
      expect(removeFromFavouritesMock).toHaveBeenCalled();
      expect(store.game.isInFavourites).toBe(false);
    });

    it('should go to catch block in toggleFavourites method', async () => {
      vi.spyOn(quizApi, 'addQuizToFavourites').mockImplementation(async () => {
        throw {
          response: {
            data: {
              message: 'error'
            }
          }
        };
      });
      const pinia = createTestingPinia({
        stubActions: false
      });
      const store = useGameStore(pinia);

      store.game = mockGame;

      await store.toggleFavouriteQuiz();

      expect(toastMock).toHaveBeenCalled();
      expect(store.isToggleFavouritesInProgress).toBe(false);
    });
  });
});
