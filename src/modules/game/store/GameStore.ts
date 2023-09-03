import { defineStore } from 'pinia';
import type {
  IGameStoreActions,
  IGameStoreState,
  TGameStoreGetters
} from '@/modules/game/domain/types';
import { GameService } from '@/modules/game/GameService';
import { i18n } from '@/main';
import { toast } from 'vue3-toastify';
import { QuizzesService } from '@/modules/quizes/QuizzesService';

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
      isAnswerLoading: false,
      isRateInProgress: false,
      isToggleFavouritesInProgress: false
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
    },
    async rateQuiz(rating: number) {
      if (!this.game) {
        return;
      }
      try {
        this.isRateInProgress = true;
        await GameService.rateQuiz({ quizId: this.game.id, rating });
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast.error(i18n.global.t(e?.response?.data?.message));
        }
      } finally {
        this.isRateInProgress = false;
      }
    },
    async toggleFavouriteQuiz() {
      if (!this.game) {
        return;
      }
      try {
        this.isToggleFavouritesInProgress = true;
        if (!this.game.isInFavourites) {
          await QuizzesService.addQuizToFavourites(this.game.id);
        } else {
          await QuizzesService.removeQuizToFavourites(this.game.id);
        }
        this.game.isInFavourites = !this.game.isInFavourites;
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast.error(e?.response.data.message);
        }
      } finally {
        this.isToggleFavouritesInProgress = false;
      }
    }
  }
});
