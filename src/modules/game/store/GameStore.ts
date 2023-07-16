import { defineStore } from 'pinia';
import type {
  IGameStoreActions,
  IGameStoreState,
  TGameStoreGetters
} from '@/modules/game/domain/types';
import { GameService } from '@/modules/game/GameService';
import { i18n } from '@/main';

export const useGameStore = defineStore<
  'game',
  IGameStoreState,
  TGameStoreGetters,
  IGameStoreActions
>('game', {
  state: () => {
    return {
      game: null,
      isPageLoading: true,
      isAnswerLoading: false
    };
  },
  getters: {
    totalQuestionsCount(state) {
      return state.game?.questions?.length || 0;
    },
    quizName(state: IGameStoreState): string {
      return state.game?.name === 'Untitled'
        ? i18n.global.t('generated_quiz')
        : state.game?.name || '';
    }
  },
  actions: {
    async getGame(id: string) {
      try {
        const { data } = await GameService.getGame(id);
        this.game = data;
      } catch (e) {
        this.game = null;
      } finally {
        this.isPageLoading = false;
      }
    },

    async getCorrectAnswer(id: string) {
      try {
        this.isAnswerLoading = true;
        const { data } = await GameService.getCorrectAnswer(id);
        return data.answer;
      } catch (e) {
        return '';
      } finally {
        this.isAnswerLoading = false;
      }
    }
  }
});
