import type { IGetQuizzesRequest } from '@/modules/quizes/domain/types';
import $api from '@/api/api';
import type { AxiosResponse } from 'axios';
import type { IGetQuizzesResponse } from '@/modules/quizes/domain/types';

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
}
