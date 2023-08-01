import type { IGetQuizzesRequest } from '@/modules/quizes/domain/types';
import $api from '@/api/api';
import type { AxiosResponse } from 'axios';
import type {
  IGetQuizzesResponse,
  IQuizFormValues,
  ISingleQuiz
} from '@/modules/quizes/domain/types';

export class QuizzesService {
  static async getAllQuizzes({
    page = 1,
    limit = 10,
    search = ''
  }: IGetQuizzesRequest): Promise<AxiosResponse<IGetQuizzesResponse>> {
    return $api.post<IGetQuizzesResponse>('/quizes/all', {
      page,
      limit,
      search
    });
  }

  static async createQuiz(request: IQuizFormValues) {
    return $api.post('/quizes/create', request);
  }

  static async getSingleQuiz(
    quizId: string
  ): Promise<AxiosResponse<ISingleQuiz>> {
    return $api.get<ISingleQuiz>(`/quizes/${quizId}`);
  }
}
