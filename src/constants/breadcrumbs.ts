import { ERoutesNames } from '@/router/routes-names';

export const BREADCRUMBS = {
  MAIN: {
    title: 'main',
    routeName: ERoutesNames.HOME
  },
  GAME: {
    title: 'play_quiz',
    routeName: ERoutesNames.QUIZ
  },
  ERROR: {
    title: 'error_page',
    routeName: ERoutesNames.ERROR
  },
  ALL_QUIZZES: {
    title: 'all_quizzes',
    routeName: ERoutesNames.ALL_QUIZES
  },
  CREATE: {
    title: 'quiz_creation',
    routeName: ERoutesNames.CREATE_QUIZ
  },
  EDIT: {
    title: 'quiz_editing',
    routeName: ERoutesNames.EDIT_QUIZ
  }
};
