import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/modules/home/views/Home.vue';
import { ERoutesNames } from '@/router/routes-names';
import Error from '@/modules/app/views/Error.vue';
import Game from '@/modules/game/views/Game.vue';
import AllQuizes from '@/modules/quizes/views/AllQuizes.vue';
import SignUp from '@/modules/auth/views/SignUp.vue';
import SignIn from '@/modules/auth/views/SignIn.vue';
import CreateQuiz from '@/modules/quizes/views/CreateQuiz.vue';
import EditQuiz from '@/modules/quizes/views/EditQuiz.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component: CreateQuiz
    },
    {
      path: '/edit/:id',
      name: ERoutesNames.EDIT_QUIZ,
      component: EditQuiz
    }
  ]
});

export default router;
