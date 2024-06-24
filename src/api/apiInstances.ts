import { AuthApi } from '@/api/Auth/Auth';
import { QuizesApi } from '@/api/swagger/Quizes/Quizes';
import { UsersApi } from '@/api/swagger/Users/Users';

export const authApi = new AuthApi();
export const quizApi = new QuizesApi();
export const usersApi = new UsersApi();
