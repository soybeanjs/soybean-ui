import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:meta-layouts';

export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes)
});
