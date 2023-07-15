import $api from '@/api/api';
import type { AxiosResponse } from 'axios';
import type { IGame, ICorrectAnswer } from '@/modules/game/domain/types';

export class GameService {
  static async getGame(id: string): Promise<AxiosResponse<IGame>> {
    return $api.get<IGame>(`/quizes/play/${id}`);
  }

  static async getCorrectAnswer(
    questionId: string
  ): Promise<AxiosResponse<ICorrectAnswer>> {
    return $api.get<ICorrectAnswer>(`quizes/question/${questionId}`);
  }
}
