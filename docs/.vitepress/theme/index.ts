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
    app.component('InstallationTabs', InstallationTabs);
    registerExamples(app);
  }
};

export default theme;
