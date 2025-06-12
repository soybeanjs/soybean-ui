import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('../views/home.vue')
    },
    {
      name: 'Demo',
      path: '/demo',
      component: () => import('../views/demo.vue')
    }
  ]
});
