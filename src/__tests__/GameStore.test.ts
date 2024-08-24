import { vi } from 'vitest';
import { getErrorToastSpy } from '@/__tests__/mocks/toastMocks';

import { useGameStore } from '@/modules/game/store/GameStore';

import { quizApi } from '@/api/apiInstances';
import {
  PlayQuizDtoMock,
  SuccessMessageDtoMock
} from '@/api/swagger/Quizes/mock';
import { createPinia, setActivePinia } from 'pinia';
import { errorFn } from '@/__tests__/mocks/fnMocks';

const getCorrectAnswerApiMock = vi.fn().mockImplementation(() => {});
quizApi.getCorrectAnswer = getCorrectAnswerApiMock;

describe('GameStore tests', () => {
  const mockGame = PlayQuizDtoMock.create();
  const successMessageMock = SuccessMessageDtoMock.create();

  const toastMock = getErrorToastSpy();

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should set default quiz name', () => {
    const store = useGameStore();
    store.game = PlayQuizDtoMock.create({ isGenerated: true });

    expect(store.quizName).toBe('Generated Quiz');
  });

  it('should set quiz name акщь йгшя', () => {
    const store = useGameStore();
    const name = 'test name';
    store.game = PlayQuizDtoMock.create({ isGenerated: false, name });

    expect(store.quizName).toBe(name);
  });

  it('should not rate quiz if no game', async () => {
    const serviceMock = vi
      .spyOn(quizApi, 'rateQuiz')
      .mockResolvedValue(successMessageMock);
    const store = useGameStore();

    await store.rateQuiz(5);

    expect(serviceMock).not.toHaveBeenCalled();
  });

  it('should rate quiz successfully', async () => {
    const serviceMock = vi
      .spyOn(quizApi, 'rateQuiz')
      .mockResolvedValue(successMessageMock);
    const store = useGameStore();

    store.game = mockGame;

    await store.rateQuiz(5);

    expect(serviceMock).toHaveBeenCalled();
    expect(store.isRateInProgress).toBe(false);
  });

  it('should go to catch block', async () => {
    const serviceMock = vi
      .spyOn(quizApi, 'rateQuiz')
      .mockImplementation(errorFn);
    const store = useGameStore();

    store.game = mockGame;

    await store.rateQuiz(5);

    expect(serviceMock).toHaveBeenCalled();
    expect(toastMock).toHaveBeenCalled();
    expect(store.isRateInProgress).toBe(false);
  });

  it('should not answer question if no question', async () => {
    const store = useGameStore();
    await store.onAnswer('');

    expect(getCorrectAnswerApiMock).not.toHaveBeenCalled();
  });

  it('should set null to correct answer if no response', async () => {
    getCorrectAnswerApiMock.mockResolvedValue(undefined);
    const store = useGameStore();
    store.game = PlayQuizDtoMock.create();
    await store.onAnswer('');

    expect(store.currentCorrectAnswer).toBe(null);
  });
});
