export interface IQuiz {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isPrivate: boolean;
  userId: number | null;
  isInFavourites: boolean;
  questionsCount: number;
  author: string | null;
  rating: number | null;
}

export interface IQuizzesStoreState {
  quizzes: IQuiz[];
  isQuizzesLoading: boolean;
  totalCount: number;
}
export type TQuizzesStoreGetters = {};
export interface IQuizzesStoreActions {
  getAllQuizes: (request: IGetQuizzesRequest) => void;
}

export interface IGetQuizzesRequest {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IGetQuizzesResponse {
  quizes: IQuiz[];
  totalCount: number;
}
