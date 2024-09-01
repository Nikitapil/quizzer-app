import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/modules/auth/store/AuthStore';

import { ERoutesNames } from '@/router/routes-names';

import Home from '@/modules/home/pages/Home.vue';
import Error from '@/modules/app/pages/Error.vue';
import Game from '@/modules/game/pages/Game.vue';
import AllQuizes from '@/modules/quizes/pages/AllQuizes.vue';
import SignUp from '@/modules/auth/pages/SignUp.vue';
import SignIn from '@/modules/auth/pages/SignIn.vue';
import CreateQuiz from '@/modules/quizes/pages/CreateQuiz.vue';
import EditQuiz from '@/modules/quizes/pages/EditQuiz.vue';
import UsersQuizes from '@/modules/quizes/pages/UsersQuizes.vue';
import FavouritesQuizzes from '@/modules/quizes/pages/FavouritesQuizzes.vue';
import Profile from '@/modules/auth/pages/Profile.vue';
import QuizComments from '@/modules/comments/pages/QuizComments.vue';

export const routes = [
  {
    path: '/',
    name: ERoutesNames.HOME,
    component: Home
  },
  {
    path: '/:catchAll(.*)',
    name: ERoutesNames.ERROR,
    component: Error
  },
  {
    path: '/quiz/:id',
    name: ERoutesNames.QUIZ,
    component: Game
  },
  {
    path: '/quizzes/all',
    name: ERoutesNames.ALL_QUIZES,
    component: AllQuizes
  },
  {
    path: '/quizzes/user/:id',
    name: ERoutesNames.USER_QUIZES,
    component: UsersQuizes
  },
  {
    path: '/quizzes/favourites',
    name: ERoutesNames.FAVOURITES,
    component: FavouritesQuizzes,
    meta: { needAuth: true }
  },
  {
    path: '/signup',
    name: ERoutesNames.SIGN_UP,
    component: SignUp
  },
  {
    path: '/signin',
    name: ERoutesNames.SIGN_IN,
    component: SignIn
  },
  {
    path: '/create',
    name: ERoutesNames.CREATE_QUIZ,
    component: CreateQuiz,
    meta: { needAuth: true }
  },
  {
    path: '/edit/:id',
    name: ERoutesNames.EDIT_QUIZ,
    component: EditQuiz,
    meta: { needAuth: true }
  },
  {
    path: '/profile',
    name: ERoutesNames.PROFILE,
    component: Profile,
    meta: { needAuth: true }
  },
  {
    path: '/comments/:id',
    name: ERoutesNames.COMMENTS,
    component: QuizComments
  }
];

const router = createRouter({
  history: createWebHistory('/quizzer-app/'),
  routes
});

router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore();
  if (!from.name) {
    await authStore.refresh();
  }
  if (to.meta?.needAuth && !authStore.user) {
    next({ name: ERoutesNames.SIGN_IN });
  } else {
    next();
  }
});

export default router;
