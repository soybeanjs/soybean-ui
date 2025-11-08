import type { RouteRecordRaw } from 'vue-router';
import { ViteSSG } from 'vite-ssg';
import { setupLayouts } from 'virtual:generated-layouts';
import { routes } from 'vue-router/auto-routes';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import '@soybeanjs/ui/styles.css';
import './styles/global.css';
import App from './App.vue';
import type { UserModule } from './types';

export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes as RouteRecordRaw[]),
    base: import.meta.env.BASE_URL
  },
  ctx => {
    const modules = import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true });

    Object.values(modules).forEach(module => module.install?.(ctx));
  }
);
