import $api from '@/api/api';
import type { AxiosResponse } from 'axios';
import type {
  IGame,
  ICorrectAnswer,
  IrateQuizRequest
} from '@/modules/game/domain/types';

export class GameService {
  static async getGame(id: string): Promise<AxiosResponse<IGame>> {
    return $api.get<IGame>(`/quizes/play/${id}`);
  }

  static async getCorrectAnswer(
    questionId: string
  ): Promise<AxiosResponse<ICorrectAnswer>> {
    return $api.get<ICorrectAnswer>(`quizes/question/${questionId}`);
  }

  static async rateQuiz(request: IrateQuizRequest): Promise<AxiosResponse> {
    return $api.post('quizes/rate', request);
  }
}
