import DefaultTheme from 'vitepress/theme';
import type { App } from 'vue';
import type { Theme } from 'vitepress';
import 'uno.css';
import '@unocss/reset/tailwind.css';
import './style.css';
import { toPascalCase } from '../shared';
import Layout from './layout/index.vue';
import InstallationTabs from './components/installation-tabs.vue';

const regex = /\/(\w+)\.vue/;
const demos = import.meta.glob('../demo/*.vue', { eager: true });

function registerDemos(app: App) {
  for (const path in demos) {
    const name = path.match(regex)?.[1] ?? '';

    if (name) {
      const cpName = toPascalCase(`demo-${name}`);
      app.component(cpName, (demos[path] as any)?.default);
    }
  }
}

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('InstallationTabs', InstallationTabs);
    registerDemos(app);
  }
};

export default theme;
