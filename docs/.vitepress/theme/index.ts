import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import 'uno.css';
import '@unocss/reset/tailwind.css';
import './style.css';
import Layout from './layout/index.vue';
import InstallationTabs from './components/installation-tabs.vue';

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('InstallationTabs', InstallationTabs);
  }
};

export default theme;
