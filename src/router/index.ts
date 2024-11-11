import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Ui',
      path: '/',
      component: () => import('../views/ui/index.vue')
    }
  ]
});
