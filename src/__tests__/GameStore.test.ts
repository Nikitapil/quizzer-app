import { createTestingPinia } from '@pinia/testing';
import { useGameStore } from '@/modules/game/store/GameStore';
import { vi } from 'vitest';
import { toast } from 'vue3-toastify';
import { quizApi } from '@/api/apiInstances';
import { PlayQuizDtoMock } from '@/api/swagger/Quizes/mock';

describe('GameStore tests', () => {
  const mockGame = PlayQuizDtoMock.create();

  const toastMock = vi.spyOn(toast, 'error').mockImplementation((): any => {});

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should set default quiz name', () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);
    store.game = PlayQuizDtoMock.create({ isGenerated: true });

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
});
