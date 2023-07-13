import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/modules/home/views/Home.vue';
import { ERoutesNames } from '@/router/routes-names';
import Error from '@/modules/app/views/Error.vue';

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
    }
  ]
});

export default router;
