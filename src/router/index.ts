import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/modules/home/views/Home.vue';
import { ERoutesNames } from '@/router/routes-names';
import Error from '@/modules/app/views/Error.vue';
import Game from '@/modules/game/views/Game.vue';
import AllQuizes from '@/modules/quizes/views/AllQuizes.vue';

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
    }
  ]
});

export default router;
