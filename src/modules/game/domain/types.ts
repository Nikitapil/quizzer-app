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
}

export interface IGameStoreState {
  game: IGame | null;
  isPageLoading: boolean;
  isAnswerLoading: boolean;
}
export type TGameStoreGetters = {
  totalQuestionsCount(state: IGameStoreState): number;
  quizName(state: IGameStoreState): string;
};
export interface IGameStoreActions {
  getGame: (id: string) => void;
  getCorrectAnswer: (id: string) => Promise<string>;
}

export interface ICorrectAnswer {
  answer: string;
}
