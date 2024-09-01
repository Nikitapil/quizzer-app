import { AuthApi } from '@/api/swagger/Auth/Auth';
import { QuizesApi } from '@/api/swagger/Quizes/Quizes';
import { UsersApi } from '@/api/swagger/Users/Users';
import { QuizCommentsApi } from '@/api/swagger/Quizes/QuizComments';

export const authApi = new AuthApi();
export const quizApi = new QuizesApi();
export const usersApi = new UsersApi();
export const quizCommentsApi = new QuizCommentsApi();
