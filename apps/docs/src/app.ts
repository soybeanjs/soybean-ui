import { createThemeInitScript } from '@soybeanjs/theme/ssr';
import { defineApp } from 'ubean/runtime/vue';
import '@fontsource-variable/manrope';
import 'uno.css';
import { setupI18n } from './modules/i18n';
import { setupPinia } from './modules/pinia';
import { setupProgressGuard } from './modules/progress';
import './styles/global.css';

export default defineApp({
  head: {
    title: 'SoybeanUI Documentation',
    htmlAttrs: { lang: 'en' },
    meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    link: [{ rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    // 内联主题初始化脚本：首帧前从 localStorage 应用持久化主题，避免刷新闪烁。
    // 生产 SSG 产物 HTML 完全由 buildPageShell 从 pageObj.head 生成，
    // head.script 是唯一能到达生产 <head> 的注入点。
    script: [{ innerHTML: createThemeInitScript() }]
  },
  plugins: [setupPinia, setupI18n],
  router: {
    setup(router) {
      setupProgressGuard(router);
    }
  },
  rootId: 'app'
});
