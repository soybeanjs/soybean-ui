import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import type { App } from 'vue';
import 'uno.css';
import '@unocss/reset/tailwind-compat.css';
import './style.css';
import code from '../code.json';
import Layout from './layout/index.vue';
import InstallationTabs from './components/installation-tabs.vue';
import ComponentPreview from './components/component-preview.vue';

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    cacheTheme();
    app.component('InstallationTabs', InstallationTabs);
    app.component('ComponentPreview', ComponentPreview);

    // 文档正在迁移中，examples部分内容已清理，短时间内新文档会支持正常浏览组件，暂不对旧版继续支持
    // registerExamples(app);
    registerCode(app);
  }
};

function registerCode(app: App) {
  app.config.globalProperties.$code = code;
}

function cacheTheme() {
  if (import.meta.env.SSR) return;

  const styleId = '__SOYBEAN_UI_THEME_VARS__';

  const cssVars = localStorage.getItem(styleId);
  if (cssVars) {
    const styleEl = document.querySelector(`#${styleId}`);

    if (styleEl) {
      styleEl.textContent = cssVars;
    } else {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = cssVars;
      document.head.appendChild(style);
    }
  }

  window.addEventListener('beforeunload', () => {
    const style = document.getElementById(styleId);
    const pressedVars = style?.textContent || '';
    if (pressedVars) {
      localStorage.setItem(styleId, pressedVars);
    }
  });
}

export default theme;
