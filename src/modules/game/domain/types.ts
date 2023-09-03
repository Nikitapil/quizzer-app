export interface IQuestion {
  id: string;
  question: string;
  answers: string[];
}

export interface IGame {
  id: string;
  name: string;
  isPrivate: boolean;
  questions: IQuestion[];
  isInFavourites: boolean;
}

export interface IGameStoreState {
  game: IGame | null;
  isPageLoading: boolean;
  isAnswerLoading: boolean;
  isRateInProgress: boolean;
  isToggleFavouritesInProgress: boolean;
}
export type TGameStoreGetters = {
  totalQuestionsCount(state: IGameStoreState): number;
  quizName(state: IGameStoreState): string;
};
export interface IGameStoreActions {
  getGame: (id: string) => Promise<void>;
  getCorrectAnswer: (id: string) => Promise<string>;
  rateQuiz: (rating: number) => Promise<void>;
  toggleFavouriteQuiz: () => Promise<void>;
}

export interface ICorrectAnswer {
  answer: string;
}

export interface IrateQuizRequest {
  quizId: string;
  rating: number;
}
