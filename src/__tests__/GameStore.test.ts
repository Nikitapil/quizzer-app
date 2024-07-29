import { vi } from 'vitest';
import { getErrorToastSpy } from '@/__tests__/mocks/toastMocks';

import { useGameStore } from '@/modules/game/store/GameStore';

import { quizApi } from '@/api/apiInstances';
import {
  CorrectAnswerReturnDtoMock,
  PlayQuizDtoMock,
  SuccessMessageDtoMock
} from '@/api/swagger/Quizes/mock';
import { createPinia, setActivePinia } from 'pinia';

describe('GameStore tests', () => {
  const mockGame = PlayQuizDtoMock.create();

  const toastMock = getErrorToastSpy();

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should set default quiz name', () => {
    const store = useGameStore();
    store.game = PlayQuizDtoMock.create({ isGenerated: true });

    expect(store.quizName).toBe('Generated Quiz');
  });

  it('should work getGame', async () => {
    quizApi.getPlayQuiz = async () => {
      return mockGame;
    };
    const store = useGameStore();

    await store.getGame('1');

    expect(store.game).toStrictEqual(mockGame);
    expect(store.isPageLoading).toBe(false);
  });

  it('should go to catch block in getGame method if error', async () => {
    quizApi.getPlayQuiz = async () => {
      throw new Error();
    };
    const store = useGameStore();

    await store.getGame('1');

    expect(store.game).toStrictEqual(null);
    expect(store.isPageLoading).toBe(false);
  });

  it('should work getCorrectAnswer method', async () => {
    const answerMock = CorrectAnswerReturnDtoMock.create();
    quizApi.getCorrectAnswer = async () => {
      return answerMock;
    };
    const store = useGameStore();

    const answer = await store.getCorrectAnswer('1');

    expect(answer).toBe(answerMock.answer);
    expect(store.isAnswerLoading).toBe(false);
  });

  it('should go to catch bock if error in getCorrectAnswer method', async () => {
    quizApi.getCorrectAnswer = async () => {
      throw new Error();
    };
    const store = useGameStore();

    const answer = await store.getCorrectAnswer('1');

    expect(answer).toBe('');
    expect(store.isAnswerLoading).toBe(false);
  });

  it('should not rate quiz if no game', async () => {
    const serviceMock = vi
      .spyOn(quizApi, 'rateQuiz')
      .mockImplementation(async () => {
        return SuccessMessageDtoMock.create();
      });
    const store = useGameStore();

    await store.rateQuiz(5);

    expect(serviceMock).not.toHaveBeenCalled();
  });

  it('should rate quiz successfully', async () => {
    const serviceMock = vi
      .spyOn(quizApi, 'rateQuiz')
      .mockImplementation(async () => {
        return SuccessMessageDtoMock.create();
      });
    const store = useGameStore();

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
    const store = useGameStore();

    store.game = mockGame;

    await store.rateQuiz(5);

    expect(serviceMock).toHaveBeenCalled();
    expect(toastMock).toHaveBeenCalled();
    expect(store.isRateInProgress).toBe(false);
  });
});
