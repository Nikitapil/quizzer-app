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
  isDeleteInProgress: boolean;
  isToggleFavouritesInProgress: boolean;
  totalCount: number;
}
export type TQuizzesStoreGetters = {};
export interface IQuizzesStoreActions {
  getAllQuizes: (request: IGetQuizzesRequest) => void;
  getUserQuizzes: (
    request: IGetQuizzesRequest,
    userId: string
  ) => Promise<void>;
  deleteQuiz: (id: string) => Promise<boolean>;
  toggleFavouriteQuiz: (quiz: IQuiz) => void;
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

export interface IQuizFormQuestion {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export interface IQuizFormValues {
  name: string;
  isPrivate: boolean;
  questions: IQuizFormQuestion[];
}

export interface IEditQuizRequest extends IQuizFormValues {
  id: string;
}

export interface IGetQuizFormParams {
  quizId: string;
  userId: number;
}

export interface IQuizFormStoreState {
  isLoading: boolean;
  isQuizLoading: boolean;
  quizForm: IQuizFormValues | null;
  quizId: string;
}
export type TQuizFormStoreGetters = {};
export interface IQuizFormStoreActions {
  createQuiz: (data: IQuizFormValues) => Promise<boolean>;
  editQuiz: (data: IQuizFormValues) => Promise<boolean>;
  getQuizForm: (params: IGetQuizFormParams) => Promise<void>;
}

export interface ISingleQuizQuestion {
  id: string;
  createdAt: string;
  updatedAt: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  quizId: string;
}

export interface ISingleQuiz {
  rating: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  isPrivate: boolean;
  userId: number;
  questions: ISingleQuizQuestion[];
}
