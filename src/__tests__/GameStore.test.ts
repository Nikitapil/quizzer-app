import { vi } from 'vitest';
import { getErrorToastSpy } from '@/__tests__/mocks/toastMocks';

import { useGameStore } from '@/modules/game/store/GameStore';

import { quizApi } from '@/api/apiInstances';
import {
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
