import { AuthApi } from '@/api/Auth/Auth';
import { QuizesApi } from '@/api/Quizes/Quizes';
import { UsersApi } from '@/api/Users/Users';

export const authApi = new AuthApi();
export const quizApi = new QuizesApi();
export const usersApi = new UsersApi();
