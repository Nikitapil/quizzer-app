import { createTestingPinia } from '@pinia/testing';
import { useGameStore } from '@/modules/game/store/GameStore';
import { GameService } from '@/modules/game/GameService';

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

  it('should set default quiz name', () => {
    const pinia = createTestingPinia();
    const store = useGameStore(pinia);
    store.game = mockGame;

    expect(store.quizName).toBe('Generated Quiz');
  });

  it('should work getGame', async () => {
    GameService.getGame = async () => {
      return {
        data: mockGame
      } as any;
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
    GameService.getGame = async () => {
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
    GameService.getCorrectAnswer = async () => {
      return {
        data: {
          answer: '1234'
        }
      } as any;
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
    GameService.getCorrectAnswer = async () => {
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
});
