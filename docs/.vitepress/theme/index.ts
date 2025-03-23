import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import type { App } from 'vue';
import * as ExampleComponents from '@soybean-ui/examples';
import 'uno.css';
import '@unocss/reset/tailwind-compat.css';
import './style.css';
import Layout from './layout/index.vue';
import InstallationTabs from './components/installation-tabs.vue';

function registerExamples(app: App) {
  for (const key in ExampleComponents) {
    app.component(key, (ExampleComponents as any)[key]);
  }
}

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    cacheTheme();
    app.component('InstallationTabs', InstallationTabs);
    registerExamples(app);
  }
};

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
