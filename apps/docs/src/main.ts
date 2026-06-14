import { ViteSSG } from 'vite-ssg';
import { routes } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:meta-layouts';
// @ts-expect-error - no types for fontsource-variable yet
import '@fontsource-variable/manrope';
import 'uno.css';
import './styles/global.css';
import App from './App.vue';
import type { UserModule } from './types';

export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    base: import.meta.env.BASE_URL,
    scrollBehavior: to => ({ left: 0, top: 0, behavior: to.hash ? 'smooth' : 'auto' })
  },
  ctx => {
    const modules = import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true });

    Object.values(modules).forEach(module => module.install?.(ctx));
  }
);
